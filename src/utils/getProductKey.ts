import { CartItem } from '../types/cartItem.type';

export const getProductKey = (product: CartItem) => {
  let key = `${product.product.id}`;
  for (const attr of product.selectedAttributes) {
    key += `-${attr.attributeId}-${attr.itemId}`;
  }

  return key;
};
