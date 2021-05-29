import { CommonType } from './totalAction.model';

export interface CartAction {
  type: CommonType;
  product: string;
}
