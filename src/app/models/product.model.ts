export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  onSale?: boolean;
  discountPercentage?: number;
}