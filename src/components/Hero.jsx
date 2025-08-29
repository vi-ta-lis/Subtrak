import HeroImg from "../assets/img/Hero_img.webp";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center rounded-20xl justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          Subscriptions
        </h1>

        {/* Subtitle */}
        <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8">
          Manage all your subscriptions in one place with{" "}
          <span className="text-indigo-400 font-semibold">Subtrak</span>. <br />
          Stay on top of your recurring payments and never miss a due date
          again.
        </p>

        {/* Monthly Cost Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 w-72 mx-auto hover:scale-105 transform transition duration-300">
          <h2 className="text-3xl font-bold text-gray-900">$63.94</h2>
          <p className="text-gray-500 mt-2">Total monthly cost</p>
        </div>
      </div>
    </section>
  );
}
