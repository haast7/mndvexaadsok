import { useState, useEffect } from 'react';
import { getTrackingLink, TELEGRAM_GROUP_LINK } from '../config/tracking';

const useTrackingLink = () => {
  const [link, setLink] = useState(TELEGRAM_GROUP_LINK);

  useEffect(() => {
    // Aguarda o TrackPixel carregar
    const checkTrackPixel = () => {
      if (window.TrackPixel && typeof window.TrackPixel.getTrackingLink === 'function') {
        const trackedLink = getTrackingLink();
        setLink(trackedLink);
      } else {
        // Tenta novamente após um delay
        setTimeout(checkTrackPixel, 100);
      }
    };

    checkTrackPixel();
  }, []);

  return link;
};

export default useTrackingLink;

