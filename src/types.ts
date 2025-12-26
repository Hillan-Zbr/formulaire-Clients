export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  idCard: File | null;
  proofOfAddress: File | null;
}

export interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  submittedAt: string;
  // Noms pour l'affichage
  idCardName: string;
  proofOfAddressName: string;
  // URLs Cloudinary (Optionnel car anciennes soumissions n'en ont pas)
  idCardUrl?: string;
  proofOfAddressUrl?: string;
}

export type FileStatus = 'idle' | 'analyzing' | 'success' | 'error';

export interface FileState {
  file: File | null;
  status: FileStatus;
  message?: string;
}
