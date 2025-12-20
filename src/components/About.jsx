import React from 'react';

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Foto do Especialista */}
          <div className="relative order-2 md:order-1">
            <div className="relative z-10">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-primary-200">
                <img 
                  src="/man-t-shirt.jpg.jpeg" 
                  alt="Especialista em Apostas Esportivas" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-300 rounded-2xl -z-10"></div>
          </div>

          <div className="animate-slide-up order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Quem é o Mentor?
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Com anos de experiência no mercado de apostas esportivas, desenvolvi o 
              <strong className="text-primary-600"> Método X</strong> baseado em análise 
              técnica, gestão de banca e, principalmente, <strong>disciplina mental</strong>.
            </p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Minha missão não é prometer ganhos fáceis, mas sim ensinar apostadores a 
              desenvolverem uma mentalidade vencedora, entenderem os momentos certos para 
              apostar e, acima de tudo, saberem quando parar.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-4 text-gray-700">Anos de experiência no mercado</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-4 text-gray-700">Método baseado em análise e disciplina</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-4 text-gray-700">Foco em educação e responsabilidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

