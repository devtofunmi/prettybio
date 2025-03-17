import Image from "next/image";
import React from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserInput from "../components/UserInput.jsx";



export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className=" text-gray-900 px-6 py-24">
             <Header />     
      <h1 className="text-4xl font-bold text-center mb-10">Why PrettyBio?</h1>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                {[
                  { id: "themes", title: "Custom Themes", desc: "Pick a theme or design your own", img: "/themes.png" },
                  { id: "embed-apps", title: "Embed Apps", desc: "Embed your favorite apps and content", img: "/embed-apps.png" },
                  { id: "stats", title: "Advanced Analytics", desc: "Track clicks, engagement & revenue", img: "/stats.png" },
                  { id: "speed", title: "Fast & Secure", desc: "Optimized for performance", img: "/speed.png" },
                  { id: "seo-optimized", title: "SEO Optimized", desc: "Get discovered faster", img: "/seo-optimized.png" },
                  { id: "qr-code", title: "QR Code Generator", desc: "Share your bio with ease", img: "/qr-code.png" },
                  { id: "custom-links", title: "Custom Links", description: "Easily personalize your bio page with unique links and styles.", img: "/custom.png" },
                  { id: "analytics", title: "Analytics", description: "Track clicks and engagement with built-in analytics.", img: "/analytics.png" },
                  { id: "mobile-friendly", title: "Mobile Friendly", description: "Optimized for all devices, ensuring a seamless experience.", img: "/mobile.png" },

                ].map(({ id, title, desc, img }) => (
                  <div key={id} className="p-6 bg-white shadow-md rounded-lg border border-gray-300 text-center">
                    <Image src={img} alt={title} width={100} height={100} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-lg text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
    </div>
    <div>
      <h1 className="text-gray-900 text-5xl font-bold text-center ">
      Launch Your Online Presence 
      </h1>
      <h1 className="text-gray-900 mt-3  text-5xl font-bold text-center mb-10 ">
     with Confidence Today
      </h1>
      <div>
        <UserInput />
      </div>
    </div>
    <Footer />
    </div>
    
  );
}
