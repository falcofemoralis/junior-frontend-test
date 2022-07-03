import { Product } from './product.type';

export interface SelectedAttribute {
  attributeId: string;
  itemId: string;
}
export interface CartItem {
  quantity: number;
  selectedAttributes: SelectedAttribute[];
  product: Product;
}
