import { useState, useEffect } from "react";
import { db } from "../db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function CreateEpisode() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");

  const [episodes, setEpisodes] = useState([]);

  async function getEpisodes() {
    const querySnapshot = await getDocs(collection(db, "episodes"));
    const newEpisodes = [];
    querySnapshot.forEach((doc) => {
      newEpisodes.push(doc);
    });
    setEpisodes(newEpisodes);
  }

  async function createEpisode() {
    try {
      await addDoc(collection(db, "episodes"), {
        title: title,
        desc: desc,
        youtube: youtube,
        facebook: facebook,
        dateCreated: new Date(),
      });
      getEpisodes();
      console.log("created episode");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getEpisodes();
  }

  async function deleteEpisode(id) {
    try {
      await deleteDoc(doc(db, "episodes", id));
      setEpisodes((oldEpisodes) =>
        oldEpisodes.filter((episode) => episode.id !== id)
      );
      console.log("episode deleted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <div className="createEpisodePage">
      <form>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="Desc">Description</label>
        <textarea
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <label htmlFor="YouTube">YouTube</label>
        <input
          type="text"
          onChange={(e) => setYoutube(e.target.value)}
          value={youtube}
        />
        <label htmlFor="Facebook">Facebook</label>
        <input
          type="text"
          onChange={(e) => setFacebook(e.target.value)}
          value={facebook}
        />
      </form>
      <button onClick={() => createEpisode()}>Create Episode</button>

      <div className="episodesListing">
        {episodes.map((episode, i) => {
          return (
            <div className="episode" key={i}>
              {episode.data().title ? <h2>{episode.data().title}</h2> : null}
              {episode.data().desc ? <p>{episode.data().desc}</p> : null}
              <div className="episodeLinks">
                {episode.data().youtube ? (
                  <a
                    href={episode.data().youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                ) : null}
                {episode.data().facebook ? (
                  <a
                    href={episode.data().facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                ) : null}
              </div>
              <button onClick={() => deleteEpisode(episode.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
