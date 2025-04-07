import React from "react";
import Parallax from "../animations/Parallax";
import ActualParallax from "../animations/ActualParallax"; // Import ActualParallax
import parkData from "../content/parkData";
import "./homecontent.css";

const HomeContent = () => {
  return (
    <ActualParallax speed={0.2}>
      <div className="homepage">
        {/* Section 1 */}
        <div className="sections section-1">
          <ActualParallax speed={0.1}>
            <div className="im1">
              <Parallax {...parkData[2]} />
            </div>
          </ActualParallax>
          <div className="txt-con">
            <p className="one">
              The <br />
              Viaduct
            </p>
            <p className="two">Chinatown → Northern Liberties</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="sections section-2">
          <ActualParallax speed={0.1}>
            <div className="im2">
              <Parallax {...parkData[3]} />
            </div>
          </ActualParallax>
          <div className="txt-con-two">
            <p className="one">The Cut</p>
            <p className="two">Callowhill → Francisville</p>
          </div>
        </div>

        {/* Text Section */}
        <div className="meow">
          <p className="omg">
            Our full vision for the Rail Park is to create a three-mile greenway
            with three sections: The Viaduct, The Cut, and The Tunnel. It will
            reach from Northern Liberties to Fairmount Park, with pathways and
            gathering spaces that will serve pedestrians, bicyclists, neighbors,
            and visitors alike. <br />
            <br />
            <a href="/visit">Learn more about the full vision</a>
          </p>
        </div>

        {/* Section 3 */}
        <div className="sections section-3">
          <ActualParallax speed={0.1}>
            <div className="im3">
              <Parallax {...parkData[4]} />
            </div>
          </ActualParallax>
          <div className="txt-con-three">
            <p className="one">
              The <br />
              Tunnel
            </p>
            <p className="two">Fairmount → Brewerytown</p>
          </div>
        </div>
      </div>
    </ActualParallax>
  );
};

export default HomeContent;
