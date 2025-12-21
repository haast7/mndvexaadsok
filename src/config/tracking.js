// Configuração do TrackPixel
export const FUNNEL_ID = '2bfbeb36-59ce-48d4-906e-2e7e7390d317';

// Link base do Telegram (link trackeado)
export const TELEGRAM_GROUP_LINK = 'https://dalhy.com/r/2bfbeb36-59ce-48d4-906e-2e7e7390d317';

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

