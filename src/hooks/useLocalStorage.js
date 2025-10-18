import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed) && parsed.every(task =>
          typeof task === 'object' &&
          task !== null &&
          'id' in task &&
          'title' in task &&
          'completed' in task
        )) {
          return parsed;
        }
      }
      return initialValue;
    } catch (error) {
      console.error("LocalStorage o'qishda xato:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("LocalStorage yozishda xato:", error);
    }
  };

  return [storedValue, setValue];
};
