import Lottie from "lottie-react";
import animationData from "./banner.json";

const BannerRight = () => {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[800px]"
      />
    </div>
  );
};

export default BannerRight;
