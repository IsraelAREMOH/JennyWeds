import jenny1 from "../assets/jenny1.jpg";
import { Link } from "react-router-dom";

const StoryLink = () => {
  return (
    <section className="bg-gray-100 py-12">
      {/* Top Section - Our Story */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-serif mb-6">
          See how it all started
        </h2>
        <div className="flex items-center justify-center space-x-6">
          <span className="hidden md:block w-24 border-t border-gray-400"></span>

          <Link
            to="/OurStory"
            className="inline-block bg-[#9CAF88] text-white px-6 py-2 font-medium hover:bg-gray-800 transition rounded"
          >
            Our Story
          </Link>
          <span className="hidden md:block w-24 border-t border-gray-400"></span>
        </div>
      </div>

      {/* Bottom Section - RSVP */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Background Image */}
        <img
          src={jenny1} // replace with your image import
          alt="Couple"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 bg-black/30">
          <p className="text-lg md:text-xl mb-2">
            Welcome to our wedding hub! You'II find everything you need to join
            the celebration here.
          </p>
          <h3 className="text-3xl md:text-5xl font-serif mb-6">
            We hope you can make it!
          </h3>
          <Link
            to="/OurStory"
            className="inline-block bg-[#9CAF88] text-white px-6 py-2 font-medium hover:bg-gray-800 transition rounded"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
};
export default StoryLink;
