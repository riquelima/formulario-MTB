import React from 'react';
import type { FormData } from '../../types';
import { Question, Radio, Checkbox, Input } from '../FormElements';

interface Props {
  data: FormData['step4'];
  updateData: (data: Partial<FormData['step4']>) => void;
}

const Step4: React.FC<Props> = ({ data, updateData }) => {
  const handleDevCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newAreas = checked
      ? [...data.areasDesenvolvimento, value]
      : data.areasDesenvolvimento.filter((area) => area !== value);
    updateData({ areasDesenvolvimento: newAreas });
  };
  
  const handleHabitsCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newHabits = checked
      ? [...data.habitosAjudam, value]
      : data.habitosAjudam.filter((habit) => habit !== value);
    updateData({ habitosAjudam: newHabits });
  };

  const securities = ["Sim, totalmente", "Sim, em parte", "Não muito", "Não"];
  const devAreas = ["Confiança", "Autoestima", "Assertividade", "Paciência", "Outros", "Nada no momento"];
  const habits = ["Meditação", "Oração/espiritualidade", "Atividade física", "Ouvir música", "Escrita/diário", "Outros", "Não tenho"];

  return (
    <>
      <Question title="Você se sente seguro(a) em relação a quem é?">
        <div className="space-y-3">
          {securities.map(s => (
            <Radio key={s} name="segurancaSobreSi" value={s} checked={data.segurancaSobreSi === s} onChange={(e) => updateData({ segurancaSobreSi: e.target.value })}>
              {s}
            </Radio>
          ))}
        </div>
      </Question>

      <Question title="O que gostaria de mudar/desenvolver?">
        <div className="space-y-3">
          {devAreas.map(a => (
            <Checkbox key={a} name="areasDesenvolvimento" value={a} checked={data.areasDesenvolvimento.includes(a)} onChange={handleDevCheckboxChange}>
              {a}
            </Checkbox>
          ))}
          {data.areasDesenvolvimento.includes('Outros') && (
            <Input
              id="areasDesenvolvimentoOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.areasDesenvolvimentoOutro}
              onChange={(e) => updateData({ areasDesenvolvimentoOutro: e.target.value })}
            />
          )}
        </div>
      </Question>
      
      <Question title="Hábitos/práticas que te ajudam?">
        <div className="space-y-3">
          {habits.map(h => (
            <Checkbox key={h} name="habitosAjudam" value={h} checked={data.habitosAjudam.includes(h)} onChange={handleHabitsCheckboxChange}>
              {h}
            </Checkbox>
          ))}
          {data.habitosAjudam.includes('Outros') && (
            <Input
              id="habitosAjudamOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.habitosAjudamOutro}
              onChange={(e) => updateData({ habitosAjudamOutro: e.target.value })}
            />
          )}
        </div>
      </Question>
    </>
  );
};

export default Step4;
