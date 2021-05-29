import { useReducer } from 'react';
import { Product as ProductModel } from './product.model';
import './Product.css';
import { TotalAction } from './totalAction.model';
import { CartAction } from './cartAction.model';

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

const cartReducer = (state: string[], { type, product }: CartAction): string[] => {
  switch (type) {
    case 'add': return [...state, product];

    case 'remove': {
      const updated = [...state];
      updated.splice(updated.indexOf(product), 1);
      return updated;
    }

    default: return state;
  }
}
const totalReducer = (state: number, { type, price }: TotalAction): number => {
  switch (type) {
    case 'add': return state + price;

    case 'remove': return state - price;

    default: return state;
  }
}

export default function Product() {
  const [cart, setCart] = useReducer(cartReducer, []);
  const [total, setTotal] = useReducer(totalReducer, 0);

  const add = ({ name, price}: ProductModel): void => {
    setCart({ product: name, type: 'add' });
    setTotal({ price, type: 'add' });
  };

  const remove = ({ name, price}: ProductModel): void => {
    if (cart.findIndex(item => item === name) >= 0) {
      setCart({ product: name, type: 'remove' });
      setTotal({ price, type: 'remove' });
    }
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
              onClick={() => remove(product)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
