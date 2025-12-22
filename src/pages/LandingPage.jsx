import React from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const LandingPage = () => {
  const trackingLink = useTrackingLink();

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Seção Hero com altura reduzida */}
      <div className="relative md:h-[90vh] lg:h-[85vh] overflow-auto md:overflow-hidden">
        {/* Background com imagem - acompanha a altura do conteúdo */}
        <div className="absolute inset-0 md:h-full">
          <picture>
            {/* Mobile: versão otimizada menor */}
            <source 
              media="(max-width: 767px)" 
              srcSet="/metodox/BG-_1__11zon.webp" 
              type="image/webp" 
            />
            {/* Desktop: versão completa */}
            <source 
              media="(min-width: 768px)" 
              srcSet="/metodox/BG-_1__11zon.webp" 
              type="image/webp" 
            />
            <img 
              src="/BG.png" 
              alt="Background" 
              className="w-full h-full object-cover object-center md:object-center object-bottom md:object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1920"
              height="1080"
              style={{ aspectRatio: '1920 / 1080' }}
            />
          </picture>
          {/* Overlay gradiente para melhorar legibilidade do texto à esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Imagem do Especialista - Desktop colada na base */}
        <div className="hidden md:block absolute bottom-0 right-0 z-20 w-[70%] lg:w-[65%] xl:w-[60%] h-full pointer-events-none overflow-hidden">
          <div className="relative w-full h-full flex items-end justify-end">
            <picture>
              <source srcSet="/metodox/ESPECIALISTA-_1_.webp" type="image/webp" />
              <img 
                src="/ESPECIALISTA.png" 
                alt="Especialista" 
                className="w-auto h-full object-contain object-right-bottom object-bottom"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1200"
                height="1800"
                style={{ aspectRatio: '1200 / 1800' }}
              />
            </picture>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center px-4 sm:px-6 lg:px-8 pt-8 pb-0 md:pt-16 md:pb-0">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">
            {/* Copy e CTA - Lado Esquerdo */}
            <div className="max-w-2xl text-center md:text-left relative z-30 w-full md:w-auto">
              <div className="space-y-8 md:space-y-8">
              <div className="space-y-6 md:space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Pare de <span className="text-gradient-blue-mobile md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-blue-400 md:via-blue-500 md:to-blue-400">perder dinheiro</span>
                  <span className="block mt-2">apostando no escuro.</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Aqui você entra para aprender como decisões inteligentes são feitas antes de continuar errando sozinho.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href={trackingLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-telegram-link="true"
                  onClick={handleTelegramClick}
                  className="inline-block px-10 py-5 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden animate-shimmer-telegram"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    Entrar agora e aprender o método
                  </span>
                </a>
                
                <p className="text-gray-400 text-sm">
                  ⚡ Acesso imediato • Tudo acontece no Telegram
                </p>
              </div>

              </div>
            </div>
          </div>
        </div>

        {/* Imagem do Especialista - Mobile abaixo do texto "Acesso imediato" */}
        {/* IMPORTANTE: Se esta imagem for o LCP element no mobile, mudamos para eager */}
        <div className="block md:hidden relative mt-6 z-10 w-full pointer-events-none overflow-visible flex justify-center items-end px-4 sm:px-6">
          <picture>
            <source srcSet="/metodox/ESPECIALISTA-_1_.webp" type="image/webp" />
            <img 
              src="/ESPECIALISTA.png" 
              alt="Especialista" 
              className="w-full max-h-[60vh] h-auto object-contain object-bottom"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="800"
              height="1200"
              style={{ aspectRatio: '800 / 1200' }}
            />
          </picture>
        </div>
      </div>

      {/* Rodapé */}
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
                style={{ maxHeight: '100px', aspectRatio: 'auto' }}
                loading="lazy"
                decoding="async"
                width="200"
                height="100"
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
    </div>
  );
};

export default LandingPage;

