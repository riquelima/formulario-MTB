import React from 'react';
import type { FormData } from '../../types';
import { Question, Radio, Checkbox, Input } from '../FormElements';

interface Props {
  data: FormData['step6'];
  updateData: (data: Partial<FormData['step6']>) => void;
}

const Step6: React.FC<Props> = ({ data, updateData }) => {
  const handleFeelingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newFeelings = checked
      ? [...data.sentimentosNaoExpressos, value]
      : data.sentimentosNaoExpressos.filter((f) => f !== value);
    updateData({ sentimentosNaoExpressos: newFeelings });
  };
  
  const memories = ["Sim, positiva", "Sim, negativa", "Sim, neutra", "Não lembro/não impacta"];
  const feelings = ["Tristeza", "Raiva", "Medo", "Vergonha", "Culpa", "Amor/afeto", "Outros", "Nenhum"];

  return (
    <>
      <Question title="Alguma lembrança que ainda te impacta?">
        <div className="space-y-3">
          {memories.map(m => (
            <Radio key={m} name="memoriaImpactante" value={m} checked={data.memoriaImpactante === m} onChange={(e) => updateData({ memoriaImpactante: e.target.value })}>
              {m}
            </Radio>
          ))}
        </div>
      </Question>

      <Question title="Sentimentos que não conseguiu expressar?">
        <div className="space-y-3">
          {feelings.map(f => (
            <Checkbox key={f} name="sentimentosNaoExpressos" value={f} checked={data.sentimentosNaoExpressos.includes(f)} onChange={handleFeelingsChange}>
              {f}
            </Checkbox>
          ))}
          {data.sentimentosNaoExpressos.includes('Outros') && (
            <Input
              id="sentimentosNaoExpressosOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.sentimentosNaoExpressosOutro}
              onChange={(e) => updateData({ sentimentosNaoExpressosOutro: e.target.value })}
            />
          )}
        </div>
      </Question>
    </>
  );
};

export default Step6;
