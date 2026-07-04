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
