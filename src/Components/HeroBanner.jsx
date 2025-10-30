import { motion as Motion } from "framer-motion";
import jenny from "../assets/jenny.jpg";

const HeroBanner = () => {
  return (
    <div className=" text-gray-800">
      {/* Hero Section */}
      <section
        className="
          relative flex flex-col items-center justify-center
          min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-[120vh]
          bg-cover bg-center px-4
        "
        style={{ backgroundImage: `url(${jenny})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main animated text */}
        <Motion.div
          className="relative text-center text-white w-full max-w-2xl p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Motion.p
            className="mt-2 mb-4 text-base sm:text-lg md:text-xl lg:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            We're Getting Married
          </Motion.p>

          <Motion.h1
            className="text-4xl sm:text-5xl md:text-6xl text-white"
            style={{ fontFamily: "'Allura', cursive" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Jennifer & Aisosa
          </Motion.h1>

          <Motion.p
            className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            November 29, 2025 | Benin, Nigeria
          </Motion.p>

          <Motion.button
            className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-[#9CAF88] text-[#F8F5DC] rounded-2xl shadow-lg hover:bg-[#AFCF9E] transition text-sm sm:text-base"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Save the Date
          </Motion.button>
        </Motion.div>

        {/* Hashtag bottom-left */}
        <Motion.div
          className="absolute top-6 right-4 sm:right-8 text-[#F5F5DC] text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: "'Allura', cursive" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          #JetsdowntheAisle
        </Motion.div>
      </section>
    </div>
  );
};

export default HeroBanner;
