import { useState, useEffect } from "react";
import { db } from "../db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function LoggedIn({ isLoggedIn, setIsLoggedIn }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");

  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemLink, setItemLink] = useState("");

  const [episodes, setEpisodes] = useState([]);
  const [items, setItems] = useState([]);

  async function getEpisodes() {
    const querySnapshot = await getDocs(collection(db, "episodes"));
    const newEpisodes = [];
    querySnapshot.forEach((doc) => {
      newEpisodes.push(doc);
    });
    setEpisodes(newEpisodes);
  }

  async function getItems() {
    const querySnapshot = await getDocs(collection(db, "items"));
    const newItems = [];
    querySnapshot.forEach((doc) => {
      newItems.push(doc);
    });
    setItems(newItems);
  }

  useEffect(() => {
    getEpisodes();
    getItems();
  }, []);

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

  async function createItem() {
    try {
      await addDoc(collection(db, "items"), {
        title: itemTitle,
        desc: itemDesc,
        link: itemLink,
        dateCreated: new Date(),
      });
      getItems();
      console.log("created item");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getItems();
  }

  async function deleteItem(id) {
    try {
      await deleteDoc(doc(db, "items", id));
      setItems((oldItems) => oldItems.filter((item) => item.id !== id));
      console.log("item deleted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="loggedIn">
      <h1>Create Item</h1>
      <form>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          onChange={(e) => setItemTitle(e.target.value)}
          value={itemTitle}
        />
        <label htmlFor="Desc">Description</label>
        <textarea
          type="text"
          onChange={(e) => setItemDesc(e.target.value)}
          value={itemDesc}
        />
        <label htmlFor="Link">Link</label>
        <input
          type="text"
          onChange={(e) => setItemLink(e.target.value)}
          value={itemLink}
        />
        {/* <label htmlFor="image">Image</label>
        <input type="file" /> */}
      </form>
      <button onClick={() => createItem()}>Create Item</button>

      <div className="itemListing">
        {items.map((item, i) => {
          return (
            <div className="item" key={i}>
              {item.data().title ? <h2>{item.data().title}</h2> : null}
              {item.data().desc ? <p>{item.data().desc}</p> : null}
              <div className="itemLinks">
                {item.data().link ? (
                  <a
                    href={item.data().link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                ) : null}
              </div>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          );
        })}
      </div>

      <h1>Create Podcast Episode</h1>
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
