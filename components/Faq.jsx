import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Faq = () => {
  const [active, setActive] = useState(null);
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
        "Determine the purpose of your link bio,Are you using it for personal use, business promotion, or a specific campaign? Understanding the purpose will help you prioritize the most important links to include,Focus on including links that are relevant to your audience and align with your goals. Choose links that provide value, such as your website, blog, social media profiles, online store, portfolio, or specific landing pages.While there is no fixed limit, it's generally recommended to keep your link bio clean and uncluttered. Too many links can overwhelm visitors and make it difficult for them to find what they're looking for. Consider organizing links into categories or using a link management tool to create a streamlined and user-friendly experience.",
    },
    {
      id: 3,
      question: "Do I need a website to use PrettyBio?",
      answer:
        "No, you do not necessarily need a website to use PrettyBio,PrettyBio is designed to provide you with a single link that you can share on your social media profiles or other platforms. When someone clicks on that link, they are directed to a page where you can showcase multiple links and direct them to various destinations.While having a website can be beneficial for displaying additional information and content, it is not a requirement for using Prettybio,PrettyBio itself acts as a landing page where you can organize and share important links with your audience.You can include various types of links in PrettyBio, such as links to your social media profiles, online store, blog, portfolio, or any other relevant destinations. The purpose is to provide a centralized location for your audience to access important links and navigate to the destinations that are most relevant to them,Therefore, even if you don't have a website, you can still benefit from using Prettybio to promote and share your online presence effectively.",
    },
    {
      id: 4,
      question: "Can I remove Link?",
      answer:
        "Of course! At any time just log in to PrettyBio and remove/edit/add everything you want!",
    },

    {
      id: 6,
      question: "Should I put this link also in my ig post?",
      answer:
        "No! That's against IG's T&C. It ruins your followers' experience and is useless since you can not tap on it.",
    },
    {
      id: 7,
      question: "Is my data safe?",
      answer:
        "Of course Your data is safe with PrettyBio.",
    },
    {
      id: 8,
      question: "I love the product, How can i show my appreciation",
      answer:
        "Tell your friends how much you love PrettyBio! Leave us a nice review on Twitter.",
    },
  ];

  const toggleActive = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <div
      data-aos="fade-down"
      className="mx-auto w-full rounded-2xl px-5 md:px-10 lg:px-20  text-text"
    >
      <h1 className="text-center text-text text-4xl md:text-6xl lg:text-5xl mt-[40px] ">
        FAQ
      </h1>
      <p data-aos="fade-down" className="text-center mt-2 text-xl">Have a question? look here</p>
      {faqs.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => toggleActive(item.id)}
            className="flex text-text mt-5 w-full hover:text-white justify-between rounded-lg bg-btntext px-4 py-9 text-center text-lg "
          >
            <span>{item.question}</span>
            <IoIosArrowDown
              className={`${
                active === item.id ? "rotate-180 transform" : ""
              } h-6 w-6 text-text`}
            />
          </button>
          {active === item.id && (
            <div className="px-8 pt-4 pb-2 text-lg  text-text">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
