import Link from "next/link";
import AddToCartButton from "@/components/AddToCart";
import Image from "next/image";

export const dynamic = "force-dynamic";
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      throw new Error("Failed to parse product data");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export default async function Home() {
  let products;
  let error;

  try {
    products = await getProducts();
  } catch (e: any) {
    error = e;
    console.error("Error in Home component:", e);
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Error loading products. Please try again later.</p>
        <p>Details: {error.message}</p>
      </div>
    );
  }

  // console.log(products);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-xl">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                quality={100}
                className="object-contain hover:scale-105 transition-transform duration-200 ease-in rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <div className="mt-2">
              <Link
                href={`/products/${product.id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                View Details
              </Link>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-4">
        <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded">
          View Cart
        </Link>
      </div> */}
    </div>
  );
}
