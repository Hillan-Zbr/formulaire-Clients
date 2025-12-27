import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Stepper } from './components/form/Stepper';
import { PersonalInfo } from './components/form/PersonalInfo';
import { DocumentUpload } from './components/form/DocumentUpload';
import { Summary } from './components/form/Summary';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserFormData } from './types';
import { Button } from './components/ui/Button';
import { Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_DATA: UserFormData = {
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
  const [formData, setFormData] = useState<UserFormData>(INITIAL_DATA);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const updateData = (newData: Partial<UserFormData>) => {
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Formulaire Clients</h1>
          <p className="text-slate-500 mt-1">Soumettez votre dossier en quelques clics</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAdminMode(true)}
          className="text-slate-400 hover:text-brand-600 hover:bg-brand-50"
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </div>

      <Stepper currentStep={step} steps={STEPS} />

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PersonalInfo 
                data={formData} 
                onUpdate={updateData} 
                onNext={nextStep} 
              />
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DocumentUpload 
                data={formData} 
                onUpdate={updateData} 
                onNext={nextStep} 
                onBack={prevStep} 
              />
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Summary 
                data={formData} 
                onBack={prevStep} 
                onSubmit={handleReset} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default App;

