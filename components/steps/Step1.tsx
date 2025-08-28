import React from 'react';
import type { FormData } from '../../types';
import { Question, Input, Select, Checkbox } from '../FormElements';

interface Props {
  data: FormData['step1'];
  updateData: (data: Partial<FormData['step1']>) => void;
}

const Step1: React.FC<Props> = ({ data, updateData }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newGoals = checked
      ? [...data.objetivosPrincipais, value]
      : data.objetivosPrincipais.filter((goal) => goal !== value);
    updateData({ objetivosPrincipais: newGoals });
  };
  
  const occupations = ["Estudante", "Autônomo(a)", "Empregado(a)", "Desempregado(a)", "Dono(a) de negócio", "Aposentado(a)", "Outros"];
  const goals = ["Melhorar relacionamento", "Autoestima/confiança", "Ansiedade/estresse", "Autoconhecimento", "Equilíbrio emocional", "Superar traumas/passado", "Outros"];

  return (
    <>
      <Question title="Como você prefere ser chamado(a)?">
        <Input 
          id="nomePreferido" 
          type="text" 
          placeholder="Nome/Apelido" 
          value={data.nomePreferido}
          onChange={(e) => updateData({ nomePreferido: e.target.value })}
        />
      </Question>

      <Question title="Qual sua idade e ocupação?" isOptional>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="idade"
            type="number"
            placeholder="Idade"
            min="10"
            max="120"
            value={data.idade || ''}
            onChange={(e) => updateData({ idade: e.target.value === '' ? '' : Number(e.target.value) })}
          />
          <Select id="ocupacao" value={data.ocupacao} onChange={(e) => updateData({ ocupacao: e.target.value })}>
            <option value="" disabled>Selecione sua ocupação</option>
            {occupations.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
        </div>
        {data.ocupacao === 'Outros' && (
          <Input
            id="ocupacaoOutro"
            type="text"
            placeholder="Qual?"
            className="mt-3"
            value={data.ocupacaoOutro}
            onChange={(e) => updateData({ ocupacaoOutro: e.target.value })}
          />
        )}
      </Question>

      <Question title="Seu principal objetivo ao buscar essa experiência terapêutica?">
        <div className="space-y-3">
          {goals.map(goal => (
            <Checkbox key={goal} name="objetivosPrincipais" value={goal} checked={data.objetivosPrincipais.includes(goal)} onChange={handleCheckboxChange}>
              {goal}
            </Checkbox>
          ))}
          {data.objetivosPrincipais.includes('Outros') && (
            <Input
              id="objetivosPrincipaisOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.objetivosPrincipaisOutro}
              onChange={(e) => updateData({ objetivosPrincipaisOutro: e.target.value })}
            />
          )}
        </div>
      </Question>
    </>
  );
};

export default Step1;
