import { useReducer } from 'react';
import { cartReducer } from '../core/cart-store';
import { Product as ProductModel } from '../core/product.model';
import Product from '../Product/Product';

import './cart.css';

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const getTotal = (cart: ProductModel[]): string => {
  const total = cart.reduce((subTotal, prod) => subTotal + prod.price, 0);
  return total.toLocaleString(undefined, currencyOptions);
}

const existsInCart = (cart: ProductModel[], product: ProductModel): boolean => {
  return !!cart.find(item => item.name === product.name);
}

const products: ProductModel[] = [
  {
    emoji: '🍦',
    name: 'ice cream',
    price: 5
  },
  {
    emoji: '🍩',
    name: 'donuts',
    price: 2.5,
  },
  {
    emoji: '🍉',
    name: 'watermelon',
    price: 4
  }
];

export default function Cart() {
  const [cart, setCart] = useReducer(cartReducer, []);

  const add = (product: ProductModel): void => {
    setCart({ product, type: 'add' });
  };

  const remove = (product: ProductModel): void => {
    setCart({ product, type: 'remove' });
  };


  return(
    <div className="wrapper">
      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(cart)}</div>
      <div>
        {products.map(product => (
          <Product
            key={product.name}
            product={product}
            disabled={!existsInCart(cart, product)}
            add={add}
            remove={remove}
          />
        ))}
      </div>
    </div>
  );
}
