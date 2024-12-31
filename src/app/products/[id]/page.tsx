import AddToCartButton from "@/components/AddToCart";
import Image from "next/image";
import Link from "next/link";

async function getProduct(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
    console.error("Error fetching product:", error);
    throw error;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  let product;
  let error;

  try {
    product = await getProduct(params.id);
  } catch (e: any) {
    error = e;
    console.error("Error in ProductPage component:", e);
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Error loading product. Please try again later.</p>
        <p>Details: {error.message}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto h-screen flex md:flex-row flex-col items-center justify-between p-4">
        <div className="md:flex flex-none items-center overflow-hidden md:mb-0 mb-10">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            priority
            quality={100}
            className="object-cover hover:scale-105 transition-transform duration-200 ease-in rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-5xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 text-xl mb-2">
            ${product.price.toFixed(2)}
          </p>
          <div className="mt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
