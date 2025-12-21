import React from 'react';
import NavbarPolicy from '../components/NavbarPolicy';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const JogoResponsavel = () => {
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
              Jogo Responsável
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Compromisso com o Jogo Responsável
                </h2>
                <p className="leading-relaxed">
                  O Método X está comprometido em promover o jogo responsável e consciente. 
                  Acreditamos que as apostas esportivas devem ser uma forma de entretenimento 
                  e não uma fonte de problemas financeiros ou pessoais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  O Que é Jogo Responsável?
                </h2>
                <p className="leading-relaxed mb-4">
                  Jogo responsável significa apostar de forma controlada, dentro dos seus limites 
                  financeiros e emocionais, sempre mantendo o equilíbrio e a disciplina.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Apostar apenas o que você pode perder</li>
                  <li>Nunca apostar sob influência de álcool ou drogas</li>
                  <li>Não apostar quando estiver emocionalmente abalado</li>
                  <li>Estabelecer limites de tempo e dinheiro antes de começar</li>
                  <li>Nunca tentar recuperar perdas com apostas maiores</li>
                  <li>Tratar as apostas como entretenimento, não como fonte de renda</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Sinais de Alerta
                </h2>
                <p className="leading-relaxed mb-4">
                  Se você identificar algum desses sinais, pode ser que precise de ajuda:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Apostar mais do que pode pagar</li>
                  <li>Mentir sobre suas apostas para familiares ou amigos</li>
                  <li>Sentir necessidade de apostar com quantias cada vez maiores</li>
                  <li>Ficar irritado ou ansioso quando não pode apostar</li>
                  <li>Tentar recuperar perdas apostando mais</li>
                  <li>Negligenciar responsabilidades por causa das apostas</li>
                  <li>Pensar constantemente em apostas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Ferramentas de Controle
                </h2>
                <p className="leading-relaxed mb-4">
                  Recomendamos o uso das seguintes ferramentas para manter o controle:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Limites de Depósito:</strong> Estabeleça um limite máximo de quanto pode depositar por dia, semana ou mês</li>
                  <li><strong>Limites de Tempo:</strong> Defina quanto tempo pode dedicar às apostas</li>
                  <li><strong>Autoexclusão:</strong> Se necessário, use ferramentas de autoexclusão temporária ou permanente</li>
                  <li><strong>Revisão Regular:</strong> Revise regularmente seus gastos e tempo dedicado às apostas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Onde Buscar Ajuda
                </h2>
                <p className="leading-relaxed mb-4">
                  Se você acredita que tem um problema com jogos, não hesite em buscar ajuda profissional. 
                  Existem várias organizações que podem ajudar:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <h3 className="font-bold text-gray-900 mb-2">Organizações de Apoio:</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Jogadores Anônimos:</strong> Grupo de apoio para pessoas com problemas de jogo</li>
                    <li><strong>Centro de Valorização da Vida (CVV):</strong> 188 - Atendimento 24 horas</li>
                    <li><strong>Conselho Federal de Psicologia:</strong> Busque um psicólogo especializado</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Restrição de Idade
                </h2>
                <p className="leading-relaxed mb-4">
                  <strong>Importante:</strong> Apostas esportivas são permitidas apenas para maiores de 18 anos. 
                  Menores de idade não devem participar de atividades de apostas sob nenhuma circunstância.
                </p>
                <p className="leading-relaxed">
                  Se você é menor de 18 anos, por favor, saia desta página imediatamente.
                </p>
              </section>

              <section className="bg-primary-50 rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Lembre-se
                </h2>
                <p className="leading-relaxed text-gray-700">
                  O Método X promove educação e disciplina nas apostas. Nosso objetivo é ensinar 
                  estratégias e mentalidade, mas sempre com responsabilidade. Apostas envolvem risco 
                  de perda financeira e não devem ser tratadas como investimento ou fonte de renda garantida.
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

export default JogoResponsavel;

