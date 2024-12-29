import img from "../../../src/assets/home/featured.jpg";
import Sheared from "../../ShearedSEction/Sheared";

import { Link } from "react-router-dom";

const Featuredsection = () => {
  return (
    <div className="my-36">
      <div className="h-[700px] bg-img2 bg-cover bg-no-repeat  bg-fixed">
        <div className="bg-black bg-opacity-65">
          <div className="pt-10">
            <Sheared
              Subtitle={"Check It Out"}
              title={"FROM OUR MENU"}
            ></Sheared>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 py-28 px-20 ">
            <div className="w-2/5">
              <img src={img} alt="" />
            </div>
            <div className="w-2/4 text-left">
              <h1 className="text-white font-bold text-2xl md:text-4xl">
                WHERE CAN I GET SOOME
              </h1>
              <p className="text-xl font-semibold my-5 text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                ratione porro ad nesciunt similique omnis, ex excepturi saepe
                dicta adipisci? Alias ipsam quo aliquid! Id, obcaecati aliquam
                optio possimus ut magni illum alias itaque perspiciatis debitis,
                corrupti, culpa architecto esse.
              </p>
              <Link className="btn font-semibold  border-b-8 border-black border-0 hover:bg-teal-500">Read More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featuredsection;
