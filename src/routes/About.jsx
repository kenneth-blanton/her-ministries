import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import herLogo from "../images/herLogo.png";
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
    if (lastSegment === "mission") {
      return 0;
    } else if (lastSegment === "vision") {
      return 1;
    } else if (lastSegment === "service") {
      return 2;
    }
  }

  const routes = ["mission", "vision", "service"];
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);

  // mission = 0
  // vision = 1
  // service = 2

  useEffect(() => {
    if (lastSegment === "about") {
      navigate("/about/mission");
      setCurrentIndex(0);
    }
  }, [location, currentIndex]);

  return (
    <div id="about-page">
      <Link
        className="prev top"
        to={routes[currentIndex - 1] || routes[routes.length - 1]}
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + routes.length) % routes.length)
        }
      >
        &#10094;
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
        &#10095;
      </Link>
      <Outlet />

      <Link className="prev bottom" onClick={{}}>
        &#10094;
      </Link>
      <Link className="next bottom" onClick={{}}>
        &#10095;
      </Link>
    </div>
  );
}
