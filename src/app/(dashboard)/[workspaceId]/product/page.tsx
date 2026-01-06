"use client";

import React, { useEffect, useState } from 'react'

interface Product{
  id : number;
  name: string;
}

const ProductS = () => {
  const [product,setProducts]=useState<Product[]>([]);
 useEffect(() => {
      fetch("/api/product")
        .then(res => res.json())
        .then((data) => {
          setProducts(data.products);
        })
        .catch(err => console.error(err));
  }, []);
  return (
    <div>
     {product.map((product:Product)=>(
      <h1 key={product.id}>{product.name}</h1>
      ))}
    </div>
  )
}

export default ProductS;