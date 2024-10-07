'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import styled from 'styled-components';
import Spinner from "../spiner/Spiner";
import Button from "../UI/Button/Button";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";


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
    isLiked: boolean;
}

const GetProducts = () => {
    const [posts, setPosts] = useState<Product[]>([]);
    const [likedProducts, setLikedProducts] = useState<number[]>([]); 
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

    const toggleLike = async (id: number) => {
        if (!session) return;

        const isLiked = likedProducts.includes(id);
        const method = isLiked ? 'DELETE' : 'POST';
        const url = `http://192.168.88.39:7000/auth/products/${id}/like`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                if (isLiked) {
                    setLikedProducts(likedProducts.filter(productId => productId !== id));
                } else {
                    setLikedProducts([...likedProducts, id]);
                }
            } else {
                throw new Error('Failed to toggle like.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCheckout = async () => {
        if (!session) return;

        const productsToCheckout = posts.map((post) => ({
            id: post.id,
            quantity: 1,
            price: post.price,
        }));

        const body = JSON.stringify({
            products: productsToCheckout,
            totalItems: productsToCheckout.length,
            priceTotal: productsToCheckout.reduce((acc, prod) => acc + prod.price, 0),
        });

        try {
            const response = await fetch('http://192.168.88.39:7000/auth/checkout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.user.access_token}`,
                    'Content-Type': 'application/json',
                },
                body,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                throw new Error('Checkout failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (status === "loading") {
        return <Spinner />;
    }

    if (status === "unauthenticated") {
       const router = useRouter()
        router.push("/")
    }

    return (
        <ProducContainer>
            <ProductGrid>
            {posts.map((post) => (
    <ProductCard key={post.id}>
        <ImageContainer>
            {post.image ? (
                <ProductImage src={post.image} alt={post.title} />
            ) : (
                <PlaceholderImage>hola</PlaceholderImage>
            )}
        </ImageContainer>
        <ProductTitle>{post.title}</ProductTitle>
        <ProductPrice>${post.price}</ProductPrice>
        <Accions>
            <AddToCartButton label={<FaShoppingCart />} onClick={handleCheckout} />
            <AddLike
                label={
                    likedProducts.includes(post.id) 
                        ? <FaHeart />  
                        : <FaRegHeart />
                }
                onClick={() => toggleLike(post.id)} 
            />
        </Accions>
    </ProductCard>
))}
            </ProductGrid>
        </ProducContainer>
    );
};

export const ProducContainer = styled.div`
    display: flex;
    padding-top: 20px;
    padding-left: 100px;
    width: 100%;
    flex-direction: column;
`;

export const ProductGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

export const ProductCard = styled.div`
    width: 250px;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    text-align: center;
    background-color: white;
`;

export const ImageContainer = styled.div`
    position: relative;
    padding-top: 100%; 
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 12px;
`;

export const ProductImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const PlaceholderImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ececec;
    color: #ccc;
    font-size: 24px;
`;

export const ProductTitle = styled.h2`
    font-size: 18px;
    color: #5d37ef; 
    text-align: center;
    width: 100%;
    height: 120px;
`;

export const ProductPrice = styled.p`
    font-size: 16px;
    color: #28a745;
    width: 100%;
    margin-bottom: 12px;
`;

export const Accions = styled.div`
    width: 100%;
    display: flex;
`;

export const AddToCartButton = styled(Button)`
    background: linear-gradient(to right, #fbb034, #ffdd00); 
    color: #5d37ef;
    padding: 12px 0;
    border: none;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

export const AddLike = styled(Button)`
    background: linear-gradient(to right, #fbb034, #ffdd00); 
    color: #5d37ef;
    padding: 12px 0;
    border: none;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

export const CheckoutButton = styled(Button)`
    background: #28a745;
    color: white;
    padding: 16px;
    font-size: 18px;
    border-radius: 8px;
    margin-top: 20px;
    cursor: pointer;
    
    &:hover {
        opacity: 0.9;
    }
`;

export default GetProducts;
