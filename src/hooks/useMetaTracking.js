import { useEffect } from 'react';
import { trackPageView, trackEvent } from '../services/metaTracking';

/**
 * Hook React para tracking do Meta Pixel + Conversions API
 * 
 * Uso básico:
 * ```jsx
 * function MyComponent() {
 *   useMetaTracking();
 *   return <div>...</div>;
 * }
 * ```
 * 
 * Com dados customizados:
 * ```jsx
 * function MyComponent() {
 *   useMetaTracking({
 *     email: 'user@example.com',
 *     phone: '5511999999999'
 *   });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useMetaTracking(userData = {}) {
  useEffect(() => {
    // Track PageView quando o componente monta
    trackPageView(userData);
  }, []); // Executa apenas uma vez quando o componente monta
}

/**
 * Hook para trackear eventos customizados
 * 
 * Uso:
 * ```jsx
 * function MyComponent() {
 *   const trackPurchase = useMetaEvent('Purchase');
 *   
 *   const handlePurchase = () => {
 *     trackPurchase({
 *       value: 99.90,
 *       currency: 'BRL'
 *     });
 *   };
 *   
 *   return <button onClick={handlePurchase}>Comprar</button>;
 * }
 * ```
 */
export function useMetaEvent(eventName) {
  return (customData = {}, userData = {}) => {
    return trackEvent(eventName, customData, userData);
  };
}

