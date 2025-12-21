import { useState, useEffect } from 'react';
import { getTrackingLink, TELEGRAM_GROUP_LINK } from '../config/tracking';

const useTrackingLink = () => {
  const [link, setLink] = useState(TELEGRAM_GROUP_LINK);

  useEffect(() => {
    // Aguarda o TrackPixel carregar usando requestIdleCallback para evitar bloqueio
    const checkTrackPixel = () => {
      if (window.TrackPixel && typeof window.TrackPixel.getTrackingLink === 'function') {
        const trackedLink = getTrackingLink();
        setLink(trackedLink);
      } else {
        // Usa requestIdleCallback para evitar bloqueio da thread principal
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            setTimeout(checkTrackPixel, 100);
          }, { timeout: 500 });
        } else {
          setTimeout(checkTrackPixel, 100);
        }
      }
    };

    // Aguarda o carregamento completo da página antes de verificar
    if (document.readyState === 'complete') {
      checkTrackPixel();
    } else {
      window.addEventListener('load', checkTrackPixel, { once: true });
    }
  }, []);

  return link;
};

export default useTrackingLink;




