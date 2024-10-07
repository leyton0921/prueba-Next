'use client'
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/products'); 
    }
  }, [status, router]);

  return (
    <div >
    hola
    </div>
  );
}
