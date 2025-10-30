import jenny2 from "../assets/jenny2.jpg";
import jenny3 from "../assets/jenny3.jpg";

const OurStory = () => {
  return (
    <section className="bg-gray-100 text-gray-900">
      {/* Top Section - How it all began */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-6">
          How it all began
        </h2>
        <img
          src={jenny3}
          alt="How it all began"
          className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Quotes Section */}
      <div className="max-w-5xl mx-auto grid grid-rows-1 px-6 md:px-16 py-16">
        {/* First Quote - Top Left */}
        <div className="justify-self-start text-left max-w-xl">
          <blockquote className="text-xl md:text-2xl italic font-light">
            “I saw her across a reception hall and I couldn’t look away until I
            had the guts to talk to her.”
            <footer className="mt-4 text-sm text-[#6F4E37]">— Aisosa</footer>
          </blockquote>
        </div>

        {/* Second Quote - Bottom Right */}
        <div className="justify-self-end text-right max-w-xl mt-4 md:mt-24">
          <blockquote className="text-xl md:text-2xl italic font-light">
            “We caught eye contact at one point and I was mesmerized by that
            addicting smile of his.”
            <footer className="mt-4 text-sm text-[#6F4E37]">— Jennifer</footer>
          </blockquote>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w bg-white mx-auto grid md:grid-cols-2 gap-8 items-center px-6 md:px-16 py-16">
        {/* Image */}
        <div className="relative flex justify-center items-center overflow-hidden rounded-2xl shadow-md">
          <img
            src={jenny2}
            alt="Jennifer & Aisosa"
            className="w-full h-[500px] object-cover object-[50%_25%] rounded-2xl shadow-md"
          />
          <h2 className="absolute top-4 left-4 text-white text-2xl font-semibold drop-shadow-lg">
            Jennifer & Aisosa
          </h2>
        </div>

        {/* Text */}
        <div>
          <p className="text-sm text-[#A52A2A]">—</p>
          <p className="mt-4  text-lg leading-relaxed">
            It all began the day after my best friend’s wedding in 2020. A group
            of friends gathered, laughter filling the air, and there was Aisosa,
            warm, kind, and offering to get us food. A small gesture, but one
            that quietly planted a seed. He found a way to get my number (to
            this day, I’m not sure how!) and soon we were exchanging light
            conversations, the kind that linger but don’t yet reveal their full
            meaning. He let me know he was interested, but at the time, I wasn’t
            available. So, we remained friends, meeting occasionally, sharing
            moments in groups, never knowing what was waiting for us ahead. Then
            came 2021. Somehow, he knew the timing was right. His calls came
            more often, his visits became warmer, and his care felt deeper. He
            was patient, intentional, and persistent in the most endearing way.
            After graduation, he asked me again to be his girlfriend and this
            time, I said yes. From that moment, we’ve been building something
            beautiful, four years of laughter, growth, and love, counting
            joyfully towards forever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
