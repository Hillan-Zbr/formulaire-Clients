import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormData } from '../../types';

interface PersonalInfoProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export const PersonalInfo = ({ data, onUpdate, onNext }: PersonalInfoProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  // Validation simple
  const validate = (fieldName: keyof FormData, value: string) => {
    let error = '';
    
    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) error = 'Ce champ est requis';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format d\'email invalide';
        }
        break;
      case 'birthDate':
        if (!value) error = 'La date de naissance est requise';
        break;
    }
    
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
    
    if (touched[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: validate(name as keyof FormData, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validate(name as keyof FormData, value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation complète avant de passer à l'étape suivante
    const newErrors = {
      firstName: validate('firstName', data.firstName),
      lastName: validate('lastName', data.lastName),
      email: validate('email', data.email),
      birthDate: validate('birthDate', data.birthDate),
    };

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      birthDate: true,
    });

    // Si pas d'erreurs, on continue
    if (!Object.values(newErrors).some(err => err)) {
      onNext();
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Informations Personnelles</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName}
            placeholder="Dupont"
          />
          <Input
            label="Prénom"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName}
            placeholder="Jean"
          />
        </div>
        
        <Input
          label="Email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="jean.dupont@exemple.com"
        />
        
        <Input
          label="Date de naissance"
          type="date"
          name="birthDate"
          value={data.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.birthDate}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit">
            Suivant
          </Button>
        </div>
      </form>
    </Card>
  );
};

