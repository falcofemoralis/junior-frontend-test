export interface Currency {
  symbol: string;
}
export interface Price {
  amount: number;
  currency: Currency;
}
export interface Product {
  name: string;
  gallery: string[];
  inStock: boolean;
  prices: Price[];
}
