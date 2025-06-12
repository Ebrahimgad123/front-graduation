import { navLinks } from '../../constent/constant'
import React from 'react'
import clsx from 'clsx'

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const MobileNavbar = ({ isOpen, handleClose }: Props) => {
  return (
    <div className="z-[1001]">
      {/* overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/70 transition-opacity duration-300 z-[1000]'
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed top-0 left-0 w-[80%] h-screen bg-rose-600/90 z-[1001] flex flex-col items-center justify-center space-y-6 shadow-lg transition-transform duration-500',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Navigation Links */}
        <div className='flex flex-col space-y-4 text-lg'>
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={handleClose}>
              <p className='text-white transition-colors duration-200 after:content-[""] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full'>
                {link.name}
              </p>
            </a>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 text-white hover:text-black transition-colors duration-200'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MobileNavbar;
