import React from 'react';
import type { FormData } from '../../types';
import { Question, Radio, Checkbox, Input } from '../FormElements';

interface Props {
  data: FormData['step2'];
  updateData: (data: Partial<FormData['step2']>) => void;
}

const Step2: React.FC<Props> = ({ data, updateData }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newEmotions = checked
      ? [...data.emocoesBloqueadoras, value]
      : data.emocoesBloqueadoras.filter((emotion) => emotion !== value);
    updateData({ emocoesBloqueadoras: newEmotions });
  };
  
  const feelings = ["Muito bem", "Bem", "Regular", "Mal", "Muito mal"];
  const emotions = ["Medo", "Ansiedade", "Tristeza", "Raiva", "Culpa", "Vergonha", "Outros"];

  return (
    <>
      <Question title="Como você tem se sentido ultimamente?">
        <div className="space-y-3">
          {feelings.map(f => (
            <Radio key={f} name="sentimentoRecente" value={f} checked={data.sentimentoRecente === f} onChange={(e) => updateData({ sentimentoRecente: e.target.value })}>
              {f}
            </Radio>
          ))}
        </div>
      </Question>
      <Question title="Quais emoções mais te bloqueiam/incomodam?">
        <div className="space-y-3">
          {emotions.map(e => (
            <Checkbox key={e} name="emocoesBloqueadoras" value={e} checked={data.emocoesBloqueadoras.includes(e)} onChange={handleCheckboxChange}>
              {e}
            </Checkbox>
          ))}
          {data.emocoesBloqueadoras.includes('Outros') && (
            <Input
              id="emocoesBloqueadorasOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.emocoesBloqueadorasOutro}
              onChange={(e) => updateData({ emocoesBloqueadorasOutro: e.target.value })}
            />
          )}
        </div>
      </Question>
    </>
  );
};

export default Step2;
