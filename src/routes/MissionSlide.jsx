import { useEffect, useState } from "react";
import outlineBG from "../images/i9xUri01.svg";
import "../App.css";
import { db } from "../db/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MissionSlide() {
  const [mission1, setMission1] = useState("");
  const [mission2, setMission2] = useState("");
  const [mission3, setMission3] = useState("");

  useEffect(() => {
    async function getAbout() {
      const querySnapshot = await getDocs(collection(db, "about"));
      querySnapshot.forEach((doc) => {
        setMission1(doc.data().mission1);
        setMission2(doc.data().mission2);
        setMission3(doc.data().mission3);
      });
    }
    getAbout();
  }, []);

  return (
    <>
      <img src={outlineBG} alt="bg" id="together" />
      <div className="aboutDesc">
        <p>{mission1}</p>
        <p>{mission2}</p>
        <p>{mission3}</p>
      </div>
    </>
  );
}
