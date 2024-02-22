import { useEffect, useState } from "react";
import outlineBG from "../images/i9xUri01.svg";
import { db } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function VisionSlide() {
  const [vision1, setVision1] = useState("");
  const [vision2, setVision2] = useState("");
  const [vision3, setVision3] = useState("");

  useEffect(() => {
    async function getAbout() {
      const querySnapshot = await getDocs(collection(db, "about"));
      querySnapshot.forEach((doc) => {
        setVision1(doc.data().vision1);
        setVision2(doc.data().vision2);
        setVision3(doc.data().vision3);
      });
    }
    getAbout();
  }, []);

  return (
    <>
      <img src={outlineBG} alt="bg" id="together" />
      <div className="aboutDesc">
        <p>{vision1}</p>
        <p>{vision2}</p>
        <p>{vision3}</p>
      </div>
    </>
  );
}
