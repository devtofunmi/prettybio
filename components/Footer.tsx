import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { FC } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const Footer: FC = () => {
  return (
    <footer className="w-full bg-[linear-gradient(to_right,_#111827,_#312e81)]
 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {i === 0 && (
              <>
                <h3 className="text-2xl font-bold">PrettyBio</h3>
                <p className="text-gray-400 mt-2">
                  The best way to share your links in one place.
                </p>
              </>
            )}

            {i === 1 && (
              <>
                <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                <ul className="text-gray-400 space-y-2">
                  <li>
                    <Link href="/landingpage/features" className="hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/landingpage/faq" className="hover:text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:prettybio@gmail.com" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </>
            )}

            {i === 2 && (
              <>
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
              </>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      >
        &copy; {new Date().getFullYear()} PrettyBio. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;



