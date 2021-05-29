export type CommonType = 'add' | 'remove';

export interface TotalAction {
  type: CommonType;
  price: number;
}
