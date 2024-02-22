import { useState, useEffect, useRef } from "react";
import { db } from "../db/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import "../styles/EditAbout.css";

export default function EditAbout() {
  const mission1Ref = useRef();
  const mission2Ref = useRef();
  const mission3Ref = useRef();
  const vision1Ref = useRef();
  const vision2Ref = useRef();
  const vision3Ref = useRef();

  const [mission1, setMission1] = useState("");
  const [mission2, setMission2] = useState("");
  const [mission3, setMission3] = useState("");

  const [vision1, setVision1] = useState("");
  const [vision2, setVision2] = useState("");
  const [vision3, setVision3] = useState("");

  const [docId, setDocId] = useState("");

  useEffect(() => {
    async function getAbout() {
      const querySnapshot = await getDocs(collection(db, "about"));
      querySnapshot.forEach((doc) => {
        setMission1(doc.data().mission1);
        setMission2(doc.data().mission2);
        setMission3(doc.data().mission3);
        setVision1(doc.data().vision1);
        setVision2(doc.data().vision2);
        setVision3(doc.data().vision3);

        setDocId(doc.id);
      });
    }
    getAbout();
  }, []);

  useEffect(() => {
    function autoResize() {
      const mission1Area = mission1Ref.current;
      const mission2Area = mission2Ref.current;
      const mission3Area = mission3Ref.current;
      const vision1Area = vision1Ref.current;
      const vision2Area = vision2Ref.current;
      const vision3Area = vision3Ref.current;

      mission1Area.style.height = "auto";
      mission1Area.style.height = mission1Area.scrollHeight + "px";
      mission2Area.style.height = "auto";
      mission2Area.style.height = mission2Area.scrollHeight + "px";
      mission3Area.style.height = "auto";
      mission3Area.style.height = mission3Area.scrollHeight + "px";
      vision1Area.style.height = "auto";
      vision1Area.style.height = vision1Area.scrollHeight + "px";
      vision2Area.style.height = "auto";
      vision2Area.style.height = vision2Area.scrollHeight + "px";
      vision3Area.style.height = "auto";
      vision3Area.style.height = vision3Area.scrollHeight + "px";
    }

    const mission1Area = mission1Ref.current;
    const mission2Area = mission2Ref.current;
    const mission3Area = mission3Ref.current;
    const vision1Area = vision1Ref.current;
    const vision2Area = vision2Ref.current;
    const vision3Area = vision3Ref.current;
    mission1Area.addEventListener("click", autoResize);
    mission2Area.addEventListener("click", autoResize);
    mission3Area.addEventListener("click", autoResize);
    vision1Area.addEventListener("click", autoResize);
    vision2Area.addEventListener("click", autoResize);
    vision3Area.addEventListener("click", autoResize);

    autoResize();

    // Cleanup function
    return () => {
      mission1Area.removeEventListener("click", autoResize);
      mission2Area.removeEventListener("click", autoResize);
      mission3Area.removeEventListener("click", autoResize);
      vision1Area.removeEventListener("click", autoResize);
      vision2Area.removeEventListener("click", autoResize);
      vision3Area.removeEventListener("click", autoResize);
    };
  }, []);

  async function handleSubmit() {
    const aboutRef = doc(db, "about", docId);
    await updateDoc(aboutRef, {
      mission1: mission1,
      mission2: mission2,
      mission3: mission3,
      vision1: vision1,
      vision2: vision2,
      vision3: vision3,
    });
  }

  return (
    <div className="editAbout">
      <h1>Mission and Vision</h1>
      <form>
        <label>Mission 1</label>
        <textarea
          type="text"
          value={mission1}
          onChange={(e) => setMission1(e.target.value)}
          ref={mission1Ref}
        />
        <label htmlFor="">Mission 2</label>
        <textarea
          type="text"
          value={mission2}
          onChange={(e) => setMission2(e.target.value)}
          ref={mission2Ref}
        />
        <label htmlFor="">Mission 3</label>
        <textarea
          type="text"
          value={mission3}
          onChange={(e) => setMission3(e.target.value)}
          ref={mission3Ref}
        />
        <label>Vision 1</label>
        <textarea
          type="text"
          value={vision1}
          onChange={(e) => setVision1(e.target.value)}
          ref={vision1Ref}
        />
        <label htmlFor="">Vision 2</label>
        <textarea
          type="text"
          value={vision2}
          onChange={(e) => setVision2(e.target.value)}
          ref={vision2Ref}
        />
        <label htmlFor="">Vision 3</label>
        <textarea
          type="text"
          value={vision3}
          onChange={(e) => setVision3(e.target.value)}
          ref={vision3Ref}
        />
      </form>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}
