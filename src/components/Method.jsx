import React from 'react';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const Method = () => {
  const trackingLink = useTrackingLink();

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };
  const steps = [
    {
      number: '01',
      title: 'Mentalidade Vencedora',
      description: 'Desenvolva a disciplina mental necessária para tomar decisões racionais, mesmo sob pressão. Aprenda a controlar emoções e seguir seu plano.',
      icon: '🧠'
    },
    {
      number: '02',
      title: 'Análise Estratégica',
      description: 'Entenda como analisar jogos, identificar valor nas odds e fazer escolhas fundamentadas em dados, não em impulso.',
      icon: '📊'
    },
    {
      number: '03',
      title: 'Gestão de Banca',
      description: 'Aprenda a gerenciar seu capital de forma inteligente. Saiba quanto apostar em cada jogo e como proteger sua banca.',
      icon: '💰'
    },
    {
      number: '04',
      title: 'Momento Certo',
      description: 'Identifique quando aumentar suas apostas e, mais importante, quando parar. A paciência é uma das maiores virtudes de um apostador.',
      icon: '⏰'
    },
  ];

  return (
    <section id="metodo" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O Método X
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Um sistema completo em 4 pilares fundamentais para transformar sua jornada como apostador
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-primary-600 font-bold text-sm">{step.number}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Transformar sua Jornada?
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Junte-se a apostadores que aprenderam a apostar com sabedoria e disciplina
          </p>
          <a 
            href={trackingLink}
            target="_blank" 
            rel="noopener noreferrer"
            data-telegram-link="true"
            onClick={handleTelegramClick}
            className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Entrar no Grupo do Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Method;

