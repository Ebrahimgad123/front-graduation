 "use client"
import React from 'react'
import Nav from './Nav'
import MobileNavbar from './MobileNavbar'
import { useState } from 'react'
const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShow = () => {
   setIsOpen(true);
  };
  const handleClose = () => {
   setIsOpen(false);
  };
  return (
    <div>
        <Nav handleShow={handleShow} />
        <MobileNavbar isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}

export default ResponsiveNavbar