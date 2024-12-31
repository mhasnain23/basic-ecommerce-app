"use client";

import { useCart } from "./CartProvider";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart, removeFromCart, cart } = useCart();

  const isInCart = cart.some((item: any) => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        isInCart ? "bg-red-500" : "bg-green-500"
      } text-white px-2 py-1 rounded`}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}
