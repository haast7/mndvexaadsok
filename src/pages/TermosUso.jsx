import React from 'react';
import NavbarPolicy from '../components/NavbarPolicy';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarPolicy />
      <div className="pt-16 md:pt-20">
        <Banner imagePath="/LP_02.webp" alt="Método X" />
      </div>
      <div className="pb-20 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Termos de Uso
            </h1>
            
            <p className="text-gray-600 mb-8">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p className="leading-relaxed">
                  Ao acessar e utilizar o site do Método X, você concorda em cumprir e estar vinculado 
                  a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, 
                  não deve utilizar nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  2. Descrição do Serviço
                </h2>
                <p className="leading-relaxed mb-4">
                  O Método X oferece conteúdo educacional sobre apostas esportivas, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Materiais educacionais sobre estratégias de apostas</li>
                  <li>Orientações sobre gestão de banca e disciplina mental</li>
                  <li>Acesso a comunidade no Telegram</li>
                  <li>Conteúdo informativo sobre apostas esportivas</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>Importante:</strong> Não oferecemos serviços de apostas diretamente. 
                  Somos uma plataforma educacional que fornece informações e estratégias.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  3. Elegibilidade
                </h2>
                <p className="leading-relaxed mb-4">
                  Para utilizar nossos serviços, você deve:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Ter pelo menos 18 anos de idade</li>
                  <li>Ter capacidade legal para celebrar contratos</li>
                  <li>Estar em conformidade com todas as leis locais aplicáveis</li>
                  <li>Não estar proibido de usar serviços relacionados a apostas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  4. Uso do Site
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  4.1. Uso Permitido
                </h3>
                <p className="leading-relaxed mb-4">
                  Você pode usar nosso site para:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Acessar conteúdo educacional</li>
                  <li>Participar da comunidade</li>
                  <li>Obter informações sobre estratégias de apostas</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  4.2. Uso Proibido
                </h3>
                <p className="leading-relaxed mb-4">
                  Você não pode:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Usar o site para atividades ilegais</li>
                  <li>Reproduzir, distribuir ou modificar nosso conteúdo sem autorização</li>
                  <li>Tentar acessar áreas restritas do site</li>
                  <li>Interferir no funcionamento do site</li>
                  <li>Usar bots, scripts ou ferramentas automatizadas</li>
                  <li>Transmitir vírus ou código malicioso</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  5. Propriedade Intelectual
                </h2>
                <p className="leading-relaxed mb-4">
                  Todo o conteúdo do site, incluindo textos, gráficos, logos, imagens e software, 
                  é propriedade do Método X ou de seus licenciadores e está protegido por leis de 
                  direitos autorais e outras leis de propriedade intelectual.
                </p>
                <p className="leading-relaxed">
                  Você não pode usar, reproduzir ou distribuir nosso conteúdo sem autorização prévia por escrito.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  6. Isenção de Responsabilidade
                </h2>
                <p className="leading-relaxed mb-4">
                  <strong>6.1. Sem Garantias</strong>
                </p>
                <p className="leading-relaxed mb-4">
                  O Método X fornece informações educacionais "como estão", sem garantias de qualquer tipo, 
                  expressas ou implícitas. Não garantimos:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Resultados financeiros específicos</li>
                  <li>Precisão absoluta das informações</li>
                  <li>Disponibilidade contínua do site</li>
                  <li>Ausência de erros ou interrupções</li>
                </ul>

                <p className="leading-relaxed mb-4">
                  <strong>6.2. Risco do Usuário</strong>
                </p>
                <p className="leading-relaxed">
                  Você reconhece que apostas esportivas envolvem risco de perda financeira. 
                  O uso de nossas informações e estratégias é por sua conta e risco. 
                  Não somos responsáveis por quaisquer perdas financeiras resultantes do uso de nosso conteúdo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  7. Limitação de Responsabilidade
                </h2>
                <p className="leading-relaxed mb-4">
                  Na máxima extensão permitida por lei, o Método X não será responsável por:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Perdas financeiras decorrentes de apostas</li>
                  <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                  <li>Interrupção de negócios ou perda de dados</li>
                  <li>Erros ou omissões no conteúdo</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  8. Links para Sites de Terceiros
                </h2>
                <p className="leading-relaxed">
                  Nosso site pode conter links para sites de terceiros. Não temos controle sobre 
                  o conteúdo desses sites e não assumimos responsabilidade por eles. 
                  O acesso a sites de terceiros é por sua conta e risco.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  9. Modificações dos Termos
                </h2>
                <p className="leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                  Alterações significativas serão notificadas através do site. O uso continuado 
                  do site após as modificações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  10. Lei Aplicável
                </h2>
                <p className="leading-relaxed">
                  Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa será 
                  resolvida nos tribunais competentes do Brasil.
                </p>
              </section>

              <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Aviso Importante
                </h2>
                <p className="leading-relaxed text-gray-700">
                  <strong>Este site não é afiliado ao Meta Ads ou qualquer ativo da marca.</strong> 
                  Aposta não é investimento e os ganhos referentes aos métodos mencionados nesta 
                  página não são garantidos. Jogue com muita responsabilidade sabendo que apostas 
                  envolvem vícios e dependências e são apenas permitidas para maiores de 18 anos. 
                  Não cobrimos nenhum tipo de prejuízo feito pelo próprio cliente.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a 
                  href="/" 
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  ← Voltar para a página inicial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermosUso;

