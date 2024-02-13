import React, { useEffect, useState } from "react";
import { db } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/store.css";

export default function Store() {
  const [items, setItems] = useState([]);

  async function getItems() {
    const querySnapshot = await getDocs(collection(db, "items"));
    const newItems = [];
    querySnapshot.forEach((doc) => {
      newItems.push(doc.data());
    });
    setItems(newItems);
  }

  useEffect(() => {
    getItems();

    console.log("public loaded");
  }, []);

  return (
    <div className="storePage">
      <h1>Store</h1>
      <div className="itemListing">
        {items.map((item, index) => {
          return (
            <div className="item" key={index}>
              {item.title ? <h2>{item.title}</h2> : null}
              {item.desc ? <p>{item.desc}</p> : null}
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Store Link
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
