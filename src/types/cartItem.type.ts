import { Product } from './product.type';

export interface SelectedAttribute {
  attributeId: string;
  itemId: string;
}
interface CartItemAttrs {
  quantity: number;
  selectedAttributes: SelectedAttribute[];
}

export interface CartItem extends CartItemAttrs {
  product: Product;
}
