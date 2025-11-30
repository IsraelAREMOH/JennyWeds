import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SaveTheDateButton from "../Components/SaveTheDateButton";

const Footer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    const weddingDate = new Date("2025-11-29T16:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
        });
        setEventPassed(true); // Mark event as passed
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-[#9CAF88] text-white py-12 px-4 flex pb-4 flex-col items-center space-y-2 overflow-visible">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl text-center">
        {/* Countdown Section */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-lg sm:text-xl mb-4">
            {eventPassed ? "Our Special Day" : "Countdown to Our Day"}
          </h2>

          {/* AFTER EVENT Premium Banner */}
          {eventPassed ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30"
            >
              <p
                className="text-[#F5F5DC] font-medium text-4xl sm:text-2xl"
                style={{ fontFamily: "'Allura', cursive" }}
              >
                We’re Married!
              </p>
              <p className="text-white mt-3 sm:text-lg font-small">
                Thank you for being part of our journey.
              </p>
            </motion.div>
          ) : (
            // BEFORE EVENT Countdown
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-3 gap-3 text-[#6F4E37] text-lg sm:text-2xl font-bold"
            >
              <div>
                {timeLeft.days ?? 0}
                <span className="block text-xs sm:text-sm text-gray-100">
                  Days
                </span>
              </div>
              <div>
                {timeLeft.hours ?? 0}
                <span className="block text-xs sm:text-sm text-gray-100">
                  Hours
                </span>
              </div>
              <div>
                {timeLeft.minutes ?? 0}
                <span className="block text-xs sm:text-sm text-gray-100">
                  Minutes
                </span>
              </div>
            </motion.div>
          )}

          {/* Hide button after event */}
          {!eventPassed && (
            <SaveTheDateButton
              label="Save the Date"
              bgColor="bg-[#6F4E37]"
              hoverColor="hover:bg-[#F1D9D2]"
              textColor="text-wite"
              startDate="2025-11-29T12:00:00+01:00"
              endDate="2025-11-29T21:00:00+01:00"
            />
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center justify-center space-y-2 text-sm sm:text-base font-medium">
          <p>Questions?</p>
          <p>Gift: +2349030135489</p>
          <p>Kelvin: +2348060947379</p>
          <p>We’d love to hear from you ❤️</p>
        </div>

        {/* Venue */}
        <div className="flex flex-col items-center text-sm sm:text-base">
          <h2 className="font-semibold mb-2 text-lg">Reception</h2>
          <p className="font-bold text-white">Lioracity Event Centre</p>
          <p>1 OKO-OGBA ROAD, IRHIRHI</p>
          <p>JUNCTION, OFF AIRPORT ROAD</p>
          <p>BENIN CITY, EDO STATE</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full sm:w-3/4 h-px bg-white/40 my-4"></div>

      {/* Hashtag */}
      <div className="flex flex-col items-center text-center pb-6 sm:pb-10">
        <p className="font-medium mb-1 text-sm sm:text-base">Share</p>
        <p
          className="text-[#F5F5DC] font-extrabold text-3xl sm:text-4xl"
          style={{ fontFamily: "'Allura', cursive" }}
        >
          #JetsdowntheAisle 💍
        </p>
      </div>
    </footer>
  );
};

export default Footer;
