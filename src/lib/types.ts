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
  address: string;
  occupation: string;
  emergencyContact: string;
  ktpPhoto: File | null;
  selfiePhoto: File | null;
  agreedToAkad: boolean;
}
