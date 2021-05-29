import { Product } from './product.model';

export interface CartAction {
  type: 'add' | 'remove';
  product: Product;
}

export const cartReducer = (state: Product[], { type, product }: CartAction): Product[] => {
  switch (type) {
    case 'add': return [...state, product];

    case 'remove': {
      const index = state.findIndex(item => item.name === product.name);
      if (index < 0) {
        return state;
      }
      const updated = [...state];
      updated.splice(index, 1);
      return updated;
    }

    default: return state;
  }
}
