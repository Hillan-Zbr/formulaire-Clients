export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  idCard: File | null;
  proofOfAddress: File | null;
}

export interface Submission extends FormData {
  id: string;
  submittedAt: string;
  // Pour le stockage, nous ne stockerons que les noms de fichiers car localStorage ne gère pas les objets File
  idCardName: string;
  proofOfAddressName: string;
}

export type FileStatus = 'idle' | 'analyzing' | 'success' | 'error';

export interface FileState {
  file: File | null;
  status: FileStatus;
  message?: string;
}

