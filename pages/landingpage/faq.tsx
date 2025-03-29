import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { IoIosArrowDown } from "react-icons/io";

const faqs = [
  {
    id: 1,
    question: "Why do I need a link in bio tool?",
    answer:
      "With a link in bio tool, you can consolidate all your important links in one place. Instead of sharing multiple links across different platforms or constantly updating your bio link manually, you can simply update the links within the tool, saving time and effort.",
  },
  {
    id: 2,
    question: "How many links should I have on my PrettyBio?",
    answer:
      "It depends on your goal. For personal use, business, or a campaign, prioritize the most relevant links. Avoid clutter—too many links can overwhelm visitors. Instead, organize them for a cleaner experience.",
  },
  {
    id: 3,
    question: "Do I need a website to use PrettyBio?",
    answer:
      "No, PrettyBio provides a landing page for your links. You can showcase social media, stores, blogs, or any other relevant content—all without needing a website.",
  },
  {
    id: 4,
    question: "Can I remove links?",
    answer: "Yes! Log in to PrettyBio anytime to edit, add, or remove links as needed.",
  },
  {
    id: 6,
    question: "Should I add this link to my Instagram posts?",
    answer:
      "No! Instagram's Terms prohibit clickable links in captions. Instead, use your bio link for a better experience.",
  },
  {
    id: 7,
    question: "Is my data safe?",
    answer: "Yes, your data is secure with PrettyBio.",
  },
  {
    id: 8,
    question: "I love the product! How can I show appreciation?",
    answer: "Tell your friends about PrettyBio! You can also leave a review on Twitter.",
  },
];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);

  const toggleActive = (id: number) => {
    setActive(active === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="text-gray-900 px-4 sm:px-6 py-24">
        <h1 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h1>

        <div className="mx-auto w-full md:w-2/3 rounded-2xl text-left">
          {faqs.map((item) => (
            <div key={item.id} className="mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleActive(item.id)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-900 py-3 focus:outline-none"
              >
                <div className="flex-1 text-left">{item.question}</div>
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    active === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {active === item.id && (
                <p className="mt-2 text-gray-600 text-md">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

