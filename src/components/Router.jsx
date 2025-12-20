import React, { useState, useEffect } from 'react';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import JogoResponsavel from '../pages/JogoResponsavel';
import PoliticaPrivacidade from '../pages/PoliticaPrivacidade';
import TermosUso from '../pages/TermosUso';

const Router = () => {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

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

  switch (path) {
    case '/metodox':
      return <LandingPage />;
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

