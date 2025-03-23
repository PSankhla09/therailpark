import React, { useEffect, useState } from "react";
import VisitContent from "../content/vis";
import "./visit.css";
import Calender from "../content2/calender";
import VisitToggle from "../content3/VisitToggle";
import Email from "../content2/email";
import Transport from "../content3/transport";
import Phase from "../content3/phase";
import TopRibbon from "../content/topRibbon";

function Visit() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18); // Set initial mode based on time
  }, []);

  const toggleMode = () => {
    setIsDay((prevMode) => !prevMode); // Toggle day/night mode
  };

  return (
    <div className={`visit-page ${isDay ? "day-mode" : "night-mode"}`}>
      <TopRibbon />
      <Phase />
      <VisitToggle isDay={isDay} toggleMode={toggleMode} />
      <VisitContent />
      <Transport />
      <Calender />

      <Email />
    </div>
  );
}

export default Visit;
