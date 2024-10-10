import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import herLogo from "../images/herLogo.png";

import CheckWindowWidth from "../functions/checkWindowWidth";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Root() {
  const location = useLocation();
  const date = new Date();
  const [vis, setVis] = useState(false);

  let windowWidth = CheckWindowWidth();
  console.log(windowWidth);

  const items = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Episodes",
      path: "/episodes",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Store",
      path: "/store",
    },
  ];

  const subItems = [
    {
      name: "Mission",
      path: "/about/mission",
    },
    {
      name: "Vision",
      path: "/about/vision",
    },
    {
      name: "Ministry",
      path: "/about/ministry",
    },
    {
      name: "Founder",
      path: "/about/founder",
    },
    {
      name: "Events",
      path: "/about/events",
    },
    {
      name: "Team",
      path: "/about/team",
    },
  ];

  return (
    <>
      <div className="appHeader">
        <span className="appHeaderText">HEALED.EMPOWERED.RESTORED</span>
        <Link to={"/admin"} className="adminLogin">
          Admin
        </Link>
      </div>
      <header className="topNav">
        <>
          {location.pathname === "/" ? (
            windowWidth < 860 ? (
              <NavLink to="/" onClick={() => setVis(false)}>
                <img src={herLogo} alt="mainLogo" />
              </NavLink>
            ) : (
              <Link
                to="/"
                onClick={() => {
                  setVis(false);
                }}
                className="headliner"
              >
                <h1>I’m H.E.R, Inc.</h1>
              </Link>
            )
          ) : (
            <Link
              to="/"
              onClick={() => {
                setVis(false);
              }}
              className="headliner"
            >
              <h1>I’m H.E.R, Inc.</h1>
            </Link>
          )}
        </>

        {windowWidth < 860 ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hamburger"
              viewBox="0 0 448 512"
              onClick={() => {
                setVis(!vis);
              }}
              fill="var(--secondary)"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            <div className={`mobileNav ${vis ? "visible" : "hidden"}`}>
              {items.map((item) => (
                <NavLink
                  to={item.path}
                  className="routes mobileRoutes"
                  key={uuidv4()}
                  onClick={() => setVis(!vis)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <div className="routes">
            <NavLink to="/" className="route">
              HOME
            </NavLink>
            <div className="routeContainer">
              <NavLink to="/about" className="route">
                ABOUT{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={20}
                  height={20}
                  fill="#282c34"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </NavLink>
              <div className="aboutDropdown">
                {subItems.map((item) => (
                  <div key={uuidv4()}>
                    <Link
                      to={item.path}
                      className="aboutDropdownRoute"
                      key={uuidv4()}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <NavLink to="/episodes" className="route">
              PODCAST EPISODES
            </NavLink>
            <NavLink to="/contact" className="route">
              CONTACT US
            </NavLink>
            <NavLink to="/store" className="route">
              STORE
            </NavLink>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <a
          href="https://codebykenneth.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Code By Kenneth
        </a>
        {/* {location.pathname == "/episodes" ? <Link>Upload</Link> : null} */}
        <span>
          © {date.getFullYear()} I’m H.E.R, Inc.. All Rights Reserved.
        </span>
      </footer>
    </>
  );
}
