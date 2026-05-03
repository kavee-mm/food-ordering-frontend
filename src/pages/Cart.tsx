import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = (index: number, change: number) => {
    let updatedCart = [...cart];

    if (!updatedCart[index].qty) {
      updatedCart[index].qty = 1;
    }

    updatedCart[index].qty += change;

    if (updatedCart[index].qty <= 0) {
      updatedCart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * (item.qty || 1);
    }, 0);
  };

  const placeOrder = () => {
    alert("Order placed successfully! 🎉");

    // Clear cart
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p>
                {item.name} - Rs.{item.price}
              </p>

              <button onClick={() => updateQuantity(index, -1)}>-</button>
              <span> {item.qty || 1} </span>
              <button onClick={() => updateQuantity(index, 1)}>+</button>
            </div>
          ))}

          <h3>Total: Rs.{getTotal()}</h3>

          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;