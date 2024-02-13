import React, { useEffect, useState } from "react";
import { db } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/episodesPage.css";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  async function getEpisodes() {
    const querySnapshot = await getDocs(collection(db, "episodes"));
    const newEpisodes = [];
    querySnapshot.forEach((doc) => {
      newEpisodes.push(doc.data());
    });
    setEpisodes(newEpisodes);
  }

  useEffect(() => {
    getEpisodes();
    console.log(episodes);

    console.log("public loaded");
  }, []);

  return (
    <div className="episodesPage">
      <h1>Podcast Episodes</h1>

      <div className="episodesListing">
        {episodes.map((episode, index) => {
          return (
            <div className="episode" key={index}>
              {episode.title ? <h2>{episode.title}</h2> : null}
              {episode.desc ? <p>{episode.desc}</p> : null}
              {episode.dateCreated ? (
                <p>{episode.dateCreated.toDate().toDateString()}</p>
              ) : null}
              <div className="episodeLinks">
                {episode.youtube ? (
                  <a
                    href={episode.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                ) : null}

                {episode.facebook ? (
                  <a
                    href={episode.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
