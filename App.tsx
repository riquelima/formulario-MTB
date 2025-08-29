import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { FormData } from './types';
import { initialFormData, TOTAL_STEPS } from './constants';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step5 from './components/steps/Step5';
import Step6 from './components/steps/Step6';
import Step7 from './components/steps/Step7';
import Toast from './components/Toast';

// Supabase client setup
const supabaseUrl = 'https://zpbndizcbcmdsjnfhgak.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYm5kaXpjYmNtZHNqbmZoZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTU3MzcsImV4cCI6MjA3MTM3MTczN30.5H9kYsvJRa1-VYITu_HVuO-kfYnrW3R3sPbio6sjbxw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ConfirmationProps {
  name: string;
}

const ConfirmationScreen: React.FC<ConfirmationProps> = ({ name }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#E4DFFF] to-[#D6E4FF] flex items-center justify-center p-4">
    <main className="w-full max-w-[720px] bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-200/50 p-6 sm:p-10 text-slate-800 border border-white/30 text-center fade-in">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight leading-tight font-poppins">
        Obrigado, <span className="text-[#8C52FF]">{name}!</span>
      </h1>
      <p className="mt-6 text-base text-slate-600 max-w-xl mx-auto">
        Suas respostas foram enviadas com sucesso. Com elas, poderemos oferecer uma experiência ainda mais exclusiva e personalizada.
      </p>
      <p className="mt-4 text-sm text-slate-500">
        Agradecemos a sua confiança. Em breve, continuaremos nossa conversa.
      </p>
    </main>
  </div>
);


