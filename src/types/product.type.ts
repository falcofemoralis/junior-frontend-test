export interface Currency {
  symbol: string;
}
export interface Price {
  amount: number;
  currency: Currency;
}

export enum AttributeType {
  text = 'text',
  swatch = 'swatch'
}
export interface AttributeItem {
  displayValue: string;
  value: string;
  id: string;
}
export interface Attribute {
  id: string;
  name: string;
  type: AttributeType;
  items: AttributeItem[];
}
export interface Product {
  id: string;
  brand: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  prices: Price[];
  attributes: Attribute[];
}
