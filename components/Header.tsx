import Link from "next/link";
import React, { useState, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-sm fixed top-0 left-0 z-50">
        <Link href="/">
          <h2 className="text-xl font-bold text-gray-800">PrettyBio</h2>
        </Link>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-12">
          <Link href="/landingpage/features" className="px-4 py-2 text-gray-800">
            Features
          </Link>
          <Link href="/landingpage/faq" className="px-4 py-2 text-gray-800">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/authentication/Login" className="px-4 py-2 text-gray-800">
            Login
          </Link>
          <Link
            href="/authentication/Signup"
            className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden text-gray-900 text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-10 top-16 left-0 w-full h-screen bg-white shadow-md font-semibold flex flex-col px-4 py-4 md:hidden"
          >
            <div className="flex flex-col items-left gap-10">
              <Link href="/landingpage/features" className="block px-4 py-2 text-2xl mt-5 text-gray-800">
                Features
              </Link>
              <Link href="/landingpage/faq" className="block px-4 py-2 text-2xl text-gray-800">
                FAQ
              </Link>
              <Link href="/authentication/Login" className="block px-4 py-2 text-2xl text-gray-800">
                Login
              </Link>
              <Link
                href="/authentication/Signup"
                className="block text-gray-800 px-4 py-4 text-2xl rounded-full "
              >
                Sign Up
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;

