import { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Submission } from '../../types';
import { Trash2, FileText, ArrowLeft } from 'lucide-react';
import { API_URL } from '../../config';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/submissions`);
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        }
      } catch (e) {
        console.error("Erreur connexion API", e);
      }
    };
    loadData();
  }, []);

  const clearData = async () => {
    if (confirm("Voulez-vous vraiment supprimer toutes les données de la base ?")) {
      try {
        await fetch(`${API_URL}/api/submissions`, { method: 'DELETE' });
        setSubmissions([]);
      } catch (e) {
        console.error("Erreur suppression", e);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au formulaire
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Administration</h1>
          <Button variant="outline" size="sm" onClick={clearData} className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
            <Trash2 className="w-4 h-4 mr-2" /> Vider la base
          </Button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <Card className="p-12 text-center text-gray-500">
          <p>Aucune soumission pour le moment.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {submissions.map((sub) => (
            <Card key={sub.id} className="p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{sub.firstName} {sub.lastName}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{sub.email}</p>
                <p className="text-xs text-gray-400">Né(e) le {new Date(sub.birthDate).toLocaleDateString()}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <FileText className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="truncate max-w-[150px]" title={sub.idCardName}>{sub.idCardName}</span>
                </div>
                {sub.proofOfAddressName && (
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    <FileText className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="truncate max-w-[150px]" title={sub.proofOfAddressName}>{sub.proofOfAddressName}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

