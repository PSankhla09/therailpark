import React from "react";
import Parallax from "../animations/Parallax";
import parkData from "../content/parkData";
import "./homecontent.css";

const HomeContent = () => {
  return (
    <div className="homepage">
      <div className="sections section-1">
        <Parallax {...parkData[2]} />
        <div className="txt-con">
          <p className="one">
            The <br />
            Viaduct
          </p>
          <p className="two">Chinatown → Northern Liberties</p>
        </div>
      </div>

      <div className="sections section-2">
        <Parallax {...parkData[3]} />
        <div className="txt-con-two">
          <p className="one">The Cut</p>
          <p className="two">Callowhill → Francisville</p>
        </div>
      </div>

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
      <div className="sections section-3">
        <Parallax {...parkData[4]} />
        <div className="txt-con-three">
          <p className="one">
            The <br />
            Tunnel
          </p>
          <p className="two">Fairmount → Brewerytown</p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
