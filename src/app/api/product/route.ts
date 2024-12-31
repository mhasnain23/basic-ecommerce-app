import { NextResponse } from 'next/server';

// Mock product data
const products = [
    {
        id: 1,
        name: 'Boys Hoddie wear',
        image: "/assets/thumb1.webp",
        price: 19.99,
        description: 'This is a boy hoddie'

    },
    {
        id: 2,
        name: 'Men T-Shirt 2025',
        image: "/assets/thumb2.webp",
        price: 29.99,
        description: 'This is men t-shirt'
    },
    {
        id: 3,
        name: "Boys blue jeans",
        image: "/assets/thumb3.webp",
        price: 39.99,
        description: 'This is a blue jeans'
    },
];

export async function GET() {
    try {
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error in GET /api/products:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

