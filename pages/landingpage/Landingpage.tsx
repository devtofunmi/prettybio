"use client";
import { Palette, BarChart3, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HomePage() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: { perView: 6, spacing: 16 },
    renderMode: "performance",
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3 } },
      "(max-width: 640px)": { slides: { perView: 1.2 } },
    },
    created(slider) {
      let timeout: NodeJS.Timeout;
      let mouseOver = false;

      function clearNextTimeout() {
        clearTimeout(timeout);
      }

      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }

      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
      });

      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);

      nextTimeout();
    },
  });

  const testimonials = [
    { quote: "PrettyBio changed how I share my links online.", avatar: "https://i.pravatar.cc/100?img=1", name: "Alice" },
    { quote: "A must-have tool for every creator.", avatar: "https://i.pravatar.cc/100?img=2", name: "Ben" },
    { quote: "My bio page finally looks the way I want.", avatar: "https://i.pravatar.cc/100?img=3", name: "Clara" },
    { quote: "Analytics gave me real insight into my traffic.", avatar: "https://i.pravatar.cc/100?img=4", name: "David" },
    { quote: "Love the themes and customization options!", avatar: "https://i.pravatar.cc/100?img=5", name: "Ella" },
    { quote: "Simple, clean, and effective.", avatar: "https://i.pravatar.cc/100?img=6", name: "Frank" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-x-hidden bg-white text-black"
    >
      <nav className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-md">
        <Header />
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center pt-32 px-4 bg-gradient-to-br from-purple-100 to-blue-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Your Bio, Your Links, One Simple Page
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-700">
            Build a stunning, customizable bio page in minutes. Share all your links with style.
          </p>
          <Link href="/authentication/Signup" className="bg-gray-900 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 text-lg">
            Get Started
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12"
        >
          <Image src="/assets/hero.png" alt="PrettyBio UI" width={500} height={500} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Why PrettyBio?</h3>
          <p className="mb-12 text-gray-600">
            Packed with features designed for creators, brands and hustlers.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            {[{
              icon: <Palette className="w-5 h-5" />,
              title: "Custom Themes",
              text: "Personalize your bio page with beautiful themes and styles that reflect you.",
              bg: "bg-purple-100 text-purple-700"
            }, {
              icon: <BarChart3 className="w-5 h-5" />,
              title: "Analytics",
              text: "Track total views, clicks and discover what links your audience loves.",
              bg: "bg-blue-100 text-blue-700"
            }, {
              icon: <Share2 className="w-5 h-5" />,
              title: "Social Integrations",
              text: "Connect all your socials in one place and make it easy for people to reach you.",
              bg: "bg-green-100 text-green-700"
            }].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className={`flex items-center justify-center w-12 h-12 ${item.bg} rounded-full mb-4 mx-auto`}>
                  {item.icon}
                </div>
                <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Engagement Section */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl text-center mx-auto flex flex-col lg:flex-row items-center justify-between gap-5"
        >
          <div>
          <h2 className="text-xl hidden md:flex font-bold text-gray-900">
          “Track clicks, views, and engagement  all from one powerful dashboard.”</h2>
          </div>
          
          <div className="hidden md:flex">
            <Image src="/assets/features.png" alt="Analytics Image" width={500} height={500} />
          </div>

          <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
               See what works. Fix what doesn’t.
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Dive into real time analytics that show you what your audience loves.
                  Track link clicks, popular content, and social interactions all from one intuitive dashboard.
                </p>
            <div className="mt-5">
              <Link href="/authentication/Signup" className="bg-gray-900 w-full text-white px-6 py-3 text-center rounded-full shadow-lg hover:bg-gray-800 text-lg inline-block">
              Start Tracking for Free
              </Link>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-0 bg-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h3 className="text-3xl font-bold mb-10 text-gray-900">Loved by creators</h3>
          <div ref={sliderRef} className="keen-slider gap-2 md:gap-0">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="keen-slider__slide bg-white border border-gray-200 p-6 rounded-xl shadow flex flex-col items-center text-center"
              >
                <Image src={t.avatar} alt={t.name} width={60} height={60} className="rounded-full mb-4" />
                <p className="italic text-gray-700">“{t.quote}”</p>
                <span className="block mt-2 font-semibold text-gray-900">{t.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Building Your Bio Page Today</h2>
        <div className="mt-10">
          <Link href="/authentication/Signup" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/authentication/Signup">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
            Try PrettyBio
          </button>
        </Link>
      </motion.div>

      <Footer />
    </motion.div>
  );
}






