import { useState, useEffect } from "react";
import { db, storage } from "../db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function CreateEvent() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [isEventLoading, setEventLoading] = useState(false);

  const [events, setEvents] = useState([]);

  async function getEvents() {
    const querySnapshot = await getDocs(collection(db, "events"));
    const newEvents = [];
    querySnapshot.forEach((doc) => {
      newEvents.push(doc);
    });
    setEvents(newEvents);
  }

  async function createEvent() {
    try {
      await addDoc(collection(db, "events"), {
        title: eventTitle,
        desc: eventDesc,
        link: eventLink,
        dateCreated: new Date(),
      }).then((docRef) => {
        setEventLoading(true);
        if (eventImage == null) return;
        const imageRef = ref(storage, `images/${eventImage.name + v4()}`);

        uploadBytes(imageRef, eventImage)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              await updateDoc(doc(db, "events", docRef.id), {
                image: url,
              });
            });
          })
          .then(() => {
            setEventLoading(false);
          });
      });
      getEvents();
      console.log("created event");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getEvents();
  }

  async function deleteEvent(id) {
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents((oldEvents) => oldEvents.filter((event) => event.id !== id));
      console.log("event deleted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="createEventPage">
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          onChange={(e) => setEventTitle(e.target.value)}
          value={eventTitle}
        />
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          onChange={(e) => setEventDesc(e.target.value)}
          value={eventDesc}
        />
        <label htmlFor="link">Link</label>
        <input
          type="text"
          onChange={(e) => setEventLink(e.target.value)}
          value={eventLink}
        />
        <br />
        <input
          type="file"
          onChange={(event) => {
            setEventImage(event.target.files[0]);
          }}
        />
      </form>
      <button onClick={() => createEvent()} disabled={isEventLoading}>
        {isEventLoading ? "Loading..." : "Create Event"}
      </button>

      <div className="eventListing">
        {events.map((event, index) => {
          return (
            <div className="event" key={index}>
              {event.data().image ? (
                <img src={event.data().image} alt={event.data().title} />
              ) : null}
              {event.data().title ? <h2>{event.data().title}</h2> : null}
              {event.data().desc ? <p>{event.data().desc}</p> : null}
              <div className="eventLinks">
                {event.data().link ? (
                  <a
                    href={event.data().link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Event Link
                  </a>
                ) : null}
              </div>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
