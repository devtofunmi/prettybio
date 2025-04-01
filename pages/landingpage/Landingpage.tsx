import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { JSX } from "react";

interface Feature {
  id: string;
  title: string;
  desc: string;
  img: string;
}

interface Testimonial {
  text: string;
  author: string;
}

export default function LandingPage(): JSX.Element {
  const features: Feature[] = [
    { id: "1", title: "Custom Themes", desc: "Pick a theme or design your own", img: "/themes.png" },
    { id: "2", title: "Embed Apps", desc: "Embed your favorite apps and content", img: "/embed-apps.png" },
    { id: "3", title: "Advanced Analytics", desc: "Track clicks, engagement & revenue", img: "/stats.png" },
    { id: "4", title: "Fast & Secure", desc: "Optimized for performance", img: "/speed.png" },
    { id: "5", title: "SEO Optimized", desc: "Get discovered faster", img: "/seo-optimized.png" },
    { id: "6", title: "QR Code Generator", desc: "Share your bio with ease", img: "/qr-code.png" },
  ];

  const testimonials: Testimonial[] = [
    { text: "PrettyBio has transformed how I share my content. It's simple and effective!", author: "Xing." },
    { text: "A must-have tool for anyone looking to streamline their online presence.", author: "Josh." },
    { text: "Finally, a bio link tool that’s fast and easy to use. I love it!", author: "Phantom." },
    { text: "My followers love how easy it is to find all my links in one place!", author: "Mike." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      <Header />
      <section className="text-center px-6 py-32 mt-20 flex flex-col items-center w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight ">
          Your Bio, Your Links, One Simple Page
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create and customize your personal link hub in seconds.
        </p>
        <Link
          href="/authentication/Signup"
          className="bg-gray-900 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 text-lg"
        >
          Get Started
        </Link>
        <div  className="mt-12 w-full max-w-xl p-5 flex gap-5">
        <div>
          <Image
            src="/assets/first_girl.jpg"
            alt="Hero Image"
            width={900}
            height={800}
            className="rounded-lg shadow-md w-full h-full"
          />
        </div>
        <div className="gap-5 flex flex-col">
        <Image
            src="/assets/guy.jpg"
            alt="Hero Image"
            width={300}
            height={200}
            className="rounded-lg shadow-md w-full"
          />
          <Image
            src="/assets/second_girl.jpg"
            alt="Hero Image"
            width={200}
            height={100}
            className="rounded-lg shadow-md w-full"
          />
        </div>
        </div>
       
      </section>

      <section className="text-center py-16 bg-gray-100 w-full">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Powerful Features, Built for Growth.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {features.map(({ id, title, desc, img }) => (
            <div key={id} className="p-6 bg-white shadow-md rounded-lg border border-gray-300 text-center">
              <Image src={img} alt={title} width={100} height={100} className="mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-lg text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gain Insights, Optimize Engagement, and Drive Growth.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Monitor audience engagement, track revenue trends, and identify what drives conversions.
              Leverage real-time insights to optimize your strategy and keep your audience engaged.
            </p>
            <div className="mt-5">
              <Link
                href="/authentication/Signup"
                className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 text-lg inline-block"
              >
                Get Started for Free
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/assets/analytics.jpg"
              alt="Analytics Image"
              width={600}
              height={400}
              className="rounded-lg shadow-md h-[400px] w-full max-w-md lg:max-w-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">What Our Users Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {testimonials.map(({ text, author }, index) => (
            <div key={index} className="p-6 bg-gray-50 shadow-md rounded-lg">
              <p className="text-gray-600 italic text-lg">{text}</p>
              <p className="text-gray-800 font-semibold mt-4 text-xl">- {author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Building Your Bio Page Today</h2>
        <div className="mt-10">
          <Link href="/authentication/Signup" className="bg-yellow-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-yellow-600 text-lg ">
            Sign Up Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}




