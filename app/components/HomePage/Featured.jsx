import React from "react";
import SliderSlide from "./Slider/SliderSlide";
import Conatiner from "../../global/Conatiner";

const Featured = () => {
  return (
    <section className="lg:py-20 md:py-12 py-0 mt-6">
      <Conatiner>
        <div>
          <h3 className="text-center font-semibold uppercase text-xs tracking-widest">
            As Featured in
          </h3>
          <div>
            <SliderSlide />
          </div>
        </div>
      </Conatiner>
    </section>
  );
};

export default Featured;
