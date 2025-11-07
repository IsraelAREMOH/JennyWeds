import { motion as Motion } from "framer-motion";
import jennys from "../assets/jennys.jpg";
import jenny1 from "../assets/jenny1.jpg";

export default function CeremonySection() {
  // Reusable fade-up animation
  const fadeUp = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  // Floating / breathing animation for images
  const floating = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: {
      opacity: 1,
      scale: [1, 1.03, 1],
      y: [0, -8, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
    whileHover: { scale: 1.07, x: -5 },
  };

  return (
    <section className="bg-white flex flex-col items-center justify-center m-6 p-6 overflow-hidden">
      {/* Ceremony */}
      <Motion.div
        className="grid md:grid-cols-2 max-w-4xl w-full items-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {/* Left - Image */}
        <Motion.div className="flex justify-center" variants={fadeUp}>
          <Motion.img
            src={jennys}
            alt="Couple"
            className="w-[280px] h-[380px] rounded-lg shadow-lg object-cover"
            variants={floating}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
          />
        </Motion.div>

        {/* Right - Ceremony Details */}
        <Motion.div
          className="flex flex-col items-center md:items-start justify-center text-center md:text-left px-4"
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#6F4E37]">
            Ceremony
          </h2>
          <div className="flex flex-col items-center md:items-center space-y-1 text-gray-700">
            <p className="text-lg font-medium">9:00 AM</p>
            <p>Miracle Assembly Church</p>
            <p>64, Boundary Road</p>
            <p>Off Airport Rd, GRA, Benin City</p>
            <Motion.a
              href="https://www.google.com/maps/dir//64+Boundary+Road,+Off+Airport+Rd,+GRA,+Benin+City"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CAF88] hover:underline font-medium mt-2"
              whileHover={{ scale: 1.05, color: "#6F4E37" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Map
            </Motion.a>
          </div>
        </Motion.div>
      </Motion.div>

      {/* Reception */}
      <Motion.div
        className="grid md:grid-cols-2 max-w-4xl w-full items-center mt-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {/* Left - Reception Details */}
        <Motion.div
          className="flex flex-col items-center md:items-start justify-center text-center md:text-left px-4 order-2 md:order-1"
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#6F4E37]">
            Reception
          </h2>
          <div className="flex flex-col items-center md:items-center space-y-1 text-gray-700">
            <p className="text-lg font-medium">1:00 PM - 10:00 PM</p>
            <p>Lioracity Event Centre</p>
            <p>1 OKO-OGBA ROAD, IRHIRHI</p>
            <p>JUNCTION, OFF AIRPORT ROAD</p>
            <Motion.a
              href="https://www.google.com/maps/dir/Lagos/LioraCity+Event+Center,+ADP+junction,+1+Oko+Ogba+Road,+by+Irhirhi+Rd,+Airport+Rd,+Benin+City+300102,+Edo/@6.5874034,3.1671608,8z/data=!4m13!4m12!1m5!1m1!1s0x103b8b2ae68280c1:0xdc9e87a367c3d9cb!2m2!1d3.3552568!2d6.6137395!1m5!1m1!1s0x1040d1a95973a125:0xf594d035422c7342!2m2!1d5.590038!2d6.29515?authuser=0&entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CAF88] hover:underline font-medium mt-2"
              whileHover={{ scale: 1.05, color: "#6F4E37" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Map
            </Motion.a>
          </div>
        </Motion.div>

        {/* Right - Image */}
        <Motion.div
          className="flex justify-center order-1 md:order-2"
          variants={fadeUp}
        >
          <Motion.img
            src={jenny1}
            alt="Couple"
            className="w-[280px] h-[380px] rounded-lg shadow-lg object-cover"
            variants={floating}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
          />
        </Motion.div>
      </Motion.div>
    </section>
  );
}
