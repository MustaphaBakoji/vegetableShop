import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        fetch("https://localhost:4000/user/create", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
        })
        // Handle signup logic here  
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl text-center font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary bg-green-800 w-full mt-4 hover:border-[1px] hover:border-green-800 hover:bg-transparent hover:text-green-800 hover:font-bold hover:text-2xl">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-800 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;