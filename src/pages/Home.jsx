import CeremonySection from "../Components/ceremonyDate";
import HeroBanner from "../Components/HeroBanner";
import StoryLink from "../Components/storyLink";

const Home = () => {
  return (
    <div className="flex flex-col gap-0">
      <HeroBanner />
      <CeremonySection />
      <StoryLink />
    </div>
  );
};

export default Home;
