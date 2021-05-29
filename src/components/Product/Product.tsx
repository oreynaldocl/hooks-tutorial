import { useReducer } from 'react';
import { Product as ProductModel } from './product.model';
import './Product.css';

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const getTotal = (total: number): string => {
  return total.toLocaleString(undefined, currencyOptions);
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

const cartReducer = (state: string[], product: string): string[] => {
  return [...state, product];
}
const totalReducer = (state: number, price: number): number => {
  return state + price;
}

export default function Product() {
  const [cart, setCart] = useReducer(cartReducer, []);
  const [total, setTotal] = useReducer(totalReducer, 0);

  const add = (product: ProductModel): void => {
    setCart(product.name);
    setTotal(product.price);
  };

  return(
    <div className="wrapper">
      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(total)}</div>
      <div>
        {products.map(product => (
          <div key={product.name}>
            <div className="product">
              <span role="img" aria-label={product.name}>{product.emoji}</span>
            </div>
            <div>{JSON.stringify(product)}</div>
            <button
              type="button"
              onClick={() => add(product)}
            >
              Add
            </button>
            <button
              type="button"
              style={{backgroundColor: 'red', color: 'white', marginLeft: 4}}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
