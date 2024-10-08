import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Utils/Loading';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsLoading, setIsLoading] = useState(false)
    const handleLogin = (e) => {
        setIsLoading(true)
        e.preventDefault();
        fetch("http://localhost:4000/user/auth", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setIsLoading(false)
        })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
        // Handle login logic here  
    };

    return (
        <> {IsLoading ? <Loading /> : <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl text-center font-bold mb-6">Login</h2>
                <form onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-green-800 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>}</>
    );
}

export default Login;