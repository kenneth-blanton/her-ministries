import noBack from "../images/homeHeadshot-removebg-preview.png";
import noBackLogo from "../images/herLogo-removebg-preview.png";
import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const images = [noBack, noBackLogo];

  var myopacity = 0;

  function MyFadeFunction() {
    if (myopacity < 1) {
      myopacity += 0.05;
      setTimeout(function () {
        MyFadeFunction();
      }, 10);
    }
    document.getElementsByClassName("homeSplashImages")[0].style.opacity =
      myopacity;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prevImgIndex) => (prevImgIndex + 1) % images.length);
    }, 5000);
    MyFadeFunction();

    return () => clearInterval(interval);
  }, [imgIndex]);

  return (
    <div className="homePage">
      {/* <img src={herLogo} alt="herLogo" className="herLogoHome" /> */}
      <div className="aboveFold">
        <div className="aboveFoldWords">
          <h3>H.E.R Ministries: A Healing Haven for Women</h3>
          <p>
            Providing a safe and supportive environment for women to heal from
            past trauma, discover their true identity in Christ, and walk in the
            fullness of their God-given destinies.
          </p>
          <div>
            <NavLink to="/about">
              <button>Learn More</button>
            </NavLink>
            <NavLink to="/about/founder">
              <button>Meet The Founder</button>
            </NavLink>
          </div>
        </div>
        <div className="homeImg">
          <img src={images[imgIndex]} alt="" className="homeSplashImages" />
        </div>
      </div>
    </div>
  );
};
export default Home;
