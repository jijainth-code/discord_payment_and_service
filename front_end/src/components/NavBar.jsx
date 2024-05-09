import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const NavBar = () => {
    const navigate = useNavigate();



    return (
        <nav className="font-sans bg-[#0d1117] text-white w-full h-12 fixed top-0 left-0 flex items-center px-4">
        <div className="logo flex items-center">
            <Link to="/" className="px-4 py-2 capitalize rounded-lg transition-all duration-300">
            <img src="https://scontent-muc2-1.xx.fbcdn.net/v/t39.30808-6/300427664_520845636711694_8464662533295561612_n.png?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IdJ7o_yqwZcQ7kNvgEHU5UZ&_nc_ht=scontent-muc2-1.xx&oh=00_AfDNrbTHjNMeoqagIz3x6CkngUuapHJE-G9YOLf619O2lA&oe=6642671B" alt="Logo" className="w-8 h-8 object-cover rounded-full mr-2" />
            </Link>
        </div>
        <div className="flex-grow">
            <Link to="/" className="px-4 py-2 capitalize hover:bg-teal-300 hover:text-white rounded-lg transition-all duration-300">Payment</Link>
            <Link to="/invoices" className="px-4 py-2 capitalize hover:bg-teal-300 hover:text-white rounded-lg transition-all duration-300">Invoice</Link>
        </div>
        </nav>
    );
};

export default NavBar;