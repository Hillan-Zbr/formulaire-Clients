import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Stepper } from './components/form/Stepper';
import { PersonalInfo } from './components/form/PersonalInfo';
import { DocumentUpload } from './components/form/DocumentUpload';
import { Summary } from './components/form/Summary';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FormData } from './types';
import { Button } from './components/ui/Button';
import { Shield } from 'lucide-react';

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  idCard: null,
  proofOfAddress: null,
};

const STEPS = ['Informations', 'Documents', 'Validation'];

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const updateData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setStep(1);
  };

  if (isAdminMode) {
    return (
      <Layout>
        <AdminDashboard onBack={() => setIsAdminMode(false)} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formulaire Clients</h1>
          <p className="text-gray-500 mt-1">Soumettez votre dossier en quelques clics</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAdminMode(true)}
          className="text-gray-400 hover:text-gray-600"
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </div>

      <Stepper currentStep={step} steps={STEPS} />

      <div className="mt-8">
        {step === 1 && (
          <PersonalInfo 
            data={formData} 
            onUpdate={updateData} 
            onNext={nextStep} 
          />
        )}
        
        {step === 2 && (
          <DocumentUpload 
            data={formData} 
            onUpdate={updateData} 
            onNext={nextStep} 
            onBack={prevStep} 
          />
        )}
        
        {step === 3 && (
          <Summary 
            data={formData} 
            onBack={prevStep} 
            onSubmit={handleReset} 
          />
        )}
      </div>
    </Layout>
  );
}

export default App;

