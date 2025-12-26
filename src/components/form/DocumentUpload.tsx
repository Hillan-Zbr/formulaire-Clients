import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FormData, FileStatus } from '../../types';
import { cn } from '../../lib/utils';

interface DocumentUploadProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const DocumentUpload = ({ data, onUpdate, onNext, onBack }: DocumentUploadProps) => {
  // États locaux pour gérer le statut de chaque fichier indépendamment
  const [idCardStatus, setIdCardStatus] = useState<FileStatus>(data.idCard ? 'success' : 'idle');
  const [addressStatus, setAddressStatus] = useState<FileStatus>(data.proofOfAddress ? 'success' : 'idle');
  
  // Simulation de l'IA / OCR
  const simulateAnalysis = (file: File, type: 'idCard' | 'proofOfAddress') => {
    const setStatus = type === 'idCard' ? setIdCardStatus : setAddressStatus;
    
    setStatus('analyzing');
    
    setTimeout(() => {
      // Simulation simple : succès aléatoire (mais ici on force le succès si le type est bon pour la démo)
      if (ACCEPTED_TYPES.includes(file.type)) {
        setStatus('success');
        onUpdate({ [type]: file });
      } else {
        setStatus('error');
      }
    }, 2000);
  };

  const handleFile = (file: File, type: 'idCard' | 'proofOfAddress') => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert("Format non supporté. Utilisez PDF, JPG ou PNG.");
      return;
    }
    simulateAnalysis(file, type);
  };

  const DropZone = ({ 
    type, 
    label, 
    required, 
    file, 
    status 
  }: { 
    type: 'idCard' | 'proofOfAddress', 
    label: string, 
    required?: boolean, 
    file: File | null,
    status: FileStatus
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0], type);
      }
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0], type);
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onUpdate({ [type]: null });
      if (type === 'idCard') setIdCardStatus('idle');
      else setAddressStatus('idle');
    };

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <div
          onClick={status !== 'analyzing' ? handleClick : undefined}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[160px]",
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50",
            status === 'error' && "border-red-500 bg-red-50",
            status === 'success' && "border-green-500 bg-green-50"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            disabled={status === 'analyzing'}
          />

          {status === 'analyzing' ? (
            <div className="text-center animate-pulse">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-blue-600 font-medium">Analyse du document en cours...</p>
              <p className="text-xs text-blue-400 mt-1">Simulation IA</p>
            </div>
          ) : status === 'success' && file ? (
            <div className="text-center w-full">
              <div className="absolute top-2 right-2">
                <button 
                  onClick={handleRemove}
                  className="p-1 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="text-green-700 font-medium truncate px-4">{file.name}</p>
              <p className="text-green-600 text-sm mt-1">Document validé</p>
            </div>
          ) : status === 'error' ? (
             <div className="text-center">
              <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <p className="text-red-600 font-medium">Erreur d'analyse</p>
              <p className="text-sm text-red-500 mt-1">Format incorrect ou illisible. Réessayez.</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Glissez votre fichier ici</p>
              <p className="text-sm text-gray-500 mt-1">ou cliquez pour sélectionner</p>
              <p className="text-xs text-gray-400 mt-2">PDF, JPG, PNG (Max 5Mo)</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const isValid = data.idCard !== null && idCardStatus === 'success';

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Documents Justificatifs</h2>
      <p className="text-gray-500 mb-6 text-sm">Veuillez télécharger les documents requis pour valider votre dossier.</p>

      <DropZone 
        type="idCard" 
        label="Carte d'identité (Recto/Verso)" 
        required 
        file={data.idCard} 
        status={idCardStatus}
      />
      
      <DropZone 
        type="proofOfAddress" 
        label="Justificatif de domicile (Optionnel)" 
        file={data.proofOfAddress} 
        status={addressStatus}
      />

      <div className="flex justify-between pt-4 border-t border-gray-100">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Suivant
        </Button>
      </div>
    </Card>
  );
};

