import { Product } from './product.type';

export interface CartProduct {
  quantity: number;
  selectedAttributes: Map<string, string>;
  product: Product;
}
