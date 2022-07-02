import { Product } from './product.type';

export interface SelectedAttribute {
  attributeId: string;
  itemId: string;
}
export interface CartProduct {
  quantity: number;
  selectedAttributes: SelectedAttribute[];
  product: Product;
}
