import React from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const CTA = () => {
  const trackingLink = useTrackingLink();

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Pronto para Começar sua Transformação?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Junte-se ao Método X e aprenda a apostar com sabedoria, disciplina e estratégia. 
          Sua jornada para resultados consistentes começa aqui.
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">O Que Está Incluído:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-primary-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-200">Acesso completo ao Método X</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-primary-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-200">Materiais exclusivos e guias práticos</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-primary-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-200">Suporte e acompanhamento</span>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-primary-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-200">Acesso à comunidade exclusiva</span>
            </div>
          </div>
        </div>

        <a 
          href={trackingLink}
          target="_blank" 
          rel="noopener noreferrer"
          data-telegram-link="true"
          onClick={handleTelegramClick}
          className="inline-block px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-lg shadow-2xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300"
        >
          Entrar no Grupo do Telegram
        </a>

        <p className="mt-6 text-sm text-gray-400">
          ⚡ Tudo acontece no grupo do Telegram
        </p>
      </div>
    </section>
  );
};

export default CTA;

