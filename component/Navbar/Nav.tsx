import React from 'react';
import { TbAirBalloon } from 'react-icons/tb';
import { navLinks } from '../../constent/constant';

type Props = {
  handleShow: () => void;
};

const Nav = ({ handleShow }: Props) => {
  return (
    <div className="bg-blue-950 fixed top-0 left-0 w-full h-[12vh] shadow-md z-[40]">
      <div className="flex items-center h-full justify-between w-[95%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <div className="text-white flex items-center space-x-2">
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
            <TbAirBalloon className="text-3xl text-white" />
          </div>
          <h1 className="text-xl md:text-2xl text-white uppercase font-bold">Trav Mate</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className='hover:text-rose-500 transition-colors duration-200 after:content-[""] after:block after:w-0 after:h-[2px] after:bg-rose-500 after:transition-all hover:after:w-full'
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Book Now Button */}
        <div>
          <button className="bg-rose-500 hidden md:flex text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors duration-200">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={handleShow}
          className="md:hidden flex items-center justify-center w-10 h-10 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Nav;
