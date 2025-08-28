export interface FormData {
  step1: {
    nomePreferido: string;
    idade?: number | '';
    ocupacao: string;
    ocupacaoOutro: string;
    objetivosPrincipais: string[];
    objetivosPrincipaisOutro: string;
  };
  step2: {
    sentimentoRecente: string;
    emocoesBloqueadoras: string[];
    emocoesBloqueadorasOutro: string;
  };
  step3: {
    relacoesProximas: string;
    relacoesProximasOutro: string;
    redeApoio: string;
  };
  step4: {
    segurancaSobreSi: string;
    areasDesenvolvimento: string[];
    areasDesenvolvimentoOutro: string;
    habitosAjudam: string[];
    habitosAjudamOutro: string;
  };
  step5: {
    padroesPrejudiciais: string[];
    padroesPrejudiciaisOutro: string;
    reacaoDificuldades: string[];
    reacaoDificuldadesOutro: string;
  };
  step6: {
    memoriaImpactante: string;
    sentimentosNaoExpressos: string[];
    sentimentosNaoExpressosOutro: string;
  };
  step7: {
    resultadoIdeal: string[];
    resultadoIdealOutro: string;
    consentimento: boolean;
  };
}
