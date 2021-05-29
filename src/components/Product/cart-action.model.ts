import { Product } from './product.model';

export interface CartAction {
  type: 'add' | 'remove';
  product: Product;
}
