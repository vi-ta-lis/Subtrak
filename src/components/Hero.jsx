import { useState, useEffect } from "react";
import HeroImg from "../assets/img/Hero_img.webp";
import { MotionImage, MotionText } from "../components/Animation/MotionWapper";

export default function Hero() {
  const words = ["Simplified", "Organized", "Streamlined", "Managed"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center bg-base-200 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
        {/* Image */}
        <MotionImage>
          <img
            src={HeroImg}
            alt="Subscriptions overview"
            className="w-72 sm:w-80 lg:w-[380px] rounded-lg shadow-2xl"
          />
        </MotionImage>

        {/* Text */}
        <MotionText>
          <div className="text-center lg:text-left max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow mb-4">
              All Your Subscriptions,{" "}
              <span className="inline-block text-indigo-400 transition-opacity duration-500">
                {words[index]}
              </span>
            </h1>

            <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-6">
              Take control of your recurring payments with{" "}
              <span className="text-indigo-400 font-semibold">Subtrak</span>.
              <br />
              Track, manage, and stay ahead of every subscription—effortlessly
              and stress-free.
            </p>
          </div>
        </MotionText>
      </div>
    </section>
  );
}
