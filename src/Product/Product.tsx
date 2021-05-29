import { Fragment, useCallback } from 'react';
import { Product as ProductModel } from '../core/product.model';

type ProductAction = (product: ProductModel) => void;

interface ProductProps {
  product: ProductModel;
  disabled: boolean;
  add: ProductAction;
  remove: ProductAction;
}

export default function Product({ disabled, product, add, remove }: ProductProps) {
  return(
    <Fragment>
      <div className="product">
        <span role="img" aria-label={product.name}>{product.emoji}</span>
      </div>
      <div>{JSON.stringify(product)}</div>
      <button
        type="button"
        onClick={useCallback(
          () => add(product),
          [add, product],
        )}
      >
        Add
      </button>
      <button
        type="button"
        style={{backgroundColor: 'red', color: 'white', marginLeft: 4}}
        onClick={useCallback(
          () => remove(product),
          [remove, product],
        )}

        disabled={disabled}
      >
        X
      </button>
    </Fragment>
  );
}
