import React from 'react';
import Navbar from '../components/Navbar';
import useTrackingLink from '../hooks/useTrackingLink';
import { trackTelegramClick } from '../config/tracking';

const LandingPageAds = () => {
  const trackingLink = useTrackingLink();

  const handleTelegramClick = () => {
    trackTelegramClick('Click');
  };

  return (
    <div className="App">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Animated Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Decisões Inteligentes,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mt-2">
                Resultados Consistentes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra o <strong>Método X</strong> e transforme sua mentalidade. 
              Aprenda quando avançar, quando parar e como construir resultados reais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <a 
                href={trackingLink}
                target="_blank" 
                rel="noopener noreferrer"
                data-telegram-link="true"
                onClick={handleTelegramClick}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Entrar no Grupo
              </a>
              <a 
                href="#sobre" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Foto do Especialista */}
            <div className="relative order-2 md:order-1">
              <div className="relative z-10">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-primary-200">
                  <picture>
                    <source srcSet="/man-t-shirt.webp" type="image/webp" />
                    <img 
                      src="/man-t-shirt.jpg.jpeg" 
                      alt="Especialista" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-300 rounded-2xl -z-10"></div>
            </div>

            <div className="animate-slide-up order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Quem é o Mentor?
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Com anos de experiência no mercado, desenvolvi o 
                <strong className="text-primary-600"> Método X</strong> baseado em análise 
                técnica, gestão de capital e, principalmente, <strong>disciplina mental</strong>.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Minha missão não é prometer ganhos fáceis, mas sim ensinar pessoas a 
                desenvolverem uma mentalidade vencedora, entenderem os momentos certos para 
                avançar e, acima de tudo, saberem quando parar.
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

      {/* Method Section */}
      <section id="metodo" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O Método X
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Um sistema completo em 4 pilares fundamentais para transformar sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: '01',
                title: 'Mentalidade Vencedora',
                description: 'Desenvolva a disciplina mental necessária para tomar decisões racionais, mesmo sob pressão. Aprenda a controlar emoções e seguir seu plano.',
                icon: '🧠'
              },
              {
                number: '02',
                title: 'Análise Estratégica',
                description: 'Entenda como analisar oportunidades, identificar valor e fazer escolhas fundamentadas em dados, não em impulso.',
                icon: '📊'
              },
              {
                number: '03',
                title: 'Gestão de Capital',
                description: 'Aprenda a gerenciar seu capital de forma inteligente. Saiba quanto investir em cada oportunidade e como proteger seus recursos.',
                icon: '💰'
              },
              {
                number: '04',
                title: 'Momento Certo',
                description: 'Identifique quando aumentar seus movimentos e, mais importante, quando parar. A paciência é uma das maiores virtudes.',
                icon: '⏰'
              },
            ].map((step, index) => (
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
              Junte-se a pessoas que aprenderam a tomar decisões com sabedoria e disciplina
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O Que Você Vai Aprender
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Um método completo que vai além das técnicas, desenvolvendo habilidades para a vida
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Disciplina Mental',
                description: 'Desenvolva autocontrole e tome decisões baseadas em estratégia, não em emoção.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Gestão Inteligente',
                description: 'Aprenda a proteger e fazer crescer seu capital de forma sustentável.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Análise Estratégica',
                description: 'Identifique oportunidades reais e evite decisões por impulso.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: 'Momento Certo',
                description: 'Saiba quando aumentar seus movimentos e quando é hora de parar.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Suporte Contínuo',
                description: 'Acompanhamento e orientação para aplicar o método na prática.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              {
                title: 'Comunidade',
                description: 'Conecte-se com outras pessoas comprometidas com a disciplina.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
            ].map((benefit, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl border-2 border-gray-100 hover:border-primary-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O Que Dizem Nossos Alunos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Carlos M.',
                role: 'Membro há 2 anos',
                content: 'O Método X mudou completamente minha forma de tomar decisões. Aprendi a ter disciplina e hoje consigo gerenciar meu capital de forma muito mais inteligente.',
                rating: 5
              },
              {
                name: 'Ana Paula S.',
                role: 'Iniciante',
                content: 'Como iniciante, estava perdida. O método me ensinou não só técnicas, mas principalmente a mentalidade correta. Recomendo demais!',
                rating: 5
              },
              {
                name: 'Roberto L.',
                role: 'Experiente',
                content: 'Pensava que sabia tudo. O Método X me mostrou que disciplina e saber quando parar são mais importantes que qualquer estratégia.',
                rating: 5
              },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            Junte-se ao Método X e aprenda a tomar decisões com sabedoria, disciplina e estratégia. 
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo King Panda */}
          <div className="mb-8 flex justify-center">
            <picture>
              <source srcSet="/kingpanda-logo.png.webp" type="image/webp" />
              <img 
                src="/kingpanda-logo.png.png" 
                alt="King Panda - Jogue com Responsabilidade" 
                className="max-w-full h-auto"
                style={{ maxHeight: '120px' }}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Método X</h3>
              <p className="text-gray-400 leading-relaxed">
                Transformando pessoas através de educação, disciplina e estratégia.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#sobre" className="hover:text-primary-400 transition-colors">Sobre</a></li>
                <li><a href="#metodo" className="hover:text-primary-400 transition-colors">O Método</a></li>
                <li><a href="#cta" className="hover:text-primary-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Importante</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/jogo-responsavel" className="hover:text-primary-400 transition-colors">Jogo Responsável</a></li>
                <li><a href="/politica-privacidade" className="hover:text-primary-400 transition-colors">Política de Privacidade</a></li>
                <li><a href="/termos-uso" className="hover:text-primary-400 transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <p className="text-xs text-gray-400 leading-relaxed text-center">
                Esse site não é afiliado ao Meta Ads ou qualquer ativo da marca. Os resultados mencionados nesta página não são garantidos. Jogue com muita responsabilidade sabendo que envolve riscos e é permitido apenas para maiores de 18 anos. Não cobrimos nenhum tipo de prejuízo feito pelo próprio cliente.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageAds;




