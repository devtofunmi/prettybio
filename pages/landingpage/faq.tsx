"use client";

import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    id: 1,
    question: "Why do I need a link in bio tool?",
    answer:
      "With a link in bio tool, you can consolidate all your important links in one place. Instead of sharing multiple links across platforms, just update your PrettyBio page to save time and keep everything organized.",
  },
  {
    id: 2,
    question: "How many links should I have on my PrettyBio?",
    answer:
      "It depends on your goal. Prioritize the most relevant links and avoid clutter. A well organized layout makes it easier for visitors to find what matters.",
  },
  {
    id: 3,
    question: "Do I need a website to use PrettyBio?",
    answer:
      "Not at all. PrettyBio gives you a beautiful landing page for your links no website or coding needed.",
  },
  {
    id: 4,
    question: "Can I remove links?",
    answer: "Yes, anytime! Just log in to manage your links easily.",
  },
  {
    id: 6,
    question: "Should I add this link to my Instagram posts?",
    answer:
      "Nope Instagram doesn't allow clickable links in captions. Instead, drop it in your bio. It’s like your personal landing page  make it count!"
  },
  
  {
    id: 7,
    question: "Is my data safe?",
    answer: "Yes. We prioritize security and privacy to keep your data protected.",
  },
  {
    id: 8,
    question: "I love the product! How can I show appreciation?",
    answer:
      "Share PrettyBio with your friends, or give us a shoutout on Twitter or anywhere else!",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);

  const toggleActive = (id: number) => {
    setActive(active === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <motion.section
        className="px-6 py-20 text-center bg-gradient-to-b from-pink-300 to-pink-200"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={fadeInUp.transition}
        variants={fadeInUp}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 mt-16">Got Questions?</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          We’ve got answers. If you’re still wondering about something, this is a great place to start.
        </p>
      </motion.section>

      {/* Accordion */}
      <section className="px-6 py-16 max-w-4xl mx-auto w-full">
        {faqs.map((item, idx) => (
          <motion.div
            key={item.id}
            className="border-b border-gray-200 pb-4 mb-6"
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false }}
            transition={{ duration: 0.4 + idx * 0.05 }}
            variants={fadeInUp}
          >
            <button
              onClick={() => toggleActive(item.id)}
              className="w-full flex justify-between items-center text-left text-lg md:text-xl font-semibold py-3 transition hover:text-indigo-600"
            >
              <span>{item.question}</span>
              <IoIosArrowDown
                className={`transition-transform duration-300 text-xl ${
                  active === item.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {active === item.id && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="mt-3 text-gray-600 text-base md:text-lg">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

    
      <motion.section
        className="text-center px-6 py-20 bg-gradient-to-br from-[#f0f4ff] to-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={fadeInUp.transition}
        variants={fadeInUp}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Still unsure?</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Start exploring PrettyBio for free and see how easy it is to build your online presence.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
        >
          Try PrettyBio Now
        </Link>
      </motion.section>

      <Footer />
    </div>
  );
}



