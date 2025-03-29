import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-bold">PrettyBio</h3>
          <p className="text-gray-400 mt-2">
            The best way to share your links in one place.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link href="/features" className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="mailto:prettybio@gmail.com" className="hover:text-white">
                 Contact
              </Link>
             </li>
          </ul>
        </div>

        <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://twitter.com" target="_blank" className="text-xl hover:text-blue-500">
                <FaTwitter />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-xl hover:text-pink-500">
                <FaInstagram />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="text-xl hover:text-blue-700">
                <FaFacebook />
              </Link>
              </div>
            </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} PrettyBio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


