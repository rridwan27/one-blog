import Banner from "../../components/Banner/Banner";
import Newsletter from "../../components/NewsLetter/NewsLetter";
import TopSixPost from "../../components/TopSixPost/TopSixPost";
import TopAuthors from "../../components/TopAuthors/TopAuthors";
import Stats from "../../components/Stats/Stats";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopSixPost />
      <TopAuthors />
      <Stats />
      <Newsletter />
    </div>
  );
};
export default Home;
