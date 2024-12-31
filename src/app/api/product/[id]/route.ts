import { NextResponse } from 'next/server';

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

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            );
        }

        const product = products.find(p => p.id === id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
