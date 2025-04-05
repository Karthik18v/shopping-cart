import { useState } from "react";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const itemInCart = cart.find((item) => item.id === productId);
    if (itemInCart) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quanity: item.quanity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quanity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const itemInCart = cart.find((item) => item.id === productId);
    if (itemInCart && itemInCart.quanity > 1) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quanity: item.quanity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== productId));
    }
  };

  const Subtotal = cart.reduce(
    (total, item) => total + item.price * item.quanity,
    0
  );

  const progressPercentage = Math.min((Subtotal / 1000) * 100, 100);

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      <div className="products-list-container">
        <ul className="products-list">
          {PRODUCTS.map((each) => (
            <li key={each.id} className="product-card">
              <h3>{each.name}</h3>
              <h3>&#x20B9; {each.price}</h3>
              <button
                className="add-cart-button"
                onClick={() => addToCart(each.id)}
              >
                Add To Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-container">
        <h2>Cart Summary</h2>
        <div className="cart-total">
          <div className="cart-total-details">
            <h3>Subtotal:</h3>
            <h3>&#x20B9; {Subtotal}</h3>
          </div>
          <hr />
          <div className="cart-progress-container">
            {Subtotal < 1000 ? (
              <>
                <p>
                  Add &#x20B9; {1000 - Subtotal} more to get a FREE Wireless
                  Mouse!
                </p>
                <div className="progressive">
                  <div
                    className="progressive-range"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <div>You got a free Wireless Mouse!</div>
            )}
          </div>
        </div>
      </div>
      <div className="cart-items-container">
        {cart.length === 0 ? (
          <div className="empty-cart-items">
            <p>Your cart is Empty</p>
            <p>Add some products to see them here!</p>
          </div>
        ) : (
          <div className="cart-items">
            <h1>Cart Items</h1>
            {cart.map((eachItem) => (
              <div className="cart-item">
                <div>
                  <p>{eachItem.name}</p>
                  <p>
                    &#x20B9;{eachItem.price} x {eachItem.quanity} =
                    {eachItem.price * eachItem.quanity}
                  </p>
                </div>
                {eachItem.price > 0 && (
                  <div className="cart-items-button">
                    <button
                      style={{ background: "red", border: 0 }}
                      onClick={() => removeFromCart(eachItem.id)}
                    >
                      -
                    </button>
                    <p>{eachItem.quanity}</p>
                    <button
                      style={{ background: "green", border: 0 }}
                      onClick={() => addToCart(eachItem.id)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
