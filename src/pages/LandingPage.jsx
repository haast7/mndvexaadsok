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
      {/* Background com gradiente e efeitos */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Padrão de pontos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Círculos animados de fundo */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Foto Grande */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="/man-t-shirt.jpg.jpeg" 
                  alt="Especialista em Apostas Esportivas" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Brilho decorativo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Copy e CTA */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Transforme sua
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mt-2">
                    Mentalidade
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                  Junte-se ao <strong className="text-white">Método X</strong> e aprenda a apostar com 
                  <strong className="text-primary-400"> sabedoria</strong>, 
                  <strong className="text-primary-400"> disciplina</strong> e 
                  <strong className="text-primary-400"> estratégia</strong>.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href={trackingLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-telegram-link="true"
                  onClick={handleTelegramClick}
                  className="inline-block px-10 py-5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300 animate-shimmer"
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    Entrar no Grupo Agora
                  </span>
                </a>
                
                <p className="text-gray-400 text-sm">
                  ⚡ Acesso imediato • Tudo acontece no Telegram
                </p>
              </div>

              {/* Features rápidas */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-1">4</div>
                  <div className="text-sm text-gray-400">Pilares</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Suporte</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-1">100%</div>
                  <div className="text-sm text-gray-400">Gratuito</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo King Panda */}
          <div className="mb-6 flex justify-center">
            <img 
              src="/kingpanda-logo.png.png" 
              alt="King Panda - Jogue com Responsabilidade" 
              className="max-w-full h-auto"
              style={{ maxHeight: '100px' }}
            />
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

