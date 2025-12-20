import React, { useState, useEffect } from 'react';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import JogoResponsavel from '../pages/JogoResponsavel';
import PoliticaPrivacidade from '../pages/PoliticaPrivacidade';
import TermosUso from '../pages/TermosUso';

const Router = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
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
          setPath(href);
        }
      }
    };

    document.addEventListener('click', handleClick);

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

