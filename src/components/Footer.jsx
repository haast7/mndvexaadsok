import React from 'react';

const Footer = () => {
  return (
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
              Transformando apostadores através de educação, disciplina e estratégia.
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
              Esse site não é afiliado ao Meta Ads ou qualquer ativo da marca. Aposta não é investimento e os ganhos referentes aos métodos mencionados nesta página não são garantidos. Jogue com muita responsabilidade sabendo que apostas envolvem vícios e dependências e são apenas permitidas para maiores de 18 anos. Não cobrimos nenhum tipo de prejuízo feito pelo próprio cliente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

