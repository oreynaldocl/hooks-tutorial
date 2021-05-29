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
  const [cart] = useState<string[]>([]);
  const [total] = useState(0);

  return(
    <div className="wrapper">
      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(total)}</div>

      <div className="product"><span role="img" aria-label="ice cream">🍦</span></div>
      <button>Add</button> <button>Remove</button>
    </div>
  );
}
