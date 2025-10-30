import { images } from "../constants/index";

const StylePage = () => {
  return (
    <div className="min-h-screen bg-center flex flex-col items-center justify-center p-6 text-gray-100">
      {/* Header Section */}
      <div className="text-center mb-20 animate-fade-in">
        <h1
          style={{ fontFamily: "'Allura', cursive" }}
          className="text-8xl font-extrabold text-gray-700 mb-8 drop-shadow-2xl"
        >
          Style Ideas
        </h1>
        <p className="text-lg max-w-4xl mx-auto leading-relaxed text-gray-600 bg-white bg-opacity-85 p-6 rounded-xl shadow-xl">
          Need outfit inspiration? The key is sophistication, glamour, and
          classic formality, Timeless, Elegant, refined. Remember to add your
          own personal flair!
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl w-full bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl mb-20 animate-fade-in-up border-4 border-white">
        <h2 className="text-2xl font-semibold mb-10 text-gray-600">
          Black-Tie Attire
        </h2>
        <p className="text-2xl italic mb-8 text-gray-600">
          A black-tie event is a formal evening occasion. Now it's your time to
          style!
        </p>
        <ul className="list-disc list-inside text-lg mb-10 space-y-5 text-gray-600">
          <li>
            Ladies: Evening gown – Floor-length dress in elegant fabrics (silk,
            satin, chiffon, velvet). Heels: Closed or strappy heels that
            complement the gown. Jewelry: Statement pieces or elegant
            diamonds/pearls. Evening clutch: Small, elegant bag Chic formal
            jumpsuits or ankle-length gowns
          </li>
          <li>
            Men: Tuxedo (dinner jacket) – Usually black or midnight blue,
            single-breasted with satin or grosgrain lapels.Black bow tie Formal
            trousers – Match the jacket, Black formal shoes – Patent leather
            Oxfords or opera pumps. Pocket square Velvet dinner jackets as long
            as they look formal.
          </li>
        </ul>
        <p className="text-lg text-gray-700">
          Remember to be more elegant. Don't hold back the semi-formal attire to
          show out.
        </p>
      </div>

      {/* ✨ Elegant Masonry Gallery */}
      <div className="relative bg-[#fffdfc] py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-700 tracking-tight mb-3">
            Timeless Elegance
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A curated showcase of graceful designs
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 max-w-7xl mx-auto px-4 space-y-5">
          {images.map((item, i) => (
            <div
              key={i}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out"
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Glass layer for subtle luxury effect */}
              <div className="absolute inset-0 backdrop-blur-[1px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylePage;
