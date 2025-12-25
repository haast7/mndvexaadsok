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
 */
export function getFbp() {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') {
      return value;
    }
  }
  return null;
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
 */
export function collectUserData() {
  return {
    fbp: getFbp(),
    fbc: getFbc(),
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
 */
export async function sendServerEvent(eventName, eventId, customData = {}, userData = {}) {
  try {
    const collectedUserData = collectUserData();
    const mergedUserData = {
      ...collectedUserData,
      ...userData
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
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
 * Envia evento via Meta Pixel (browser-side)
 * 
 * @param {string} eventName - Nome do evento
 * @param {object} params - Parâmetros do evento (incluindo event_id)
 */
export function sendPixelEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.fbq) {
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

  // Enviar via Pixel (browser-side) com event_id
  const pixelParams = {
    ...customData,
    eventID: uniqueEventId // Meta Pixel usa 'eventID' (camelCase)
  };
  sendPixelEvent(eventName, pixelParams);

  // Enviar via Conversions API (server-side) com event_id
  const serverResult = await sendServerEvent(
    eventName,
    uniqueEventId,
    customData,
    userData
  );

  return {
    event_id: uniqueEventId,
    pixel_sent: true,
    server_sent: serverResult.success,
    server_result: serverResult
  };
}

/**
 * Track PageView com deduplicação completa
 * Esta é a função principal para melhorar a marcação de PageView
 */
export async function trackPageView(userData = {}) {
  const eventId = generateEventId();
  
  // Coletar dados adicionais do usuário se disponíveis
  const collectedData = collectUserData();
  const mergedUserData = {
    ...collectedData,
    ...userData
  };

  return await trackEvent(
    'PageView',
    {
      content_name: typeof document !== 'undefined' ? document.title : '',
      content_category: 'page_view'
    },
    mergedUserData,
    eventId
  );
}

/**
 * Inicializa o tracking de PageView automaticamente
 * Deve ser chamado quando a página carrega
 */
export function initPageViewTracking() {
  if (typeof window === 'undefined') return;

  // Aguardar um pouco para garantir que o Pixel está carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => trackPageView(), 100);
    });
  } else {
    setTimeout(() => trackPageView(), 100);
  }
}

