// Configuração do TrackPixel
export const FUNNEL_ID = 'bc5a5888-d548-43e6-b01d-ce43c25f156e';

// Link base do Telegram (link trackeado)
export const TELEGRAM_GROUP_LINK = 'https://de66610a-5c19-4559-9ecf-ce4f93bde6c4-00-fhw24gm4fh4k.riker.replit.dev/r/bc5a5888-d548-43e6-b01d-ce43c25f156e';

// Função para obter o link trackeado
export const getTrackingLink = () => {
  if (typeof window !== 'undefined' && window.TrackPixel) {
    try {
      return window.TrackPixel.getTrackingLink();
    } catch (error) {
      console.error('Erro ao obter link trackeado:', error);
      return TELEGRAM_GROUP_LINK;
    }
  }
  return TELEGRAM_GROUP_LINK;
};

// Função para rastrear clique em link do Telegram
export const trackTelegramClick = (eventType = 'Click') => {
  if (typeof window !== 'undefined' && window.TrackPixel) {
    try {
      window.TrackPixel.track(eventType, {
        link: 'telegram_group',
        action: 'enter_group'
      });
    } catch (error) {
      console.error('Erro ao rastrear evento:', error);
    }
  }
};

