import { images } from "../constants/index";

const AttireSection = ({ title, subtitle, description, imageList }) => {
  return (
    <section className="relative py-12 px-2 bg-white overflow-hidden">
      {/* Floral Decorations */}
      <div
        className="absolute top-0 left-0 w-40 h-40 bg-contain bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${images.jenny1})` }}
      />
      <div
        className="absolute bottom-0 right-0 w-40 h-40 bg-contain bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${images.jenny3})` }}
      />

      {/* Text */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{title}</h2>
        {subtitle && (
          <h3 className="text-lg italic text-gray-600 mb-2">{subtitle}</h3>
        )}
        {description && (
          <p className="text-gray-600 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Image Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {imageList.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={src}
              alt={`${title}-${index + 1}`}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttireSection;
