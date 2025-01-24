import img from "../../../src/assets/home/featured.jpg";
import Sheared from "../../ShearedSEction/Sheared";

import { Link } from "react-router-dom";

const Featuredsection = () => {
  return (
    <div className="my-36">
      <div className="h-[700px] bg-img2 bg-cover bg-no-repeat  bg-fixed">
        <div className="bg-black h-full bg-opacity-65">
          <div className="pt-10">
            <Sheared
              Subtitle={"Check It Out"}
              title={"FROM OUR MENU"}
            ></Sheared>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 py-10 px-20 ">
            <div className="w-2/5">
              <img src={img} alt="" />
            </div>
            <div className="w-2/4 text-left">
              <h1 className="text-white font-bold text-2xl md:text-4xl">
                WHERE CAN I GET SOOME
              </h1>
              <p className="text-xl my-5 text-white">
              Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featuredsection;
