"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

const Navbar = () => {
  // using useRouter from next/navigation
  const router = useRouter();
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between md:px-6 px-8">
        {/* for ecommmerce logo */}
        <div className="md:p-0 p-2">
          <h1 className="text-3xl font-black tracking-wide text-transparent bg-clip-text text-clip bg-gradient-to-br to-blue-600 from-emerald-500 uppercase">
            <Link href={"/"}>shopiee</Link>
          </h1>
        </div>
        <div>
          <ul className="md:flex hidden items-center justify-center gap-10">
            <li className="text-lg font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-200 ease-linear">
              <Link href="/">Home</Link>
            </li>
            <li className="text-lg font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-200 ease-linear">
              <button onClick={() => router.push("/cart")} className="relative">
                Your Cart{" "}
                <span className="absolute bottom-3 size-6 text-white/90 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="md:hidden block">menu</div>
      </div>
    </nav>
  );
};

export default Navbar;
