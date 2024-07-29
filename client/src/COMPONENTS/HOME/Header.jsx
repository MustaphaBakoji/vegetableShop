import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { cartActions } from '../REDUX_STORE/cartSlice';

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    let dispatch = useDispatch()
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="bg-green-800 text-white p-5">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-3xl font-bold flex">
                    <motion.p initial={{ scale: 0.1, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1 }}>F</motion.p>
                    <motion.p initial={{ scale: 0.1, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2 }}>A</motion.p>
                    <motion.p initial={{ scale: 0.1, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.3 }}>M</motion.p>
                    <motion.p initial={{ scale: 0.1, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.4 }}>V</motion.p>
                    <motion.p initial={{ scale: 0.1, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.5 }}>E</motion.p>
                    <motion.p initial={{ scale: 0.1, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.6 }}>G</motion.p>
                </h1>

                <nav className={`md:hidden fixed top-0 left-0 h-screen w-1/2 bg-green-700 transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out absolute z-50`}>
                    <ul className="flex flex-col space-y-4 p-8">
                        <li>
                            <NavLink
                                to="/"
                                exact
                                className="text-white hover:text-green-300 transition-colors duration-200"
                                activeClassName="font-bold"
                                onClick={() => setShowMenu(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/products"
                                className="text-white hover:text-green-300 transition-colors duration-200"
                                activeClassName="font-bold"
                                onClick={() => setShowMenu(false)}
                            >
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className="text-white hover:text-green-300 transition-colors duration-200"
                                activeClassName="font-bold"
                                onClick={() => setShowMenu(false)}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className="text-white hover:text-green-300 transition-colors duration-200"
                                activeClassName="font-bold"
                                onClick={() => setShowMenu(false)}
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className="hidden md:flex space-x-4">
                    <NavLink
                        to="/"
                        exact
                        className="text-white hover:text-green-300 transition-colors duration-200"
                        activeClassName="font-bold"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className="text-white hover:text-green-300 transition-colors duration-200"
                        activeClassName="font-bold"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-white hover:text-green-300 transition-colors duration-200"
                        activeClassName="font-bold"
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-white hover:text-green-300 transition-colors duration-200"
                        activeClassName="font-bold"
                    >
                        Contact
                    </NavLink>
                </nav>
                <div className="flex items-center ml-2"> {/* Reduced margin here */}

                    <button className="text-white hover:text-green-300 transition-colors duration-200 flex items-center w-8 h-8 relative">
                        <FaShoppingCart className=' h-6 w-6' onClick={() => { dispatch(cartActions.toggleCart()) }} />
                        <span className="ml-1 absolute bottom-4 left-3 bg-white text-green-800 rounded-full min-w-5 h-5 border-[1px] border-green-900 font-bold ">1</span>
                    </button>
                    <div className="md:hidden flex items-end ml-10">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-green-300 transition-colors duration-200"
                        >
                            {showMenu ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
