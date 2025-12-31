import React, { useState, useEffect, useRef } from 'react';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import LandingPageBT from '../pages/LandingPageBT';
import LandingPageLP from '../pages/LandingPageLP';
import LandingPageAds from '../pages/LandingPageAds';
import JogoResponsavel from '../pages/JogoResponsavel';
import PoliticaPrivacidade from '../pages/PoliticaPrivacidade';
import TermosUso from '../pages/TermosUso';
import { trackPageView } from '../services/metaTracking';

const Router = () => {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });
  
  // Ref para rastrear se já foi feito o tracking inicial
  const hasTrackedInitialPageView = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePath = () => {
      setPath(window.location.pathname);
    };

    const handlePopState = () => {
      updatePath();
    };

    window.addEventListener('popstate', handlePopState);
    
    // Intercepta cliques em links
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('/') && !link.getAttribute('href')?.startsWith('//')) {
        const href = link.getAttribute('href');
        if (href !== window.location.pathname) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          updatePath();
          // Scroll para o topo quando mudar de página
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);

    // Atualiza o path quando a página carrega (importante para Vercel)
    updatePath();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Scroll para o topo sempre que o path mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [path]);

  // Track PageView quando a rota muda (SPA navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const trackPageViewForRoute = async () => {
      // Aguardar um pouco para garantir que a página está renderizada
      // e que o Pixel está pronto
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await trackPageView({
        source_url: window.location.href,
        content_name: document.title
      });
    };
    
    // Track PageView sempre que o path mudar
    // O useRef garante que não há duplicação na primeira renderização
    trackPageViewForRoute();
  }, [path]);

  switch (path) {
    case '/metodox':
      return <LandingPage />;
    case '/bt':
      return <LandingPageBT />;
    case '/lp':
      return <LandingPageLP />;
    case '/ads':
      return <LandingPageAds />;
    case '/jogo-responsavel':
      return <JogoResponsavel />;
    case '/politica-privacidade':
      return <PoliticaPrivacidade />;
    case '/termos-uso':
      return <TermosUso />;
    case '/':
    default:
      return <Home />;
  }
};

export default Router;

