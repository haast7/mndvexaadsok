import React from 'react';
import NavbarPolicy from '../components/NavbarPolicy';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const PoliticaPrivacidade = () => {
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
              Política de Privacidade
            </h1>
            
            <p className="text-gray-600 mb-8">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  1. Introdução
                </h2>
                <p className="leading-relaxed">
                  Esta Política de Privacidade descreve como o Método X ("nós", "nosso" ou "a empresa") 
                  coleta, usa e protege suas informações pessoais quando você utiliza nosso site e serviços.
                </p>
                <p className="leading-relaxed mt-4">
                  Ao acessar e utilizar nosso site, você concorda com a coleta e uso de informações 
                  de acordo com esta política.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  2. Informações que Coletamos
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  2.1. Informações Fornecidas por Você
                </h3>
                <p className="leading-relaxed mb-4">
                  Podemos coletar informações que você nos fornece diretamente, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Nome e informações de contato</li>
                  <li>Endereço de e-mail</li>
                  <li>Informações de pagamento (quando aplicável)</li>
                  <li>Comunicações que você envia para nós</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  2.2. Informações Coletadas Automaticamente
                </h3>
                <p className="leading-relaxed mb-4">
                  Quando você visita nosso site, podemos coletar automaticamente:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e versão</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Data e hora de acesso</li>
                  <li>Referência (site de origem)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  3. Como Usamos suas Informações
                </h2>
                <p className="leading-relaxed mb-4">
                  Utilizamos as informações coletadas para:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Fornecer, manter e melhorar nossos serviços</li>
                  <li>Processar transações e enviar notificações relacionadas</li>
                  <li>Enviar comunicações promocionais (com seu consentimento)</li>
                  <li>Responder a suas solicitações e perguntas</li>
                  <li>Detectar e prevenir fraudes e abusos</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  4. Compartilhamento de Informações
                </h2>
                <p className="leading-relaxed mb-4">
                  Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Prestadores de Serviços:</strong> Com empresas que nos ajudam a operar nosso negócio (processamento de pagamentos, hospedagem, etc.)</li>
                  <li><strong>Obrigações Legais:</strong> Quando exigido por lei ou para proteger nossos direitos</li>
                  <li><strong>Com seu Consentimento:</strong> Quando você autorizar explicitamente</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  5. Cookies e Tecnologias Similares
                </h2>
                <p className="leading-relaxed mb-4">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar 
                  o tráfego do site e personalizar conteúdo. Você pode controlar o uso de cookies 
                  através das configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  6. Segurança dos Dados
                </h2>
                <p className="leading-relaxed mb-4">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas 
                  informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <p className="leading-relaxed">
                  No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico 
                  é 100% seguro. Embora nos esforcemos para proteger suas informações, não podemos 
                  garantir segurança absoluta.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  7. Seus Direitos
                </h2>
                <p className="leading-relaxed mb-4">
                  Você tem o direito de:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações incorretas ou incompletas</li>
                  <li>Solicitar a exclusão de suas informações</li>
                  <li>Opor-se ao processamento de suas informações</li>
                  <li>Solicitar a portabilidade de seus dados</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  8. Retenção de Dados
                </h2>
                <p className="leading-relaxed">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os 
                  propósitos descritos nesta política, a menos que um período de retenção mais longo 
                  seja exigido ou permitido por lei.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  9. Alterações nesta Política
                </h2>
                <p className="leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                  mudanças significativas publicando a nova política nesta página e atualizando a 
                  data de "última atualização".
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  10. Contato
                </h2>
                <p className="leading-relaxed mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                  suas informações pessoais, entre em contato conosco através do grupo do Telegram.
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

export default PoliticaPrivacidade;

