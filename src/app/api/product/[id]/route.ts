import { NextRequest, NextResponse } from 'next/server';

const products = [
    {
        id: 1,
        name: 'Boys Hoodie Wear',
        image: "/assets/thumb1.webp",
        price: 19.99,
        description: 'This is a boy hoodie'
    },
    {
        id: 2,
        name: 'Men T-Shirt 2025',
        image: "/assets/thumb2.webp",
        price: 29.99,
        description: 'This is a men t-shirt'
    },
    {
        id: 3,
        name: "Boys Blue Jeans",
        image: "/assets/thumb3.webp",
        price: 39.99,
        description: 'This is blue jeans'
    },
];

export async function GET(
    request: NextRequest,
    context: { params: { id: string } } // Updated type for the `context` object
) {
    const { id } = context.params; // Destructure `id` from `context.params`

    const product = products.find(p => p.id === parseInt(id)); // Convert `id` to a number
    if (product) {
        return NextResponse.json(product); // Return the product if found
    } else {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 } // Return a 404 status code if the product is not found
        );
    }
}
