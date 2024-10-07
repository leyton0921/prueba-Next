'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const GetProducts = () => {
    const [posts, setPosts] = useState<Product[]>([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchProducts = async () => {
            if (session) {

                try {
                    const response = await fetch('http://192.168.88.39:7000/auth/products', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.user.access_token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    if (data && Array.isArray(data)) {
                        setPosts(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            }
        };

        fetchProducts();
    }, [session]);

    if (status === "loading") {
        return <div>Loading...</div>; 
    }

    if (status === "unauthenticated") {
        return <div>You need to be authenticated to view products.</div>;
    }

    return (
        <div>
            <h1>Products</h1>
 
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>Price: ${post.price}</p>
                        <img src={post.image} alt={post.title} />
                    </div>
                ))}
       
        </div>
    );
};

export default GetProducts;
