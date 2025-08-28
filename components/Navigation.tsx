import React from 'react';

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  currentStep,
  totalSteps,
  isStepValid,
  onBack,
  onNext,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="mt-10 flex justify-between items-center border-t border-purple-200 pt-6">
      <div>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-full text-base font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Voltar
          </button>
        )}
      </div>
      <div>
        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!isStepValid}
            className="px-8 py-3 rounded-full text-base font-semibold text-white bg-[#8C52FF] hover:bg-[#6635F8] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-0.5"
          >
            Próximo
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isStepValid || isLoading}
            className="px-8 py-3 rounded-full text-base font-semibold text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 flex items-center"
          >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
                </>
            ) : (
                'Enviar'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
