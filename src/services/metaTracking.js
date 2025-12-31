/**
 * Serviço de Tracking Unificado - Meta Pixel + Conversions API
 * 
 * Este serviço gerencia tanto eventos do Pixel (browser) quanto da Conversions API (server),
 * garantindo deduplicação correta através de event_id único.
 * 
 * Documentação: https://www.facebook.com/business/help/823677331451951
 */

// Configurações
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '1359109655309883';
const API_ENDPOINT = '/api/meta-conversions';

/**
 * Gera um event_id único baseado em timestamp + random
 * Garante que o mesmo event_id seja usado no Pixel e na Conversions API
 */
export function generateEventId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
}

/**
 * Obtém o cookie _fbp (Facebook Browser ID)
 * Usado para deduplicação quando event_id não está disponível
 * Aguarda até que o cookie esteja disponível (até 2 segundos)
 */
export async function getFbp() {
  if (typeof document === 'undefined') return null;
  
  // Tentar obter imediatamente
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp' && value) {
      return value;
    }
  }
  
  // Se não encontrou, aguardar até 2 segundos para o Pixel criar o cookie
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 20; // 2 segundos (20 * 100ms)
    
    const checkCookie = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === '_fbp' && value) {
          resolve(value);
          return;
        }
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkCookie, 100);
      } else {
        resolve(null);
      }
    };
    
    setTimeout(checkCookie, 100);
  });
}

/**
 * Obtém o cookie _fbc (Facebook Click ID)
 * Usado para deduplicação quando event_id não está disponível
 */
export function getFbc() {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbc') {
      return value;
    }
  }
  
  // Se não encontrou _fbc, tenta obter do fbclid na URL
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  if (fbclid) {
    // Formato: fb.1.{timestamp}.{fbclid}
    return `fb.1.${Date.now()}.${fbclid}`;
  }
  
  return null;
}

/**
 * Obtém o IP do cliente (via headers)
 * Usado para melhorar matching no Conversions API
 */
export function getClientIp() {
  // Em produção, isso deve ser obtido do servidor
  // Por enquanto, retornamos null (o Meta pode inferir do request)
  return null;
}

/**
 * Obtém User Agent do navegador
 */
export function getUserAgent() {
  if (typeof navigator === 'undefined') return null;
  return navigator.userAgent;
}

/**
 * Coleta todos os dados do usuário disponíveis para deduplicação
 * Retorna Promise para aguardar fbp estar disponível
 */
export async function collectUserData(externalId = null) {
  const fbp = await getFbp();
  const fbc = getFbc();
  
  return {
    fbp: fbp || undefined, // Meta prefere undefined ao invés de null
    fbc: fbc || undefined,
    external_id: externalId || undefined,
    client_ip_address: getClientIp(),
    client_user_agent: getUserAgent(),
    source_url: typeof window !== 'undefined' ? window.location.href : '',
  };
}

/**
 * Envia evento via Conversions API (server-side)
 * 
 * @param {string} eventName - Nome do evento (ex: 'PageView', 'Purchase')
 * @param {string} eventId - ID único do evento (deve ser o mesmo usado no Pixel)
 * @param {object} customData - Dados customizados do evento
 * @param {object} userData - Dados do usuário (opcional, será coletado automaticamente)
 * @param {number} eventTime - Timestamp do evento (opcional, será gerado se não fornecido)
 */
export async function sendServerEvent(eventName, eventId, customData = {}, userData = {}, eventTime = null) {
  try {
    // Coletar dados do usuário (aguarda fbp estar disponível)
    const externalId = userData?.external_id;
    const collectedUserData = await collectUserData(externalId);
    
    // Remover external_id de userData se já foi passado para collectUserData
    const { external_id, ...restUserData } = userData;
    
    const mergedUserData = {
      ...collectedUserData,
      ...restUserData,
      // Garantir que external_id seja usado se fornecido
      external_id: externalId || collectedUserData.external_id
    };

    // Usar o mesmo event_time para Pixel e Conversions API
    const timestamp = eventTime || Math.floor(Date.now() / 1000);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_time: timestamp,
        user_data: mergedUserData,
        custom_data: customData,
        action_source: 'website'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Conversions API Error:', error);
      return { success: false, error };
    }

    const result = await response.json();
    return { success: true, result };

  } catch (error) {
    console.error('Error sending server event:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Aguarda o Meta Pixel estar totalmente carregado e pronto
 * Retorna Promise que resolve quando o Pixel está pronto
 */
export function waitForPixelReady() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    // Se já está carregado
    if (window.fbq && window.fbq.loaded) {
      resolve(true);
      return;
    }

    // Aguardar até 5 segundos
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos (50 * 100ms)

    const checkPixel = () => {
      if (window.fbq && window.fbq.loaded) {
        resolve(true);
        return;
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkPixel, 100);
      } else {
        console.warn('Meta Pixel não carregou após 5 segundos');
        resolve(false);
      }
    };

    checkPixel();
  });
}

