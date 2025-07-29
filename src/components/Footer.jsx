import React from 'react'
import { MdFacebook } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
const Footer = () => {
  return (
    <div>
        <footer className="bg-dark text-white text-center py-3 ">
        <p className="mb-2">© 2025 ShopMyCart India. All rights reserved.</p>
        <p className="">Follow us on : 
            <a href="#" className="text-white ms-2"><MdFacebook size={24}/></a>
            <a href="#" className="text-white ms-2"><FaSquareXTwitter size={24}/></a>
            <a href="#" className="text-white ms-2"><PiInstagramLogoFill size={24}/></a>
        </p>
        </footer>
    </div>
  )
}

export default Footer