import React from 'react';
import type { FormData } from '../../types';
import { Question, Radio, Input } from '../FormElements';

interface Props {
  data: FormData['step3'];
  updateData: (data: Partial<FormData['step3']>) => void;
}

const Step3: React.FC<Props> = ({ data, updateData }) => {
  const relations = ["Boa", "Regular", "Ruim", "Evito contato", "Outros"];
  const support = ["Sim, sempre", "Sim, às vezes", "Raramente", "Não tenho com quem conversar"];

  return (
    <>
      <Question title="Como descreveria sua relação com pessoas próximas?">
        <div className="space-y-3">
          {relations.map(r => (
            <Radio key={r} name="relacoesProximas" value={r} checked={data.relacoesProximas === r} onChange={(e) => updateData({ relacoesProximas: e.target.value })}>
              {r}
            </Radio>
          ))}
          {data.relacoesProximas === 'Outros' && (
            <Input
              id="relacoesProximasOutro"
              type="text"
              placeholder="Qual?"
              className="mt-2 ml-8"
              value={data.relacoesProximasOutro}
              onChange={(e) => updateData({ relacoesProximasOutro: e.target.value })}
            />
          )}
        </div>
      </Question>

      <Question title="Costuma ter alguém para conversar em dificuldades?">
        <div className="space-y-3">
          {support.map(s => (
            <Radio key={s} name="redeApoio" value={s} checked={data.redeApoio === s} onChange={(e) => updateData({ redeApoio: e.target.value })}>
              {s}
            </Radio>
          ))}
        </div>
      </Question>
    </>
  );
};

export default Step3;
