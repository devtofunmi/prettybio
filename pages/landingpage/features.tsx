"use client";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UserInput from "../../components/UserInput.jsx";
import { User, Link, Palette, Lock, Share2, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const leftFeatures = [
  {
    icon: <User />,
    title: "Personal URL",
    description: "Create your personal PrettyBio URL and use it in your social bios.",
  },
  {
    icon: <Link />,
    title: "Unlimited Links",
    description: "Add and edit as many links as you like, anytime.",
  },
  {
    icon: <Palette />,
    title: "Elegant & Customizable",
    description: "Give your bio page a clean, stylish look with customizable themes.",
  },
];

const rightFeatures = [
  {
    icon: <Lock />,
    title: "Secure & Private",
    description: "We respect your privacy. No shady tracking or data selling.",
  },
  {
    icon: <Share2 />,
    title: "Social First",
    description: "Link all your social accounts to one beautiful, optimized page.",
  },
  {
    icon: <Globe />,
    title: "Web-Based",
    description: "No installs needed. Works perfectly on any browser or device.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />

      <motion.section
        className="px-6 py-20 text-center bg-gradient-to-b from-pink-300 to-pink-200"
        initial="initial"
        whileInView="whileInView"
        exit="exit"
        transition={fadeInUp.transition}
        viewport={{ once: false }}
        variants={fadeInUp}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 mt-16">
          Everything You Need in One Bio Link
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          PrettyBio helps you stand out with customizable design, analytics, and link management that’s actually fun to use.
        </p>
      </motion.section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Left Features */}
          <div className="space-y-10 flex-1">
            {leftFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                className="flex items-start justify-between gap-8"
                initial="initial"
                whileInView="whileInView"
                exit="exit"
                transition={{ duration: 0.5 + idx * 0.1 }}
                viewport={{ once: false }}
                variants={fadeInUp}
              >
                <div className="text-right">
                  <h4 className="font-bold text-gray-900 text-lg">{feat.title}</h4>
                  <p className="text-gray-400 text-sm mt-2">{feat.description}</p>
                </div>
                <div className="bg-black/10 p-2 rounded-full w-10 h-10">{feat.icon}</div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            className="hidden md:flex justify-center flex-1"
            initial="initial"
            whileInView="whileInView"
            exit="exit"
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            variants={fadeInUp}
          >
            <Image
              src="/assets/bg.png"
              alt="PrettyBio Preview"
              className="w-[250px] h-auto rounded-xl border border-gray-700 shadow-lg"
              width={300}
              height={300}
            />
          </motion.div>

          {/* Right Features */}
          <div className="space-y-10 flex-1 mt-16 md:mt-0">
            {rightFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-8"
                initial="initial"
                whileInView="whileInView"
                exit="exit"
                transition={{ duration: 0.5 + idx * 0.1 }}
                viewport={{ once: false }}
                variants={fadeInUp}
              >
                <div className="bg-black/10 p-2 rounded-full w-10 h-10">{feat.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{feat.title}</h4>
                  <p className="text-gray-400 text-sm mt-2">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        className="text-center px-6 py-20 bg-gradient-to-br from-[#f0f4ff] to-white"
        initial="initial"
        whileInView="whileInView"
        exit="exit"
        transition={fadeInUp.transition}
        viewport={{ once: false }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Launch Your Online Presence</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-10">With Confidence Today</h3>
        <UserInput />
      </motion.section>

      <Footer />
    </div>
  );
}



