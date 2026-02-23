import React from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const LandingPageBT = () => {
  const trackingLink = useTrackingLink();

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Seção Hero - IGUAL À METODOX */}
      <div className="relative md:h-[90vh] lg:h-[85vh] overflow-auto md:overflow-hidden bg-black">
        {/* Background com imagem */}
        <div className="absolute inset-0 md:h-full">
          <picture>
            {/* Desktop */}
            <source 
              media="(min-width: 768px)" 
              srcSet="/bt/BG-_2_.webp" 
              type="image/webp" 
            />
            {/* Mobile */}
            <source 
              media="(max-width: 767px)" 
              srcSet="/bt/BG-_2_.webp" 
              type="image/webp" 
            />
            {/* Fallback */}
            <img 
              src="/bt/BG-_2_.webp" 
              alt="Background" 
              className="w-full h-full object-cover object-center md:object-center object-bottom md:object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          {/* Overlay gradiente para melhorar legibilidade do texto à esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Imagem do Especialista - Desktop colada na base */}
        <div className="hidden md:block absolute bottom-0 right-8 lg:right-12 xl:right-16 z-20 w-[55%] lg:w-[50%] xl:w-[45%] h-full pointer-events-none overflow-hidden">
          <div className="relative w-full h-full flex items-end justify-end">
            <picture>
              <source srcSet="/bt/ESPECIALISTA.webp" type="image/webp" />
              <img 
                src="/bt/ESPECIALISTA.webp" 
                alt="Especialista" 
                className="w-auto object-contain object-right-bottom"
                style={{ maxHeight: '92%', maxWidth: '100%', height: 'auto', width: 'auto' }}
                loading="eager"
                fetchPriority="high"
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
              <div className="space-y-4 md:space-y-5">
                {/* Topo - grande */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  VOCÊ NÃO VAI PAGAR NADA. <span className="text-gradient-money">É 100% GRATUITO</span>
                </h1>

                {/* Disclaimer */}
                <p className="text-sm md:text-base text-gray-400 italic">
                  Isso não é robô e não é grupo de sinais.
                </p>

                {/* Parágrafo do meio */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Dentro da Comunidade, eu vou te mostrar <span className="text-gradient-money font-semibold">passo a passo</span> a estratégia que eu utilizo. Aplicando corretamente, os resultados tendem a ser semelhantes aos da maioria dos alunos que já estão lá: entre <span className="text-gradient-money font-semibold">R$200 e R$700 por dia</span>, com gestão e segurança.
                </p>

                {/* Em baixo - grande */}
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug">
                  Vou te ensinar como eu transformo uma banca de <span className="text-gradient-money">R$200</span> em até <span className="text-gradient-money">R$700</span> reais, utilizando a minha própria estratégia, de forma simples e prática.
                </p>

                {/* CTA Hero - botão mantido */}
                <div className="pt-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem do Especialista - Mobile */}
        <div className="block md:hidden relative mt-6 z-10 w-full pointer-events-none overflow-visible flex justify-center items-end px-4 sm:px-6">
          <picture>
            <source srcSet="/bt/ESPECIALISTA.webp" type="image/webp" />
            <img 
              src="/bt/ESPECIALISTA.webp" 
              alt="Especialista" 
              className="w-full max-h-[60vh] h-auto object-contain object-bottom"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      {/* Sessão 2: fundo preto + só a imagem King Panda */}
      <section className="relative z-10 bg-black flex justify-center items-center py-8 md:py-10">
        <img
          src="/kingpanda-logo.png.webp"
          alt="King Panda - Jogue com responsabilidade"
          className="h-12 md:h-14 w-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      </section>

      {/* Sessão 3: texto do footer (aviso legal) */}
      <footer className="relative z-10 mt-auto">
        <section className="bg-[#1e293b] text-white py-5 md:py-6" aria-label="Aviso legal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs md:text-sm leading-relaxed text-white/95 text-justify">
              Esse site não é afiliado ao Meta Ads ou qualquer ativo da marca. Aposta não é investimento e os ganhos referentes aos métodos mencionados nesta página não são garantidos. Jogue com muita responsabilidade sabendo que apostas envolvem vícios e dependências e são apenas permitidas para maiores de 18 anos. Não cobrimos nenhum tipo de prejuízo feito pelo próprio cliente.
            </p>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default LandingPageBT;
