import React from 'react';
import type { FormData } from '../../types';
import { Question, Checkbox, Input } from '../FormElements';

interface Props {
  data: FormData['step5'];
  updateData: (data: Partial<FormData['step5']>) => void;
}

const Step5: React.FC<Props> = ({ data, updateData }) => {
  const handlePatternsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newPatterns = checked
      ? [...data.padroesPrejudiciais, value]
      : data.padroesPrejudiciais.filter((p) => p !== value);
    updateData({ padroesPrejudiciais: newPatterns });
  };
  
  const handleReactionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newReactions = checked
      ? [...data.reacaoDificuldades, value]
      : data.reacaoDificuldades.filter((r) => r !== value);
    updateData({ reacaoDificuldades: newReactions });
  };

  const patterns = ["Procrastinação", "Autossabotagem", "Evito conflitos", "Comparação constante", "Outros", "Não percebo"];
  const reactions = ["Fico ansioso(a)/estressado(a)", "Evito/adiar decisões", "Procuro ajuda", "Busco solução imediatamente", "Outros"];

  return (
    <>
      <Question title="Padrões repetitivos que te prejudicam?">
        <div className="space-y-3">
          {patterns.map(p => (
            <Checkbox key={p} name="padroesPrejudiciais" value={p} checked={data.padroesPrejudiciais.includes(p)} onChange={handlePatternsChange}>
              {p}
            </Checkbox>
          ))}
          {data.padroesPrejudiciais.includes('Outros') && (
            <Input
              id="padroesPrejudiciaisOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.padroesPrejudiciaisOutro}
              onChange={(e) => updateData({ padroesPrejudiciaisOutro: e.target.value })}
            />
          )}
        </div>
      </Question>

      <Question title="Como reage às dificuldades?">
        <div className="space-y-3">
          {reactions.map(r => (
            <Checkbox key={r} name="reacaoDificuldades" value={r} checked={data.reacaoDificuldades.includes(r)} onChange={handleReactionsChange}>
              {r}
            </Checkbox>
          ))}
          {data.reacaoDificuldades.includes('Outros') && (
            <Input
              id="reacaoDificuldadesOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.reacaoDificuldadesOutro}
              onChange={(e) => updateData({ reacaoDificuldadesOutro: e.target.value })}
            />
          )}
        </div>
      </Question>
    </>
  );
};

export default Step5;
