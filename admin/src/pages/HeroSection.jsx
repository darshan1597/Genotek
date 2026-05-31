import React, { useState } from "react";
import Navabar from "./components/Navabar";
import { Link } from "react-router-dom";
import slide1 from "../../../client/src/assets/hero/slide1.jpeg";
import slide2 from "../../../client/src/assets/hero/slide2.jpg";
import slide3 from "../../../client/src/assets/hero/slide3.jpeg";
import slide4 from "../../../client/src/assets/hero/slide4.png";
import slide5 from "../../../client/src/assets/hero/slide5.png";


import {
  FiArrowLeft,
} from "react-icons/fi";

const HeroSection = () => {

  const [slides, setSlides] = useState(() => {
  const savedSlides = localStorage.getItem("heroSlides");

  return savedSlides
    ? JSON.parse(savedSlides)
    : [
        {
          id: "intro",
          image: slide1,
          variant: "special",
          title: "Your Trusted CRDMO Partner",
          subtitle:
            "Precision Chemistry | Process Excellence | Scalable Manufacturing",
        },
        {
          id: "deliver",
          image: slide2,
          variant: "normal",
          lines: [
            ["Big enough to ", "Deliver."],
            ["Small enough to ", "Care."],
          ],
        },
        {
          id: "innovation",
          image: slide3,
          variant: "normal",
          lines: [
            ["Driven by ", "Innovation."],
            ["Defined by ", "Quality."],
          ],
        },
        {
          id: "reach",
          image: slide4,
          variant: "normal",
          lines: [
            ["Always within ", "Reach."],
            ["From Experiment to Outcome.", ""],
          ],
        },
        {
          id: "outro",
          image: slide5,
          variant: "special",
          title: "Excited to Partner with You!",
          subtitle:
            "Precision Chemistry | Process Excellence | Scalable Manufacturing",
        },
      ];
});

  return (
    <div className="min-h-screen bg-[#f8fbfd]">
      <Navabar />

      <main className="px-4 pb-12 md:px-6 lg:px-10">
        <section className="mx-auto max-w-6xl py-8 lg:py-10">

          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-5 border-b border-[#d8e6ef] pb-7 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6a9ab1]">
                Hero Banners
              </p>

              <h1 className="text-[32px] font-semibold leading-tight text-[#214f86] sm:text-[42px]">
                Change Hero Banners
              </h1>

              <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#526b80]">
                Edit hero banner texts dynamically.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/admin-panel"
                className="inline-flex h-11 items-center justify-center gap-2 border border-[#d7e5ee] bg-white px-4 text-[14px] font-semibold text-[#214f86] transition-colors duration-200 hover:bg-[#eef5f9]"
              >
                <FiArrowLeft className="text-[17px]" />
                Dashboard
              </Link>
            </div>

          </div>

          {/* EDITABLE HERO CONTENT */}
{slides.map((slide, index) => (
  <div
    key={slide.id}
    className="mb-6 rounded-xl border border-[#d7e5ee] bg-white p-5 shadow-sm"
  >

    <h2 className="mb-4 text-xl font-semibold text-[#214f86] capitalize">
      {slide.id} Slide
    </h2>

    {/* TITLE */}
    {slide.title && (
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-[#526b80]">
          Title
        </label>

        <input
          type="text"
          value={slide.title}
          onChange={(e) => {
            const updated = [...slides];
            updated[index].title = e.target.value;
            setSlides(updated);
          }}
          className="w-full rounded-md border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]"
        />
      </div>
    )}

    {/* SUBTITLE */}
    {slide.subtitle && (
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-[#526b80]">
          Subtitle
        </label>

        <textarea
          value={slide.subtitle}
          onChange={(e) => {
            const updated = [...slides];
            updated[index].subtitle = e.target.value;
            setSlides(updated);
          }}
          rows={3}
          className="w-full rounded-md border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]"
        />
      </div>
    )}

    {/* LINES */}
    {slide.lines &&
      slide.lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2"
        >

          {/* PREFIX */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#526b80]">
              Prefix Text
            </label>

            <input
              type="text"
              value={line[0]}
              onChange={(e) => {
                const updated = [...slides];
                updated[index].lines[lineIndex][0] =
                  e.target.value;
                setSlides(updated);
              }}
              className="w-full rounded-md border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]"
            />
          </div>

          {/* HIGHLIGHT */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#526b80]">
              Highlight Text
            </label>

            <input
              type="text"
              value={line[1]}
              onChange={(e) => {
                const updated = [...slides];
                updated[index].lines[lineIndex][1] =
                  e.target.value;
                setSlides(updated);
              }}
              className="w-full rounded-md border border-[#d7e5ee] p-3 outline-none focus:border-[#214f86]"
            />
          </div>

        </div>
      ))}
  </div>
))}

{/* SAVE BUTTON */}
<div className="mt-8 flex justify-end">
  <button
    onClick={() => {
      localStorage.setItem(
        "heroSlides",
        JSON.stringify(slides)
      );

      alert("Hero banners saved successfully!");
    }}
    className="rounded-md bg-[#214f86] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163b66]"
  >
    Save Changes
  </button>
</div>
                  

            
          

        </section>
      </main>
    </div>
  );
};

export default HeroSection;