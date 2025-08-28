import React from 'react';

interface QuestionProps {
  title: string;
  isOptional?: boolean;
}

export const Question: React.FC<React.PropsWithChildren<QuestionProps>> = ({ title, isOptional, children }) => (
  <div className="mb-6">
    <label className="block text-lg font-semibold text-gray-800 mb-3 font-poppins">
      {title}
      {isOptional && <span className="text-sm font-normal text-gray-500 ml-2">(opcional)</span>}
    </label>
    {children}
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
}

export const Input: React.FC<InputProps> = ({ id, ...props }) => (
  <input
    id={id}
    {...props}
    className="w-full bg-white/70 border border-purple-200 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition duration-200 form-input"
  />
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
}

export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({ id, children, ...props }) => (
  <select
    id={id}
    {...props}
    className="w-full bg-white/70 border border-purple-200 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition duration-200 appearance-none form-select"
    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
  >
    {children}
  </select>
);

interface CheckboxProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ name, value, checked, onChange, children }) => (
  <label className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-transparent hover:bg-purple-50 hover:border-purple-200 transition-all cursor-pointer">
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 rounded border-gray-300 text-[#8C52FF] focus:ring-[#6635F8] form-checkbox"
    />
    <span className="text-gray-700">{children}</span>
  </label>
);

interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({ name, value, checked, onChange, children }) => (
  <label className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-transparent hover:bg-purple-50 hover:border-purple-200 transition-all cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 border-gray-300 text-[#8C52FF] focus:ring-[#6635F8] form-radio"
    />
    <span className="text-gray-700">{children}</span>
  </label>
);