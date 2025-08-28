import type { FormData } from './types';

export const TOTAL_STEPS = 7;

export const initialFormData: FormData = {
  step1: {
    nomePreferido: '',
    whatsapp: '',
    idade: '',
    ocupacao: '',
    ocupacaoOutro: '',
    objetivosPrincipais: [],
    objetivosPrincipaisOutro: '',
  },
  step2: {
    sentimentoRecente: '',
    emocoesBloqueadoras: [],
    emocoesBloqueadorasOutro: '',
  },
  step3: {
    relacoesProximas: '',
    relacoesProximasOutro: '',
    redeApoio: '',
  },
  step4: {
    segurancaSobreSi: '',
    areasDesenvolvimento: [],
    areasDesenvolvimentoOutro: '',
    habitosAjudam: [],
    habitosAjudamOutro: '',
  },
  step5: {
    padroesPrejudiciais: [],
    padroesPrejudiciaisOutro: '',
    reacaoDificuldades: [],
    reacaoDificuldadesOutro: '',
  },
  step6: {
    memoriaImpactante: '',
    sentimentosNaoExpressos: [],
    sentimentosNaoExpressosOutro: '',
  },
  step7: {
    resultadoIdeal: [],
    resultadoIdealOutro: '',
    consentimento: false,
  },
};