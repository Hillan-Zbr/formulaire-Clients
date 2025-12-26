import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FormData, Submission } from '../../types';
import { FileText, User, Calendar, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { API_URL } from '../../config';

interface SummaryProps {
  data: FormData;
  onBack: () => void;
  onSubmit: () => void;
}

export const Summary = ({ data, onBack, onSubmit }: SummaryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Appel API vers le Backend
    try {
      const submission: Submission = {
        ...data,
        id: crypto.randomUUID(), // Sera remplacé/ignoré par Mongo, mais utile pour l'instant
        submittedAt: new Date().toISOString(),
        idCardName: data.idCard?.name || '',
        proofOfAddressName: data.proofOfAddress?.name || '',
      };

      // On prépare les données pour l'API (on enlève les objets File)
      const apiData = { ...submission, idCard: null, proofOfAddress: null };

      const response = await fetch(`${API_URL}/api/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onSubmit();
      }, 2000);
      
    } catch (error) {
      console.error("Erreur API:", error);
      alert("Une erreur est survenue lors de l'envoi du dossier.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dossier soumis avec succès !</h2>
        <p className="text-gray-600">Votre demande a bien été enregistrée. Vous recevrez un email de confirmation sous peu.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Récapitulatif de votre dossier</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="flex items-center text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            <User className="w-4 h-4 mr-2" />
            Informations Personnelles
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm text-gray-500">Nom complet</dt>
              <dd className="text-sm font-medium text-gray-900">{data.firstName} {data.lastName}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="flex items-center text-sm font-medium text-gray-900">
                <Mail className="w-3 h-3 mr-1 text-gray-400" />
                {data.email}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Date de naissance</dt>
              <dd className="flex items-center text-sm font-medium text-gray-900">
                <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                {new Date(data.birthDate).toLocaleDateString('fr-FR')}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="flex items-center text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Carte d'identité</span>
              <span className="font-medium text-gray-900 flex items-center">
                {data.idCard?.name}
                <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
              </span>
            </li>
            <li className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Justificatif de domicile</span>
              <span className={cn("font-medium flex items-center", data.proofOfAddress ? "text-gray-900" : "text-gray-400 italic")}>
                {data.proofOfAddress ? (
                  <>
                    {data.proofOfAddress.name}
                    <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                  </>
                ) : (
                  "Non fourni"
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100 mt-6">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Modifier
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[140px]">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Envoi...
            </>
          ) : (
            "Confirmer l'envoi"
          )}
        </Button>
      </div>
    </Card>
  );
};

