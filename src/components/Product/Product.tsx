import { useState } from 'react';
import './Product.css';

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const getTotal = (total: number): string => {
  return total.toLocaleString(undefined, currencyOptions);
}

export default function Product() {
  const [cart, setCart] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const add = () => {
    setCart(['ice cream']);
    setTotal(5);
  };

  return(
    <div className="wrapper">
      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(total)}</div>

      <div className="product"><span role="img" aria-label="ice cream">🍦</span></div>
      <button type="button" onClick={add} >Add</button>
      <button
        type="button"
        style={{backgroundColor: 'red', color: 'white', margin: '0 4px'}}
        onClick={() => {
          // Create new function everytime
          setCart([]);
          setTotal(0);
        }}
      >
        Remove
      </button>
    </div>
  );
}
