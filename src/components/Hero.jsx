// src/components/Hero.jsx
import HeroImg from "../assets/img/Hero_img.webp";

export default function Hero({ totalCost = 0, currencySymbol = "$" }) {
  // guard against NaN / undefined
  const safeTotal = Number(totalCost) || 0;

  return (
    <section className="relative min-h-screen flex items-center rounded-2xl justify-center bg-cover">
      <div className="hero bg-base-200 min-h-screen w-full">
        <div className="hero-content flex-col lg:flex-row">
          <img src={HeroImg} className="max-w-sm rounded-lg shadow-2xl" />
          <div className="relative z-10 text-center max-w-2xl px-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
              Subscriptions
            </h1>

            <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8">
              Manage all your subscriptions in one place with{" "}
              <span className="text-indigo-400 font-semibold">Subtrak</span>.
              <br />
              Stay on top of your recurring payments and never miss a due date
              again.
            </p>

            {/* Monthly Cost Card
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 w-72 mx-auto hover:scale-105 transform transition duration-300">
              <h2 className="text-3xl font-bold text-gray-900">
                {currencySymbol}
                {safeTotal.toFixed(2)}
              </h2>
              <p className="text-gray-500 mt-2">Total monthly cost</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
