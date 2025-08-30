// src/components/Hero.jsx
import { useState, useEffect } from "react";
import HeroImg from "../assets/img/Hero_img.webp";

export default function Hero() {
  // guard against NaN / undefined
  // const safeTotal = Number(totalCost) || 0;

  // rotating words
  const words = ["Simplified", "Organized", "Streamlined", "Managed"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // change word every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center rounded-2xl justify-center bg-cover">
      <div className="hero bg-base-200 min-h-screen w-full">
        <div className="hero-content flex-col lg:flex-row">
          {/* Image */}
          <img
            src={HeroImg}
            alt="Subscriptions overview"
            className="max-w-sm rounded-lg shadow-2xl"
          />

          {/* Text */}
          <div className="relative z-10 text-center max-w-2xl px-6">
            {/* Dynamic Heading */}
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4 transition-all duration-500">
              All Your Subscriptions, {words[index]}
            </h1>

            <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8">
              Take control of your recurring payments with{" "}
              <span className="text-indigo-400 font-semibold">Subtrak</span>.
              <br />
              Track, manage, and stay ahead of every subscription—effortlessly
              and stress-free.
            </p>

            {/* Monthly Cost Card (optional, uncomment if you want it shown) */}
            {/* 
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 w-72 mx-auto hover:scale-105 transform transition duration-300">
              <h2 className="text-3xl font-bold text-gray-900">
                {currencySymbol}
                {safeTotal.toFixed(2)}
              </h2>
              <p className="text-gray-500 mt-2">Total monthly cost</p>
            </div> 
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
