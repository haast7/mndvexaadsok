// Configuração do TrackPixel
export const FUNNEL_ID = 'be7ad872-efab-44ae-8fc8-419855c98a45';

// Link base do Telegram (link trackeado)
export const TELEGRAM_GROUP_LINK = 'https://de66610a-5c19-4559-9ecf-ce4f93bde6c4-00-fhw24gm4fh4k.riker.replit.dev/r/be7ad872-efab-44ae-8fc8-419855c98a45';

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

