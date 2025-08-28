import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-[#6635F8] tracking-tight font-poppins">Anamnese Terapêutica</h1>
        <span className="text-sm font-semibold text-purple-700 bg-purple-200 py-1 px-3 rounded-full">
          Etapa {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="w-full bg-purple-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-[#8C52FF] to-[#6635F8] h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;