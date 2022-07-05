import { Currency, Product } from './../types/product.type';

export const getPrice = (product: Product, currency: Currency | null) => {
  return product.prices.find(p => p.currency.label == currency?.label) ?? product.prices[0];
};

export const getPriceString = (product: Product, currency: Currency | null) => {
  const price = getPrice(product, currency);
  return `${price.currency.symbol}${price.amount}`;
};
