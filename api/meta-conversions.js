/**
 * Meta Conversions API - Server-side Event Tracking
 * 
 * Esta API route envia eventos server-side para o Meta Conversions API,
 * permitindo deduplicação correta com eventos do Pixel (browser-side).
 * 
 * Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
 * 
 * IMPORTANTE: Configure a variável de ambiente META_CONVERSIONS_API_ACCESS_TOKEN na Vercel
 */

export default async function handler(req, res) {
  // Habilitar CORS para requisições do frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // Apenas aceita requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      event_name,
      event_id,
      event_time,
      user_data,
      custom_data,
      action_source = 'website'
    } = req.body;

    // Validações básicas
    if (!event_name) {
      return res.status(400).json({ error: 'event_name is required' });
    }

    if (!event_id) {
      return res.status(400).json({ error: 'event_id is required for deduplication' });
    }

    // Obter credenciais do ambiente
    // Vercel usa VITE_ para variáveis públicas, mas API routes podem acessar todas
    const PIXEL_ID = process.env.VITE_META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '1359109655309883';
    const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

    if (!ACCESS_TOKEN) {
      console.error('META_CONVERSIONS_API_ACCESS_TOKEN não configurado');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Conversions API access token not configured'
      });
    }

    // Coletar IP do cliente (importante para matching)
    // Vercel fornece o IP real através de headers específicos
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
      || req.headers['x-real-ip'] 
      || req.connection?.remoteAddress 
      || req.socket?.remoteAddress
      || undefined;
    
    // Coletar User Agent do cliente (se não fornecido)
    const clientUserAgent = user_data?.client_user_agent 
      || req.headers['user-agent'] 
      || undefined;
    
    // Preparar dados do evento
    // Hash email e telefone se fornecidos
    const hashedEmail = user_data?.em ? await hashSHA256(user_data.em) : undefined;
    const hashedPhone = user_data?.ph ? await hashSHA256(user_data.ph.replace(/\D/g, '')) : undefined;
    
    const eventData = {
      event_name,
      event_time: event_time || Math.floor(Date.now() / 1000),
      event_id,
      event_source_url: user_data?.source_url || req.headers.referer || req.headers.origin || '',
      action_source,
      user_data: {
        // Coletar dados do servidor primeiro (mais confiáveis)
        client_ip_address: clientIp,
        client_user_agent: clientUserAgent,
        // Dados do cliente (browser)
        fbp: typeof user_data?.fbp === 'string' && user_data.fbp ? user_data.fbp : undefined,
        fbc: typeof user_data?.fbc === 'string' && user_data.fbc ? user_data.fbc : undefined,
        // External ID se disponível
        external_id: typeof user_data?.external_id === 'string' && user_data.external_id ? user_data.external_id : undefined,
        // Email e telefone hasheados (se fornecidos)
        em: hashedEmail,
        ph: hashedPhone,
        // Source URL do evento
        source_url: user_data?.source_url || undefined,
      },
      custom_data: custom_data || {}
    };
    
    // Remover campos undefined (Meta prefere não receber campos vazios)
    Object.keys(eventData.user_data).forEach(key => {
      if (eventData.user_data[key] === undefined || eventData.user_data[key] === null || eventData.user_data[key] === '') {
        delete eventData.user_data[key];
      }
    });
    
    // Remover campos undefined do custom_data também
    if (eventData.custom_data) {
      Object.keys(eventData.custom_data).forEach(key => {
        if (eventData.custom_data[key] === undefined || eventData.custom_data[key] === null) {
          delete eventData.custom_data[key];
        }
      });
    }

    // Preparar payload para Meta Conversions API
    const payload = {
      data: [eventData],
      access_token: ACCESS_TOKEN
    };

    // Enviar para Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta Conversions API Error:', result);
      return res.status(response.status).json({
        error: 'Meta API error',
        details: result
      });
    }

    // Sucesso
    return res.status(200).json({
      success: true,
      events_received: result.events_received || 0,
      messages: result.messages || []
    });

  } catch (error) {
    console.error('Conversions API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

/**
 * Hash SHA-256 para dados sensíveis (email, telefone)
 * Conforme requerido pelo Meta Conversions API
 * 
 * IMPORTANTE: O Meta aceita valores não hasheados, mas recomenda hash SHA-256
 * Para máxima qualidade, implemente hash real em produção
 */
async function hashSHA256(value) {
  if (!value) return undefined;
  
  try {
    // Usar Web Crypto API (disponível no Node.js 18+ e Vercel)
    const encoder = new TextEncoder();
    const data = encoder.encode(value.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    // Fallback: retornar valor não hasheado (Meta aceita, mas qualidade menor)
    console.warn('Hash SHA-256 não disponível, enviando valor não hasheado:', error);
    return value.toLowerCase().trim();
  }
}

