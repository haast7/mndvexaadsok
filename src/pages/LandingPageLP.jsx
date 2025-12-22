import React, { useRef, useState, useEffect } from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const LandingPageLP = () => {
  const trackingLink = useTrackingLink();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  
  // Contador fake de pessoas entrando e vagas disponíveis
  const [peopleEntered, setPeopleEntered] = useState(1247);
  const [availableSpots, setAvailableSpots] = useState(37);
  const [showPopup, setShowPopup] = useState(false);
  const popupShownRef = useRef(false);

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };

  // Contador fake - simula pessoas entrando e vagas diminuindo
  useEffect(() => {
    const interval = setInterval(() => {
      // Aumenta pessoas entrando (aleatório entre 1-3)
      setPeopleEntered(prev => prev + Math.floor(Math.random() * 3) + 1);
      
      // Diminui vagas disponíveis (aleatório, mas mais lento)
      if (Math.random() > 0.7 && availableSpots > 0) {
        setAvailableSpots(prev => {
          const newValue = Math.max(0, prev - 1);
          // Quando chegar a zero, abre o popup
          if (newValue === 0 && !popupShownRef.current) {
            popupShownRef.current = true;
            setShowPopup(true);
          }
          return newValue;
        });
      }
    }, 3000 + Math.random() * 2000); // Entre 3-5 segundos

    return () => clearInterval(interval);
  }, [availableSpots]);

  // Detecta tentativa de fechar a página (desktop e mobile)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!popupShownRef.current) {
        e.preventDefault();
        e.returnValue = '';
        setShowPopup(true);
        popupShownRef.current = true;
        return '';
      }
    };

    // Para desktop
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Para mobile - detecta quando o usuário tenta sair
    const handleVisibilityChange = () => {
      if (document.hidden && !popupShownRef.current) {
        // Pequeno delay para garantir que não seja um falso positivo
        setTimeout(() => {
          if (document.hidden && !popupShownRef.current) {
            setShowPopup(true);
            popupShownRef.current = true;
          }
        }, 500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Detecta tentativa de voltar (mobile)
    const handlePopState = () => {
      if (!popupShownRef.current) {
        setShowPopup(true);
        popupShownRef.current = true;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Auto scroll quando não está arrastando
  useEffect(() => {
    if (!autoScroll || isDragging) return;
    
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    const scrollSpeed = 1.5;

    const scroll = () => {
      if (!autoScroll || isDragging) {
        return;
      }
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      if (currentScroll >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollSpeed;
      }
      
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoScroll, isDragging]);

  // Drag and drop melhorado com inércia e suporte touch
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let dragging = false;
    let startPos = 0;
    let scrollPos = 0;
    let isClick = true;
    let clickTimeout = null;

    // Função para aplicar inércia após soltar
    const applyMomentum = () => {
      if (Math.abs(velocityRef.current) < 0.5) {
        velocityRef.current = 0;
        return;
      }

      container.scrollLeft += velocityRef.current;
      velocityRef.current *= 0.95; // Reduz velocidade gradualmente

      animationFrameRef.current = requestAnimationFrame(applyMomentum);
    };

    const handleStart = (clientX) => {
      dragging = true;
      setIsDragging(true);
      setAutoScroll(false);
      startPos = clientX;
      scrollPos = container.scrollLeft;
      velocityRef.current = 0;
      lastXRef.current = clientX;
      lastTimeRef.current = Date.now();
      isClick = true;
      
      // Cancela qualquer animação de inércia anterior
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
      
      // Se não mover em 200ms, considera como clique
      clickTimeout = setTimeout(() => {
        isClick = false;
      }, 200);
    };

    const handleMove = (clientX) => {
      if (!dragging) return;
      
      isClick = false;
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }

      const currentTime = Date.now();
      const deltaTime = currentTime - lastTimeRef.current;
      const deltaX = clientX - lastXRef.current;

      // Calcula velocidade para inércia
      if (deltaTime > 0) {
        velocityRef.current = deltaX / deltaTime * 16; // Normaliza para ~60fps
      }

      const walk = (clientX - startPos) * 1.5; // Multiplicador para melhor controle
      container.scrollLeft = scrollPos - walk;

      lastXRef.current = clientX;
      lastTimeRef.current = currentTime;
    };

    const handleEnd = () => {
      if (!dragging) return;
      
      dragging = false;
      setIsDragging(false);
      container.style.cursor = 'grab';
      container.style.userSelect = '';

      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }

      // Aplica inércia se houver movimento significativo
      if (Math.abs(velocityRef.current) > 0.5) {
        applyMomentum();
      }

      // Retoma auto-scroll após um tempo
      setTimeout(() => {
        if (!dragging) {
          setAutoScroll(true);
        }
      }, 500);
    };

    // Mouse events
    const handleMouseDown = (e) => {
      e.preventDefault();
      handleStart(e.clientX);
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    const handleMouseLeave = () => {
      handleEnd();
    };

    // Touch events
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        handleStart(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && dragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Adiciona event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Touch events
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    // Previne scroll da página durante drag
    const preventScroll = (e) => {
      if (dragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('mousemove', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mousemove', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Seção Hero - IGUAL À METODOX */}
      <div className="relative md:h-[90vh] lg:h-[85vh] overflow-auto md:overflow-hidden">
        {/* Background com imagem */}
        <div className="absolute inset-0 md:h-full">
          <picture>
            {/* Desktop e Mobile - mesma imagem */}
            <source 
              srcSet="/lp/BG.webp" 
              type="image/webp" 
            />
            {/* Fallback */}
            <img 
              src="/lp/BG.webp" 
              alt="Background" 
              className="w-full h-full object-cover object-center md:object-center object-bottom md:object-center"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
          {/* Overlay gradiente para melhorar legibilidade do texto à esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Imagem do Especialista - Desktop colada na base */}
        <div className="hidden md:block absolute bottom-0 right-0 z-20 w-[55%] lg:w-[50%] xl:w-[45%] pointer-events-none overflow-hidden">
          <div className="relative w-full h-full flex items-end justify-end">
            <picture>
              <source srcSet="/lp/ESPECIALISTA-_1_-_1_.webp" type="image/webp" />
              <img 
                src="/lp/ESPECIALISTA-_1_-_1_.webp" 
                alt="Especialista" 
                className="w-auto max-h-[90vh] h-auto object-contain object-right-bottom object-bottom"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Conteúdo Hero */}
        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center px-4 sm:px-6 lg:px-8 pt-8 pb-0 md:pt-16 md:pb-0">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">
            {/* Copy e CTA - Lado Esquerdo */}
            <div className="max-w-2xl text-center md:text-left relative z-30 w-full md:w-auto">
              <div className="space-y-8 md:space-y-8">
                <div className="space-y-4 md:space-y-5">
                  {/* Headline Principal - Impacto Máximo */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Últimas vagas: transforme{' '}
                    <span className="inline-flex items-baseline gap-1">
                      <span className="text-gradient-money">R$</span>
                      <span className="text-gradient-money">200</span>
                    </span>
                    {' '}em{' '}
                    <span className="inline-flex items-baseline gap-1">
                      <span className="text-gradient-money">R$</span>
                      <span className="text-gradient-money">5.000</span>
                    </span>
                    <svg className="inline-block w-6 h-6 md:w-7 md:h-7 ml-2 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                  </h1>
                  
                  {/* Subheadline */}
                  <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                    Te ensino a fazer de R$ 5k a R$ 30k por mês no meu grupo vip.
                  </p>
                </div>

                {/* CTA Hero */}
                <div className="space-y-4">
                  <a 
                    href={trackingLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-telegram-link="true"
                    onClick={handleTelegramClick}
                    className="inline-block px-10 py-5 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden animate-shimmer-orange"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                      Entrar no grupo agora
                    </span>
                  </a>
                  
                  {/* Microcopy Agressivo */}
                  <p className="text-orange-400 text-sm md:text-base font-semibold">
                    100% grátis | <span className="text-gradient-orange-plus font-black">+</span>4 mil alunos
                  </p>
                  
                  {/* Contador Fake - Pessoas entrando e vagas disponíveis */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-lg border border-orange-500/30 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                      {/* Pessoas entrando agora */}
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-400">Entraram agora</p>
                          <p className="text-lg md:text-xl font-bold text-green-400">
                            <span className="tabular-nums">{peopleEntered.toLocaleString('pt-BR')}</span> pessoas
                          </p>
                        </div>
                      </div>
                      
                      {/* Separador */}
                      <div className="hidden md:block w-px h-8 bg-gray-600"></div>
                      
                      {/* Vagas disponíveis */}
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className={`w-3 h-3 ${availableSpots === 0 ? 'bg-red-600' : 'bg-red-400'} rounded-full ${availableSpots === 0 ? 'animate-ping' : 'animate-pulse'}`}></div>
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-400">Vagas disponíveis</p>
                          <p className={`text-lg md:text-xl font-bold ${availableSpots === 0 ? 'text-red-600 animate-pulse' : 'text-red-400'}`}>
                            <span className="tabular-nums">{availableSpots}</span> {availableSpots === 0 ? 'ESGOTADAS!' : 'restantes'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem do Especialista - Mobile */}
        <div className="block md:hidden relative mt-6 z-10 w-full pointer-events-none overflow-visible flex justify-center items-end px-4 sm:px-6">
          <picture>
            <source srcSet="/lp/ESPECIALISTA-_1_-_1_.webp" type="image/webp" />
            <img 
              src="/lp/ESPECIALISTA-_1_-_1_.webp" 
              alt="Especialista" 
              className="w-full max-h-[50vh] h-auto object-contain object-bottom"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      {/* Faixa Ao Vivo Animada */}
      <section className="relative bg-orange-500 py-2 md:py-2.5 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 mx-6 whitespace-nowrap">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                <span className="text-white font-medium text-sm md:text-base">AO VIVO</span>
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 mx-6 whitespace-nowrap">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                <span className="text-white font-medium text-sm md:text-base">AO VIVO</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 2: Depoimentos - Marquee Horizontal */}
      <section className="relative bg-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título da Seção */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Resultados reais de quem decidiu mudar de vida.
            </h2>
          </div>

          {/* Marquee de Depoimentos */}
          <div 
            ref={containerRef}
            className="depoimentos-marquee-container overflow-x-auto overflow-y-hidden scrollbar-hide"
          >
            <div className="depoimentos-marquee-content flex gap-6">
              {/* Primeira linha de imagens */}
              {[
                'WhatsApp Image 2025-12-16 at 23.46.12.jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (1).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (2).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (3).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (4).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.13.jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.13 (1).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.13 (2).jpeg',
              ].map((img, i) => (
                <div key={`first-${i}`} className="flex-shrink-0 w-[300px] md:w-[400px] h-[400px] md:h-[500px] flex items-center justify-center">
                  <img 
                    src={`/lp/${img}`}
                    alt={`Depoimento ${i + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
              {/* Duplicação para loop infinito - mostra todas antes de reiniciar */}
              {[
                'WhatsApp Image 2025-12-16 at 23.46.12.jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (1).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (2).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (3).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.12 (4).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.13.jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.13 (1).jpeg',
                'WhatsApp Image 2025-12-16 at 23.46.13 (2).jpeg',
              ].map((img, i) => (
                <div key={`second-${i}`} className="flex-shrink-0 w-[300px] md:w-[400px] h-[400px] md:h-[500px] flex items-center justify-center">
                  <img 
                    src={`/lp/${img}`}
                    alt={`Depoimento ${i + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Autoridade Implícita */}
      <section className="relative bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300">
              Aqui não tem achismo.
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
              Tem leitura, critério e direção clara.
            </p>
            {/* Selo 100% Grátis */}
            <div className="pt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-orange-500/30">
                <span className="text-gray-300 font-medium text-sm md:text-base">
                  100% grátis | <span className="text-gradient-orange-plus font-black">+</span>4 mil alunos
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: CTA Principal + Urgência Psicológica */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* CTA Principal */}
            <div className="space-y-6">
              <a 
                href={trackingLink}
                target="_blank" 
                rel="noopener noreferrer"
                data-telegram-link="true"
                onClick={handleTelegramClick}
                className="inline-block px-12 py-6 text-white font-bold text-2xl md:text-3xl rounded-xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden animate-shimmer-orange"
              >
                <span className="flex items-center justify-center gap-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                  Entrar no grupo agora
                </span>
              </a>
              
              <p className="text-orange-400 text-lg md:text-xl font-bold">
                Quanto mais você demora, mais oportunidades perde.
              </p>
              
              {/* Contador Fake - Pessoas entrando e vagas disponíveis */}
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-lg border border-orange-500/30 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                  {/* Pessoas entrando agora */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Entraram agora</p>
                      <p className="text-lg md:text-xl font-bold text-green-400">
                        <span className="tabular-nums">{peopleEntered.toLocaleString('pt-BR')}</span> pessoas
                      </p>
                    </div>
                  </div>
                  
                  {/* Separador */}
                  <div className="hidden md:block w-px h-8 bg-gray-600"></div>
                  
                      {/* Vagas disponíveis */}
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className={`w-3 h-3 ${availableSpots === 0 ? 'bg-red-600' : 'bg-red-400'} rounded-full ${availableSpots === 0 ? 'animate-ping' : 'animate-pulse'}`}></div>
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-400">Vagas disponíveis</p>
                          <p className={`text-lg md:text-xl font-bold ${availableSpots === 0 ? 'text-red-600 animate-pulse' : 'text-red-400'}`}>
                            <span className="tabular-nums">{availableSpots}</span> {availableSpots === 0 ? 'ESGOTADAS!' : 'restantes'}
                          </p>
                        </div>
                      </div>
                </div>
              </div>
            </div>

            {/* Urgência Psicológica */}
            <div className="pt-8 border-t border-gray-700 space-y-4">
              <p className="text-xl md:text-2xl text-gray-300">
                Você pode continuar tentando sozinho.
              </p>
              <p className="text-2xl md:text-3xl text-white font-bold">
                Ou pode entrar onde o jogo começa a fazer sentido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 6: Fechamento Forte - CTA Secundário */}
      <section className="relative bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a 
            href={trackingLink}
            target="_blank" 
            rel="noopener noreferrer"
            data-telegram-link="true"
            onClick={handleTelegramClick}
            className="block bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-500 rounded-xl p-8 md:p-12 shadow-2xl hover:shadow-orange-500/30 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-3 group-hover:text-orange-400 transition-colors">
              O jogo não perdoa quem decide errado.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl text-orange-400 font-bold mb-4">
              Aqui você aprende a decidir certo.
            </p>
            <div className="mt-6 pt-6 border-t border-orange-500/30">
              <span className="inline-flex items-center gap-3 text-white font-semibold text-lg md:text-xl px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                Clique para entrar no grupo vip do telegram
                <svg className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Rodapé - IGUAL À METODOX */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo King Panda */}
          <div className="mb-6 flex justify-center">
            <picture>
              <source srcSet="/kingpanda-logo.png.webp" type="image/webp" />
              <img 
                src="/kingpanda-logo.png.png" 
                alt="King Panda - Jogue com Responsabilidade" 
                className="max-w-full h-auto"
                style={{ maxHeight: '100px' }}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          {/* Texto de Disclaimer */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              Esse site não é afiliado ao Meta Ads ou qualquer ativo da marca. Aposta não é investimento e os ganhos referentes aos métodos mencionados nesta página não são garantidos. Jogue com muita responsabilidade sabendo que apostas envolvem vícios e dependências e são apenas permitidas para maiores de 18 anos. Não cobrimos nenhum tipo de prejuízo feito pelo próprio cliente.
            </p>
          </div>
        </div>
      </footer>

      {/* Popup de Segunda Chance */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border-2 border-orange-500/50 max-w-lg w-full p-6 md:p-8 animate-scale-in">
            {/* Botão fechar */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Conteúdo do Popup */}
            <div className="text-center space-y-6">
              {/* Ícone de alerta/oportunidade */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Título */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  ⚠️ Vagas Esgotadas!
                </h2>
                <p className="text-lg md:text-xl text-orange-400 font-semibold">
                  Mas você ainda tem uma chance! 🎯
                </p>
              </div>

              {/* Oferta Irresistível */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Entre no Grupo Básico GRÁTIS
                </h3>
                <p className="text-lg md:text-xl font-bold text-center">
                  Aprenda a fazer{' '}
                  <span className="inline-flex items-baseline gap-1">
                    <span className="text-gradient-money">R$</span>
                    <span className="text-gradient-money">1.000</span>
                  </span>
                  {' '}com{' '}
                  <span className="inline-flex items-baseline gap-1">
                    <span className="text-gradient-money">R$</span>
                    <span className="text-gradient-money">100</span>
                  </span>
                  .
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300">
                      <span className="font-bold text-white">Aprenda o básico</span> enquanto aguarda novas vagas
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300">
                      <span className="font-bold text-white">Seja avisado em primeira mão</span> quando abrirem novas vagas VIP
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-300">
                      <span className="font-bold text-white">100% grátis</span> - sem compromisso
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA do Popup */}
              <a
                href={trackingLink}
                target="_blank"
                rel="noopener noreferrer"
                data-telegram-link="true"
                onClick={() => {
                  handleTelegramClick();
                  setShowPopup(false);
                }}
                className="block w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg md:text-xl rounded-xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden animate-shimmer-orange"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                  Entrar no Grupo Básico AGORA
                </span>
              </a>

              {/* Texto de urgência */}
              <p className="text-sm text-gray-400">
                Não perca esta oportunidade única! ⏰
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageLP;

