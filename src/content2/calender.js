import React from "react";
import "./calender.css";
import i1 from "./Z37HHpbqstJ99MC8_CopyofRPTours_Text+iconographyborder.png";
import i2 from "./Z37Z15bqstJ99MR4_FRP-June2024VolunteerCleanUp-Epison-14.jpeg";
import i3 from "./Z8ciGBsAHJWomGpy_CopyofMfPS_Heading+graphic+iconography-2-.png";
import i4 from "./Z37aCZbqstJ99MSB_FRP-May2024VolunteerPlanting-Epison-07.jpeg";

const events = [
  {
    date: "Thursday, April 10, 2025",
    title: "Volunteer Happy Hour",
    image: i1,
    link: "#",
  },
  {
    date: "Saturday, April 12, 2025",
    title: "Three Mile Vision Tour",
    image: i2,
    link: "#",
  },
  {
    date: "Saturday, April 26, 2025",
    title: "Environmental Justice Tour",
    image: i1,
    link: "#",
  },
  {
    date: "Saturday, May 10, 2025",
    title: "Spring Love Your Park Cleanup",
    image: i3,
    link: "#",
  },
  {
    date: "Saturday, May 17, 2025",
    title: "Three Mile Vision Tour",
    image: i4,
    link: "#",
  },
];

const Calender = () => {
  return (
    <div className="calender-wrapper">
      <div className="calendar-header">
        <a href="#" className="full-calendar-btn">
          Full Event Calendar
        </a>
      </div>
      <div className="calender-container">
        <p className="calender-title">Upcoming Events</p>
        <div className="events-list">
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-image-container">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
              </div>
              <p className="event-date">{event.date}</p>
              <h3 className="event-title">{event.title}</h3>
              <a href={event.link} className="event-details">
                Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calender;
