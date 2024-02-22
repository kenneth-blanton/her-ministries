import { useState } from "react";
import CreateEpisode from "./createEpisode";
import CreateItem from "./createItem";
import CreateEvent from "./createEvent";
import EditAbout from "./EditAbout";

export default function LoggedIn() {
  const [mode, setMode] = useState(0);

  const modes = [
    {
      header: "Episodes",
      component: <CreateEpisode />,
    },
    { header: "Items", component: <CreateItem /> },
    { header: "Events", component: <CreateEvent /> },
    { header: "About Page", component: <EditAbout /> },
  ];

  function goBack() {
    if (mode === 0) {
      setMode(modes.length - 1);
    } else {
      setMode(mode - 1);
    }
  }

  function goForward() {
    if (mode === modes.length - 1) {
      setMode(0);
    } else {
      setMode(mode + 1);
    }
  }

  return (
    <div className="loggedIn">
      <div className="modeSelector">
        <button onClick={() => goBack()}>&#10094;</button>
        <h1>{modes[mode].header}</h1>
        <button onClick={() => goForward()}>&#10095;</button>
      </div>

      {modes[mode].component}
    </div>
  );
}
