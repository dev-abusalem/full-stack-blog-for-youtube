import { SeconderyButton } from "../../global/Buttons";
import Conatiner from "../../global/Conatiner";
import React from "react";

const HomeContact = () => {
  return (
    <section className="py-16 bg-primary ">
      <Conatiner>
        <div>
          <div className="md:text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-semibold">
              Invite me to your restaurant. Get exposure of millions food
              lovers.
            </h1>
            <p className="max-w-4xl mt-4 mx-auto">
              Lorem dui tincidunt nunc viverra morbi et maecenas quam adipiscing
              integer amet eget blandit phasellus est natoque blandit facilisi
              eleifend.
            </p>
          </div>
          <div className="flex justify-center items-center mt-4">
            <SeconderyButton link="/contact">LET&apos;S TALK</SeconderyButton>
          </div>
        </div>
      </Conatiner>
    </section>
  );
};

export default HomeContact;
