import { useState, useEffect } from 'react';

export const useLocalStorage = <T extends object>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      
      const storedData = JSON.parse(item);
      
      // Merge initial data with stored data to ensure all keys are present.
      // This is crucial for backward compatibility when the data structure changes.
      const mergedData = { ...initialValue };
      for (const stepKey in mergedData) {
        if (storedData[stepKey]) {
          mergedData[stepKey as keyof T] = {
            ...(mergedData[stepKey as keyof T] as object),
            ...(storedData[stepKey] as object),
          } as T[keyof T];
        }
      }
      return mergedData;

    } catch (error) {
      console.error("Error reading from localStorage, falling back to initial state:", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};
