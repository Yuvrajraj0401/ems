
export enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  category?: string; // For Vendors (Catering, Florist, etc.)
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Membership {
  membershipNumber: string;
  userId: string;
  type: '6 months' | '1 year' | '2 years';
  startDate: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Received' | 'Ready for Shipping' | 'Out For Delivery' | 'Cancelled';
  address: string;
  city: string;
  paymentMethod: 'Cash' | 'UPI';
}
