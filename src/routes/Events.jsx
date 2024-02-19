import React, { useState, useEffect } from "react";
import { db } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/events.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  async function getEvents() {
    const querySnapshot = await getDocs(collection(db, "events"));
    const newEvents = [];
    querySnapshot.forEach((doc) => {
      newEvents.push(doc.data());
    });
    setEvents(newEvents);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="eventsPage">
      <h1>Events</h1>

      <div className="eventListing">
        {events.length > 0 ? (
          events.map((event, index) => {
            return (
              <div className="event" key={index}>
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : null}
                {event.title ? <h2>{event.title}</h2> : null}
                {event.desc ? <p>{event.desc}</p> : null}
                <div className="eventLinks">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Event Link
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Events</h1>
        )}
      </div>
    </div>
  );
}
