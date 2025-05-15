// src/hooks/useForm.js
import { useState } from 'react';

export function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  return { formData, handleChange, setFormData };
}