const App: React.FC = () => {
  const [formData, setFormData] = useLocalStorage<FormData>('mtb_anamnese', initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isStarted && videoRef.current) {
      const videoElement = videoRef.current;
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented by the browser.
          console.warn("Video autoplay was prevented, showing fallback:", error);
          setIsVideoPlaying(false); // Trigger the static background fallback.
        });
      }
    }
  }, [isStarted]);

  const validateStep = useCallback((step: number, data: FormData): boolean => {
    switch (step) {
      case 1:
        const whatsappDigits = data.step1.whatsapp.replace(/\D/g, '');
        return data.step1.nomePreferido.trim() !== '' && whatsappDigits.length >= 10 && data.step1.objetivosPrincipais.length > 0;
      case 2:
        return data.step2.sentimentoRecente !== '' && data.step2.emocoesBloqueadoras.length > 0;
      case 3:
        return data.step3.relacoesProximas !== '' && data.step3.redeApoio !== '';
      case 4:
        return data.step4.segurancaSobreSi !== '' && data.step4.areasDesenvolvimento.length > 0 && data.step4.habitosAjudam.length > 0;
      case 5:
        return data.step5.padroesPrejudiciais.length > 0 && data.step5.reacaoDificuldades.length > 0;
      case 6:
        return data.step6.memoriaImpactante !== '' && data.step6.sentimentosNaoExpressos.length > 0;
      case 7:
        return data.step7.resultadoIdeal.length > 0 && data.step7.consentimento;
      default:
        return false;
    }
  }, []);

  useEffect(() => {
    setIsStepValid(validateStep(currentStep, formData));
  }, [currentStep, formData, validateStep]);
  
  const handleDataChange = <T extends keyof FormData>(step: T, data: Partial<FormData[T]>) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }));
  };

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (isStepValid) {
       handleStepChange(currentStep + 1);
    }
  };

  const prevStep = () => {
    handleStepChange(currentStep - 1);
  };
  
  const goToStep = (step: number) => {
    handleStepChange(step);
  };
  
  const handleSubmit = async () => {
    if (!isStepValid) return;
    setIsLoading(true);
    setToast(null);

    const dataToSubmit = {
        nome_preferido: formData.step1.nomePreferido,
        whatsapp: `55${formData.step1.whatsapp.replace(/\D/g, '')}`,
        idade: formData.step1.idade === '' ? null : formData.step1.idade,
        ocupacao: formData.step1.ocupacao,
        ocupacao_outro: formData.step1.ocupacaoOutro,
        objetivos_principais: formData.step1.objetivosPrincipais,
        objetivos_principais_outro: formData.step1.objetivosPrincipaisOutro,
        sentimento_recente: formData.step2.sentimentoRecente,
        emocoes_bloqueadoras: formData.step2.emocoesBloqueadoras,
        emocoes_bloqueadoras_outro: formData.step2.emocoesBloqueadorasOutro,
        relacoes_proximas: formData.step3.relacoesProximas,
        relacoes_proximas_outro: formData.step3.relacoesProximasOutro,
        rede_apoio: formData.step3.redeApoio,
        seguranca_sobre_si: formData.step4.segurancaSobreSi,
        areas_desenvolvimento: formData.step4.areasDesenvolvimento,
        areas_desenvolvimento_outro: formData.step4.areasDesenvolvimentoOutro,
        habitos_ajudam: formData.step4.habitosAjudam,
        habitos_ajudam_outro: formData.step4.habitosAjudamOutro,
        padroes_prejudiciais: formData.step5.padroesPrejudiciais,
        padroes_prejudiciais_outro: formData.step5.padroesPrejudiciaisOutro,
        reacao_dificuldades: formData.step5.reacaoDificuldades,
        reacao_dificuldades_outro: formData.step5.reacaoDificuldadesOutro,
        memoria_impactante: formData.step6.memoriaImpactante,
        sentimentos_nao_expressos: formData.step6.sentimentosNaoExpressos,
        sentimentos_nao_expressos_outro: formData.step6.sentimentosNaoExpressosOutro,
        resultado_ideal: formData.step7.resultadoIdeal,
        resultado_ideal_outro: formData.step7.resultadoIdealOutro,
        consentimento: formData.step7.consentimento,
    };

    try {
      // 1. Enviar para o Supabase (primário)
      const { error } = await supabase.from('anamnese').insert([dataToSubmit]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Falha no envio. Tente novamente.');
      }
      
      // 2. Enviar para o Webhook (secundário)
      try {
        await fetch('https://n8n.intelektus.tech/webhook/gatilhowhatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        });
      } catch (webhookError) {
        console.error('Webhook submission failed:', webhookError);
        // Não bloqueia a UI, apenas registra o erro
      }

      // 3. Atualizar UI para sucesso
      setIsSubmitted(true);
      localStorage.removeItem('mtb_anamnese');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 data={formData.step1} updateData={(d) => handleDataChange('step1', d)} />;
      case 2: return <Step2 data={formData.step2} updateData={(d) => handleDataChange('step2', d)} />;
      case 3: return <Step3 data={formData.step3} updateData={(d) => handleDataChange('step3', d)} />;
      case 4: return <Step4 data={formData.step4} updateData={(d) => handleDataChange('step4', d)} />;
      case 5: return <Step5 data={formData.step5} updateData={(d) => handleDataChange('step5', d)} />;
      case 6: return <Step6 data={formData.step6} updateData={(d) => handleDataChange('step6', d)} />;
      case 7: return <Step7 data={formData.step7} allData={formData} updateData={(d) => handleDataChange('step7', d)} goToStep={goToStep} />;
      default: return null;
    }
  };

  if (isSubmitted) {
    return <ConfirmationScreen name={formData.step1.nomePreferido} />;
  }

  if (!isStarted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-[#E4DFFF] to-[#D6E4FF]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="https://cdn.pixabay.com/video/2016/09/13/5208-183786555_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10"></div>
        <main className="relative z-20 w-full max-w-[720px] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-purple-200/30 p-8 sm:p-12 text-slate-800 border border-white/50 text-center fade-in">
           <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight leading-tight font-poppins">
            Você conversa com <span className="text-[#8C52FF]">todo mundo.</span>
            <br />
            Mas quando foi a última vez que conversou com <span className="text-[#6635F8]">você mesmo?</span>
          </h1>
          <p className="mt-6 text-base text-slate-600 max-w-xl mx-auto">
            Bem-vindo(a) à Anamnese do <strong>Meu Terapeuta de Bolso</strong>. Este é o primeiro passo para uma jornada de autoconhecimento e clareza. Suas respostas são confidenciais e essenciais para personalizar sua experiência.
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="mt-8 px-10 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-[#8C52FF] to-[#6635F8] hover:from-[#7a48e6] hover:to-[#5c2fdd] transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/60 transform hover:-translate-y-1"
          >
            Começar minha jornada
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4DFFF] to-[#D6E4FF] flex items-center justify-center p-4">
      <main className="w-full max-w-[720px] bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-200/50 p-6 sm:p-10 text-slate-800 border border-white/30">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <div className="mt-8 fade-in" key={currentStep}>
          {renderStep()}
        </div>
        <Navigation 
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          isStepValid={isStepValid}
          onBack={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </main>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
};

export default App;