import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-md fixed top-0 left-0 z-50">
        {/* Logo */}
        <Link href="/" >
        <h2 className="text-3xl font-bold text-gray-800">PrettyBio</h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-12">
          <Link href="/features" className="px-4 py-2 text-gray-800">
            Features
          </Link>
          <Link href="/faq" className="px-4 py-2 text-gray-800 ">
            FAQ
          </Link>
        </nav>

        {/* Login & Signup */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/Login" className="px-4 py-2 text-gray-800 ">
            Login
          </Link>
          <Link
            href="/Signup"
            className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden">
          <Link href="/features" className="block px-4 py-2 text-gray-800">
            Features
          </Link>
          <Link href="/faq" className="block px-4 py-2 text-gray-800 ">
            FAQ
          </Link>
          <Link href="/Login" className="block px-4 py-2 text-gray-800 ">
            Login
          </Link>
          <Link
            href="/Signup"
            className="block bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Header;
