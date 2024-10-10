import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/ministryPage.css";
import firstSlide from "../images/IMG_8350t2.mov";
import secondSlide from "../images/IMG_8352.JPG";
import thirdSlide from "../images/b81b82dcb21044e184b172f659735204.MOV";
import fourthSlide from "../images/IMG_8366.JPG";
import fifthSlide from "../images/IMG_8350t.mov";
import sixthSlide from "../images/temp_10000000_197360942983344_6027755434715957592_n.MOV";
import seventhSlide from "../images/MinP1.mov";
import eighthSlide from "../images/MinP2.mov";
import ninthSlide from "../images/MinP3.mov";
import tenthSlide from "../images/MinP4.mov";

export default function VisionSlide() {
  const [slideIndex, setSlideIndex] = useState(1);

  const slides = [
    { src: firstSlide, alt: "firstSlide", type: "video" },
    { src: secondSlide, alt: "secondSlide", type: "image" },
    { src: thirdSlide, alt: "thirdSlide", type: "video" },
    { src: fourthSlide, alt: "fourthSlide", type: "image" },
    { src: fifthSlide, alt: "fifthSlide", type: "video" },
    { src: sixthSlide, alt: "sixthSlide", type: "video" },
    { src: seventhSlide, alt: "seventhSlide", type: "video" },
    { src: eighthSlide, alt: "eighthSlide", type: "video" },
    { src: ninthSlide, alt: "ninthSlide", type: "video" },
    { src: tenthSlide, alt: "tenthSlide", type: "video" },
  ];

  useEffect(() => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    Array.from(slides).forEach((slide, i) => {
      slide.style.display = i + 1 === slideIndex ? "block" : "none";
    });

    Array.from(dots).forEach((dot, i) => {
      dot.className = dot.className.replace(" current", "");
      if (i + 1 === slideIndex) {
        dot.className += " current";
      }
    });
  }, [slideIndex]);

  const plusSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const videos = document.getElementsByTagName("video");

    // Pause all videos
    Array.from(videos).forEach((video) => {
      video.pause();
    });

    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex > slides.length) {
        newIndex = 1;
      } else if (newIndex < 1) {
        newIndex = slides.length;
      }
      return newIndex;
    });
  };

  const renderDots = () => {
    const videos = document.getElementsByTagName("video");

    const dots = [];
    for (let i = 1; i <= slides.length; i++) {
      dots.push(
        <span
          className="dot"
          key={uuidv4()}
          onClick={() => {
            currentSlide(i);
            Array.from(videos).forEach((video) => {
              video.pause();
            });
          }}
        ></span>
      );
    }
    return dots;
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <>
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div key={index} className="mySlides fade">
            {slide.type === "video" ? (
              <video alt={slide.alt} controls>
                <source src={slide.src} />
              </video>
            ) : (
              <img src={slide.src} alt={slide.alt} />
            )}
          </div>
        ))}

        <button className="back" onClick={() => plusSlides(-1)}>
          &#10094;
        </button>
        <button className="forward" onClick={() => plusSlides(1)}>
          &#10095;
        </button>
      </div>
      <br />

      <div style={{ textAlign: "center" }}>{renderDots()}</div>
    </>
  );
}
