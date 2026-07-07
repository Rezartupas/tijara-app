export interface Product {
  title: string;
  price: number;
  image: string;
  description: string;
  url: string;
  marketplace: string;
}

export interface SimulationResult {
  product: Product;
  tenorMonths: number;
  totalMargin: number;
  monthlyInstallment: number;
  totalPayment: number;
}

export interface KYCData {
  fullName: string;
  nik: string;
  phoneNumber: string;
  address: string;
  occupation: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  ktpPhoto: File | null;
  selfiePhoto: File | null;
  agreedToAkad: boolean;
}

/** Submission record stored as JSON on the server and used across admin pages. */
export interface Submission {
  id: string;
  fullName: string;
  nik: string;
  phoneNumber?: string;
  address?: string;
  occupation?: string;
  emergencyName?: string;
  emergencyRelationship?: string;
  emergencyPhone?: string;
  submittedAt: string;
  status?: string;
  statusUpdatedBy?: string;
  statusUpdatedAt?: string;
  adminNote?: string;
  tenor?: number;
  angsuran?: number;
  total?: number;
  agreedToAkad?: boolean;
  product?: { title?: string; price?: number; marketplace?: string };
}

/** Extended submission detail with required fields for the detail page. */
export interface SubmissionDetail {
  id: string;
  fullName: string;
  nik: string;
  phoneNumber: string;
  address: string;
  occupation: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  submittedAt: string;
  agreedToAkad: boolean;
  product?: Record<string, unknown>;
  tenor?: number;
  angsuran?: number;
  total?: number;
  status?: string;
  adminNote?: string;
  statusUpdatedBy?: string;
  statusUpdatedAt?: string;
}
