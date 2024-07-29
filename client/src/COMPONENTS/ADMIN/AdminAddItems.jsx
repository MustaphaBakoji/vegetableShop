import React, { useState } from 'react';

function AdminAdd() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleAddProduct = (e) => {
        e.preventDefault();
        // Handle the product addition logic here  
        console.log({
            productName,
            productPrice,
            productImage,
        });
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl text-center font-bold mb-6">Add New Product</h2>
                <form onSubmit={handleAddProduct}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary bg-green-800 w-full mt-4 hover:border-[1px] hover:border-green-800 hover:bg-transparent hover:text-green-800 hover:font-bold hover:text-2xl"
                    >
                        Add Product
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Want to go back?{' '}
                    <a href="/admin" className="text-green-800 hover:underline">
                        Admin Dashboard
                    </a>
                </p>
            </div>
        </div>
    );
}

export default AdminAdd;