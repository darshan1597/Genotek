import { useEffect, useState } from "react";
import "./HeroSlider.css";

const slides = [
  {
    image: "/images/slide1.png",
    text: `Big enough to <strong>Deliver.</strong>\n\tSmall enough to <strong>Care...</strong>`
  },
  {
    image: "/images/slide2.png",
    text: `Driven by <strong>Innovation.</strong>\n\tDefined by <strong>Quality.</strong>`
  },
  {
    image: "/images/slide3.png",
    text: `Committed to Your <strong>Success.</strong>`
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      {slides.map((slide, index) => (
        
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <h2
                style={{ whiteSpace: "pre" }}
                dangerouslySetInnerHTML={{ __html: slide.text }}
                ></h2>
          </div>
          
            <div className="right-panel">
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            </div>
        </div>
      ))}
    </div>
  );
}