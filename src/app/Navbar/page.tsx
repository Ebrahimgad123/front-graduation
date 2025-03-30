"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";


import { FaPagelines, FaInfoCircle, FaCogs, FaProjectDiagram, FaPhone } from "react-icons/fa";

const menuItems = [
  { name: "الصفحة الرئيسية", path: "/", icon: <FaPagelines /> },
  { name: "من نحن", path: "/", icon: <FaInfoCircle /> },
  { name: "الخدمات", path: "/tecnology", icon: <FaCogs /> },
  { name: "المشاريع", path: "/projects", icon: <FaProjectDiagram /> },
  { name: "اتصل بنا", path: "/contact", icon: <FaPhone /> }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-black to-purple-600 text-white p-5 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        </motion.div>
          
        <div className="hidden md:flex space-x-8 text-lg cairo">
          {menuItems.map((item, index) => (
            <motion.button 
              key={index}
              onClick={() => router.push(item.path)} 
              className="hover:text-gray-200 transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* زر القائمة الجانبية */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* القائمة الجانبية في الهاتف */}
      {isOpen && (
        <motion.div 
          className="cairo mt-6 md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-purple-900 to-gray-900 bg-opacity-90 text-white flex flex-col items-center space-y-6 py-6"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => {
                router.push(item.path);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-lg hover:text-gray-300 transition duration-300 mb-[50px]"
            >
              <span className="text-gray-400 text-xl">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
