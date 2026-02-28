import { useEffect, useState } from "react";
import "./App.css";
import { CartProvider } from "./app/context/CartContext";
import { Card } from "./components/Card";
import { Cart } from "./components/Cart";
import type { Product } from "./types/types";
import { ConfirmOrder } from "./components/ConfirmOrder";

function App() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <CartProvider>
      <div className="flex gap-2 items-start justify-center p-4">
        <div className="flex flex-col items-start gap-4 w-3/4 ml-6">
          <h1>Desserts</h1>
          <ul className="flex flex-wrap gap-4">
            {data.map((product, index) => (
              <li key={`card-${index}`}>
                <Card product={product} />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/4">
          <div className="fixed m-6">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
