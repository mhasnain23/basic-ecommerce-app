import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest, { params }: { params: any }) {
    const { id } = await params;
    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        return NextResponse.json(product);
    } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
}
