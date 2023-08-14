import React from 'react';
import "./ProductCard.css";

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

export default function ProductCard({ product }) {
    return (
        <div className="product-card bg-white pb-4 dark:bg-gray-900 shadow-md rounded-lg w-56 h-96 mb-4">
            <div className="relative">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="product-card__image h-60 w-screen object-cover  rounded-t-lg"
                />
                <div className="absolute inset-0 border opacity-0 hover:opacity-100 transition duration-300"></div>
            </div>
            <div className="flex flex-col mt-4">
                <h2 className="product-card__description text-sm font-semibold text-gray-900 dark:text-white">{product.title}</h2>
                <p className="product-card__price mt-2 text-sm text-gray-600 dark:text-gray-400">{rupiah(product.price)}</p>
            </div>
            <div className="mt-4">
                <a className="btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" href={product.productUrl} target='_blank'>
                    Buy Now
                </a>
            </div>
        </div>
    );
}
