import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../db/firebase"; // Make sure to import your Firestore config

export default function FounderInfo() {
  const [episodes, setEpisodes] = useState([]);

  // Fetch episodes from Firestore
  useEffect(() => {
    async function fetchEpisodes() {
      const querySnapshot = await getDocs(collection(db, "founder"));
      const fetchedEpisodes = [];
      querySnapshot.forEach((doc) => {
        fetchedEpisodes.push({ id: doc.id, ...doc.data() });
      });
      setEpisodes(fetchedEpisodes);
    }

    fetchEpisodes();
  }, []);

  return (
    <div id="founderSection">
      {episodes.length > 0 ? (
        episodes.map((episode, index) => (
          <div key={episode.id}>
            <div>
              {index === 0 && <h2>Dianna Williams McBride</h2>}
              <h2>{episode.header}</h2>
              <p>{episode.content}</p>

              {episode.button && episode.button.text && episode.button.link ? (
                <Link to={episode.button.link}>{episode.button.text}</Link>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <p>Loading episodes...</p>
      )}
    </div>
  );
}
