import React from 'react';
import type { FormData } from '../../types';
import { Question, Checkbox, Input } from '../FormElements';

interface Props {
  data: FormData['step7'];
  allData: FormData;
  updateData: (data: Partial<FormData['step7']>) => void;
  goToStep: (step: number) => void;
}

const LABELS_MAP: { [key: string]: string } = {
  nomePreferido: "Nome Preferido",
  whatsapp: "WhatsApp",
  idade: "Idade",
  ocupacao: "Ocupação",
  ocupacaoOutro: "Outra Ocupação",
  objetivosPrincipais: "Objetivos Principais",
  objetivosPrincipaisOutro: "Outros Objetivos",
  sentimentoRecente: "Sentimento Recente",
  emocoesBloqueadoras: "Emoções Bloqueadoras",
  emocoesBloqueadorasOutro: "Outras Emoções",
  relacoesProximas: "Relações Próximas",
  relacoesProximasOutro: "Outras Relações",
  redeApoio: "Rede de Apoio",
  segurancaSobreSi: "Segurança Sobre Si",
  areasDesenvolvimento: "Áreas a Desenvolver",
  areasDesenvolvimentoOutro: "Outras Áreas",
  habitosAjudam: "Hábitos que Ajudam",
  habitosAjudamOutro: "Outros Hábitos",
  padroesPrejudiciais: "Padrões Prejudiciais",
  padroesPrejudiciaisOutro: "Outros Padrões",
  reacaoDificuldades: "Reação às Dificuldades",
  reacaoDificuldadesOutro: "Outras Reações",
  memoriaImpactante: "Memória Impactante",
  sentimentosNaoExpressos: "Sentimentos Não Expressos",
  sentimentosNaoExpressosOutro: "Outros Sentimentos",
  resultadoIdeal: "Resultado Ideal",
  resultadoIdealOutro: "Outro Resultado",
  consentimento: "Consentimento",
};

const ReviewPanel: React.FC<{ allData: FormData; goToStep: (step: number) => void }> = ({ allData, goToStep }) => {
  const sections = [
    { title: "Identificação e Contexto", step: 1, data: allData.step1 },
    { title: "Estado Emocional e Mental", step: 2, data: allData.step2 },
    { title: "Relações", step: 3, data: allData.step3 },
    { title: "Autoconhecimento e Autoimagem", step: 4, data: allData.step4 },
    { title: "Padrões e Bloqueios", step: 5, data: allData.step5 },
    { title: "Infância e Adolescência", step: 6, data: allData.step6 },
  ];
  
  const renderValue = (value: any) => {
    if (value === null || value === undefined || value === '') return 'Não informado';
    if (Array.isArray(value)) {
        return value.length > 0 ? value.join(', ') : 'Não informado';
    }
    if(typeof value === 'boolean') {
        return value ? 'Sim' : 'Não';
    }
    return String(value);
  }

  return (
    <div className="mt-8 p-4 sm:p-6 bg-violet-50/70 rounded-2xl space-y-4 border border-violet-200/50">
      <h3 className="text-xl font-bold text-center text-[#6635F8] font-poppins">Revise suas respostas</h3>
      {sections.map(section => (
        <div key={section.step} className="p-4 bg-white rounded-xl shadow-sm border border-violet-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-base text-[#6635F8]">{section.title}</h4>
            <button onClick={() => goToStep(section.step)} className="text-sm font-semibold text-[#8C52FF] hover:underline focus:outline-none focus:ring-2 focus:ring-[#8C52FF] rounded">
              Editar
            </button>
          </div>
           <dl className="text-sm space-y-2">
             {Object.entries(section.data).filter(([key]) => !key.toLowerCase().endsWith('outro') || (key.toLowerCase().endsWith('outro') && section.data[key as keyof typeof section.data])).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-x-4 py-2 border-b border-violet-100 last:border-b-0">
                    <dt className="font-medium text-slate-500">{LABELS_MAP[key] || key}</dt>
                    <dd className="col-span-2 text-slate-800 font-medium">{renderValue(value)}</dd>
                </div>
             ))}
           </dl>
        </div>
      ))}
    </div>
  );
};


const Step7: React.FC<Props> = ({ data, allData, updateData, goToStep }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newOutcomes = checked
      ? [...data.resultadoIdeal, value]
      : data.resultadoIdeal.filter((o) => o !== value);
    updateData({ resultadoIdeal: newOutcomes });
  };
  
  const outcomes = ["Leveza", "Confiança em si", "Clareza nas decisões", "Melhorar relacionamentos", "Serenidade/controle emocional", "Alegria/felicidade", "Outros"];

  return (
    <>
      <Question title="Resultado ideal e sentimento que deseja cultivar?">
        <div className="space-y-3">
          {outcomes.map(o => (
            <Checkbox key={o} name="resultadoIdeal" value={o} checked={data.resultadoIdeal.includes(o)} onChange={handleCheckboxChange}>
              {o}
            </Checkbox>
          ))}
          {data.resultadoIdeal.includes('Outros') && (
            <Input
              id="resultadoIdealOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.resultadoIdealOutro}
              onChange={(e) => updateData({ resultadoIdealOutro: e.target.value })}
            />
          )}
        </div>
      </Question>

      <ReviewPanel allData={allData} goToStep={goToStep} />

      <div className="mt-8 border-t border-purple-200 pt-6">
        <label className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-purple-200/80 cursor-pointer hover:bg-purple-50 transition-colors">
          <input
            type="checkbox"
            checked={data.consentimento}
            onChange={(e) => updateData({ consentimento: e.target.checked })}
            className="h-5 w-5 mt-0.5 rounded border-gray-300 text-[#8C52FF] focus:ring-[#6635F8] form-checkbox flex-shrink-0"
          />
          <span className="text-gray-700 text-base">
            Autorizo o uso dos dados para minha experiência terapêutica no WhatsApp.
          </span>
        </label>
      </div>
    </>
  );
};

export default Step7;