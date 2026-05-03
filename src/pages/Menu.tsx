import { useState } from "react";

function Menu() {
  const [foods] = useState([
    { id: 1, name: "Pizza", price: 1000 },
    { id: 2, name: "Burger", price: 500 },
    { id: 3, name: "Fried Rice", price: 800 },
  ]);

  const addToCart = (food: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(food);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(food.name + " added to cart!");
  };

  return (
    <div>
      <h2>Menu</h2>

      {foods.map((food) => (
        <div key={food.id} style={{ marginBottom: "10px" }}>
          <p>
            {food.name} - Rs.{food.price}
          </p>
          <button onClick={() => addToCart(food)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;