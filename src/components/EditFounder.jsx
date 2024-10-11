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
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  const [episodes, setEpisodes] = useState([]);

  async function getEpisodes() {
    const querySnapshot = await getDocs(collection(db, "founder"));
    const newEpisodes = [];
    querySnapshot.forEach((doc) => {
      newEpisodes.push(doc);
    });
    setEpisodes(newEpisodes);
  }

  async function createEpisode() {
    try {
      await addDoc(collection(db, "founder"), {
        header: title,
        content: desc,
        button: { text: text, link: link },
      });
      getEpisodes();
      console.log("created episode");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function deleteEpisode(id) {
    try {
      await deleteDoc(doc(db, "founder", id)); // corrected collection name
      setEpisodes((oldEpisodes) =>
        oldEpisodes.filter((episode) => episode.id !== id)
      );
      console.log("episode deleted");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <div className="createEpisodePage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createEpisode();
        }}
      >
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
        <label htmlFor="Text">Button Text</label>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <label htmlFor="Link">Link</label>
        <input
          type="text"
          onChange={(e) => setLink(e.target.value)}
          value={link}
        />
      </form>
      <button onClick={createEpisode}>Create Episode</button>

      <div className="episodesListing">
        {episodes.map((episode) => (
          <div className="episode" key={episode.id}>
            {episode.data().header ? <h2>{episode.data().header}</h2> : null}
            {episode.data().content ? <p>{episode.data().content}</p> : null}
            <div className="episodeLinks">
              {/* Safely check if `button` exists */}
              {episode.data().button &&
              episode.data().button.text &&
              episode.data().button.link ? (
                <>
                  <a
                    href={episode.data().button.link} // Link URL
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {episode.data().button.text}
                  </a>
                </>
              ) : null}
            </div>
            <button onClick={() => deleteEpisode(episode.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
