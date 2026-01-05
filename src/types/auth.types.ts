export interface User {
  id: string;
  nom: string;
  prenoms: string;
  photo?: string;
  numero: string;
  age: number;
  situationProfessionnelle: string;
  domainesCompetence: string[];
  email?: string;
}

export interface LoginCredentials {
  email?: string;
  password?: string;
  phone?: string;
  otp?: string;
}

export interface SignUpData {
  nom: string;
  prenoms: string;
  photo?: string;
  numero: string;
  age: number;
  situationProfessionnelle: string;
  domainesCompetence: string[];
  email?: string;
  password?: string;
}

export type AuthProvider = 'email' | 'phone' | 'google' | 'linkedin';
