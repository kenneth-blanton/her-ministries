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

export default function CreateItem() {
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [isItemLoading, setIsItemLoading] = useState(false);

  const [items, setItems] = useState([]);

  async function getItems() {
    const querySnapshot = await getDocs(collection(db, "items"));
    const newItems = [];
    querySnapshot.forEach((doc) => {
      newItems.push(doc);
    });
    setItems(newItems);
  }

  useEffect(() => {
    getItems();
  }, []);

  async function createItem() {
    try {
      await addDoc(collection(db, "items"), {
        title: itemTitle,
        desc: itemDesc,
        link: itemLink,
        dateCreated: new Date(),
      }).then((docRef) => {
        setIsItemLoading(true);
        if (itemImage == null) return;
        const imageRef = ref(storage, `images/${itemImage.name + v4()}`);

        uploadBytes(imageRef, itemImage)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              await updateDoc(doc(db, "items", docRef.id), {
                image: url,
              });
            });
          })
          .then(() => {
            setIsItemLoading(false);
          });
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
    <div className="createItemPage">
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
        <label htmlFor="image">Image</label>
        <input
          type="file"
          onChange={(event) => {
            setItemImage(event.target.files[0]);
          }}
        />
      </form>
      <button onClick={() => createItem()} disabled={isItemLoading}>
        {isItemLoading ? "Uploading..." : "Create Item"}
      </button>

      <div className="itemListing">
        {items.map((item, i) => {
          return (
            <div className="item" key={i}>
              {item.data().image ? (
                <img src={item.data().image} alt={item.data().title} />
              ) : null}
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
    </div>
  );
}
