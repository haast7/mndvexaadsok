import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Carlos M.',
      role: 'Apostador há 2 anos',
      content: 'O Método X mudou completamente minha forma de apostar. Aprendi a ter disciplina e hoje consigo gerenciar minha banca de forma muito mais inteligente.',
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
      role: 'Apostador experiente',
      content: 'Pensava que sabia tudo sobre apostas. O Método X me mostrou que disciplina e saber quando parar são mais importantes que qualquer estratégia.',
      rating: 5
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O Que Dizem Nossos Alunos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Histórias reais de apostadores que transformaram sua jornada
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
  );
};

export default Testimonials;