/**
 * Envia evento via Meta Pixel (browser-side)
 * 
 * @param {string} eventName - Nome do evento
 * @param {object} params - Parâmetros do evento (incluindo event_id)
 */
export async function sendPixelEvent(eventName, params = {}) {
  if (typeof window === 'undefined') {
    return false;
  }

  // Aguardar Pixel estar pronto
  const pixelReady = await waitForPixelReady();
  if (!pixelReady) {
    console.warn('Meta Pixel não está carregado');
    return false;
  }

  try {
    window.fbq('track', eventName, params);
    return true;
  } catch (error) {
    console.error('Error sending pixel event:', error);
    return false;
  }
}

/**
 * Envia evento com deduplicação completa
 * Envia tanto via Pixel quanto via Conversions API com o mesmo event_id
 * 
 * @param {string} eventName - Nome do evento
 * @param {object} customData - Dados customizados
 * @param {object} userData - Dados do usuário (opcional)
 * @param {string} eventId - ID do evento (opcional, será gerado se não fornecido)
 */
export async function trackEvent(eventName, customData = {}, userData = {}, eventId = null) {
  // Gerar event_id único se não fornecido
  const uniqueEventId = eventId || generateEventId();
  
  // Usar o mesmo timestamp para ambos (Pixel e Conversions API)
  const eventTime = Math.floor(Date.now() / 1000);

  // Enviar via Pixel (browser-side) com event_id
  // Meta Pixel usa 'eventID' (camelCase) e aceita eventTime opcional
  const pixelParams = {
    ...customData,
    eventID: uniqueEventId // Meta Pixel usa 'eventID' (camelCase)
  };
  const pixelSent = await sendPixelEvent(eventName, pixelParams);

  // Enviar via Conversions API (server-side) com event_id
  const serverResult = await sendServerEvent(
    eventName,
    uniqueEventId,
    customData,
    userData,
    eventTime // Mesmo timestamp usado no Pixel
  );

  return {
    event_id: uniqueEventId,
    event_time: eventTime,
    pixel_sent: pixelSent,
    server_sent: serverResult.success,
    server_result: serverResult
  };
}

/**
 * Track PageView com deduplicação completa
 * Esta é a função principal para melhorar a marcação de PageView
 * 
 * @param {object} userData - Dados do usuário (opcional)
 * @param {string} eventId - ID do evento (opcional, será gerado se não fornecido)
 */
export async function trackPageView(userData = {}, eventId = null) {
  // Gerar event_id único se não fornecido
  const uniqueEventId = eventId || generateEventId();
  
  // Coletar dados adicionais do usuário se disponíveis (aguarda fbp estar disponível)
  const externalId = userData?.external_id;
  const collectedData = await collectUserData(externalId);
  
  // Remover external_id de userData se já foi passado para collectUserData
  const { external_id, ...restUserData } = userData;
  
  const mergedUserData = {
    ...collectedData,
    ...restUserData,
    // Garantir que external_id seja usado se fornecido
    external_id: externalId || collectedData.external_id
  };

  return await trackEvent(
    'PageView',
    {
      content_name: typeof document !== 'undefined' ? document.title : '',
      content_category: 'page_view'
    },
    mergedUserData,
    uniqueEventId
  );
}

/**
 * Inicializa o tracking de PageView automaticamente
 * Deve ser chamado quando a página carrega
 * 
 * NOTA: Esta função não deve ser chamada se o Router já está gerenciando PageView
 * para evitar duplicação. Use apenas em páginas estáticas sem roteamento SPA.
 */
export async function initPageViewTracking(userData = {}) {
  if (typeof window === 'undefined') return;

  // Aguardar Pixel estar pronto antes de trackear
  const pixelReady = await waitForPixelReady();
  if (!pixelReady) {
    console.warn('Meta Pixel não está pronto, PageView pode não ser trackeado corretamente');
  }

  // Aguardar um pouco mais para garantir que cookies estão disponíveis
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => trackPageView(userData), 200);
    });
  } else {
    setTimeout(() => trackPageView(userData), 200);
  }
}

