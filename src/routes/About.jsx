import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location);

  const path = location.pathname; // Get the current URL path
  const segments = path.split("/"); // Split the path into segments
  const lastSegment = segments.pop();
  //   console.log(lastSegment); // Get the last segment

  function getInitialIndex() {
    switch (lastSegment) {
      case "mission":
        return 0;
      case "vision":
        return 1;
      case "ministry":
        return 2;
      case "founder":
        return 3;
      case "events":
        return 4;
      case "team":
        return 5;
      default:
        return 0;
    }
  }

  const routes = ["Mission", "Vision", "Ministry", "Founder", "Events", "Team"];
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);

  // mission = 0
  // vision = 1
  // service = 2

  useEffect(() => {
    if (lastSegment === "about") {
      navigate("/about/mission");
      setCurrentIndex(0);
    }
    console.log(lastSegment);
    if (lastSegment === "Events" || lastSegment === "events") {
      document.getElementById("about-page").style.background = "transparent";
    } else {
      document.getElementById("about-page").style.background = "#ebb061";
    }
  }, [location, currentIndex, lastSegment, navigate]);

  return (
    <div id="about-page">
      <Link
        className="prev top"
        to={routes[currentIndex - 1] || routes[routes.length - 1]}
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + routes.length) % routes.length)
        }
      >
        &#10094;{" "}
        {routes[currentIndex - 1]
          ? routes[currentIndex - 1]
          : routes[routes.length - 1]}
      </Link>
      <Link
        className="next top"
        to={
          currentIndex > routes.length - 1
            ? "THIS DOESN'T WORK"
            : routes[currentIndex + 1]
        }
        onClick={() => setCurrentIndex((currentIndex + 1) % routes.length)}
      >
        {routes[currentIndex + 1] ? routes[currentIndex + 1] : routes[0]}{" "}
        &#10095;
      </Link>
      <Outlet />

      <Link
        className="prev bottom"
        to={routes[currentIndex - 1] || routes[routes.length - 1]}
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + routes.length) % routes.length)
        }
      >
        &#10094;{" "}
        {routes[currentIndex - 1]
          ? routes[currentIndex - 1]
          : routes[routes.length - 1]}
      </Link>
      <Link
        className="next bottom"
        to={
          currentIndex > routes.length - 1
            ? "THIS DOESN'T WORK"
            : routes[currentIndex + 1]
        }
        onClick={() => setCurrentIndex((currentIndex + 1) % routes.length)}
      >
        {routes[currentIndex + 1] ? routes[currentIndex + 1] : routes[0]}{" "}
        &#10095;
      </Link>
    </div>
  );
}
