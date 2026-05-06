import React, { useState } from "react";
import Navabar from "./components/Navabar";
import Sidebar from "./components/Sidebar";
import img1 from "../assets/services/services1.png";
import img2 from "../assets/services/services2.png";
import img3 from "../assets/services/services3.png";
import img4 from "../assets/services/services4.png";
import Footer from "./components/Footer";
import hero from "../assets/aboutStory/hero.jpg";

function Services() {
  const [active, setActive] = useState(null);

  const data = [
    {
      id: 1,
      title: "Compound Libraries",
      img: img1,
      content: (
        <div>
          <h2 className="text-[28px] font-semibold text-[#5a92b6]">
            Compound Libraries (Custom & Scaffold-Based)
          </h2>
          <p className="mt-3 text-[18px]">
            We design and synthesize{" "}
            <span className="font-semibold">
              high-quality compound libraries
            </span>{" "}
            to accelerate discovery programs.
          </p>
          <ul className="mt-4 list-disc pl-6 text-[17px] space-y-1">
            <li>Custom and scaffold-based library design</li>
            <li>Applications in pharma & agrochemicals</li>
            <li>High purity compounds</li>
            <li>Tailored research solutions</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: "Process Development",
      img: img2,
      content: (
        <div>
          <h2 className="text-[28px] font-semibold text-[#5a92b6]">
            Process Development & Scale-Up
          </h2>
          <p className="mt-3 text-[18px]">
            Scalable chemical processes from lab to manufacturing.
          </p>
          <ul className="mt-4 list-disc pl-6 text-[17px] space-y-1">
            <li>Route scouting & optimization</li>
            <li>Safe handling of complex chemistry</li>
            <li>Scale-up from mg to tonnes</li>
            <li>Green chemistry focus</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Analytical Development",
      img: img3,
      content: (
        <div>
          <h2 className="text-[28px] font-semibold text-[#5a92b6]">
            Purification & Isolation
          </h2>
          <p className="mt-3 text-[18px]">
            Advanced purification for high-quality compounds.
          </p>
          <ul className="mt-4 list-disc pl-6 text-[17px] space-y-1">
            <li>Chiral & preparative chromatography</li>
            <li>High precision isolation</li>
            <li>Scale-up support</li>
            <li>Reliable purity standards</li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: "Purification & Isolation",
      img: img4,
      content: (
        <div>
          <h2 className="text-[28px] font-semibold text-[#5a92b6]">
            Analytical Method Development & Validation
          </h2>
          <p className="mt-3 text-[18px]">
            Accurate, validated analytical solutions.
          </p>
          <ul className="mt-4 list-disc pl-6 text-[17px] space-y-1">
            <li>Method development for APIs</li>
            <li>Validated reproducible methods</li>
            <li>Process integration</li>
            <li>HPLC, GC & advanced tools</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="h-[2px] w-full bg-[#6a9fba]" />
      <Navabar />

      <main className="w-full px-4 pb-6 md:px-5 min-[1117px]:px-0 min-[1117px]:pr-6">
        <section className="mb-10 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
          <Sidebar />

          <div className="flex-1">
            {/* HERO */}
            <div className="relative h-[280px] w-full overflow-hidden bg-[#e8e3d9] sm:h-[360px] md:h-[450px]">
              <img
                src={hero}
                alt="The Genotek Story"
                className="h-full w-full object-cover"
              />
            </div>

            {/* GRID */}
            <div className="px-4 pt-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
                {data.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {/* IMAGE */}
                    <div className="text-center">
                      <div
                        onClick={() =>
                          setActive(active === item.id ? null : item.id)
                        }
                        className="cursor-pointer"
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          className={`h-[180px] w-full object-contain transition duration-300
                          ${
                            active === item.id
                              ? "scale-105 opacity-100"
                              : active
                              ? "opacity-40"
                              : "opacity-100"
                          }`}
                        />
                      </div>
                    </div>

                    {/* ✅ ROW-WISE CONTENT */}
                    {index % 2 === 1 && active && (
                      <div className="col-span-2 md:col-span-4 mt-4 text-left text-black/80">
                        {index === 1 &&
                          (active === 1 || active === 2) &&
                          data.find((d) => d.id === active)?.content}

                        {index === 3 &&
                          (active === 3 || active === 4) &&
                          data.find((d) => d.id === active)?.content}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <Footer insetForSidebar={false} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Services;