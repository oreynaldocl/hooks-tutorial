import { useReducer } from 'react';
import { Product as ProductModel } from './product.model';
import './Product.css';
import { CartAction } from './cart-action.model';

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const getTotal = (cart: ProductModel[]): string => {
  const total = cart.reduce((subTotal, prod) => subTotal + prod.price, 0);
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

const existsInCart = (cart: ProductModel[], product: ProductModel): boolean => {
  return !!cart.find(item => item.name === product.name);
}

const cartReducer = (state: ProductModel[], { type, product }: CartAction): ProductModel[] => {
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

export default function Product() {
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
              disabled={!existsInCart(cart, product)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
