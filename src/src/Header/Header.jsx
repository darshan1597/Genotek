import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  

  return (
    <>
      {/* TOP HEADER */}
      <header className="top-header">
        
        <hr />
        <div className="logo">
          <img src="/images/logo.jpeg" alt="logo" />
        </div>

        <input
          type="text"
          placeholder="     Please Enter Cat No., CAS No., Product Name"
          className="search"
        />

        <div className="contact">
          <img src="/images/phone.png" alt="phone" />
          +91 22 2577 6007 | 91377 24227
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </header>

      {/* SIDE MENU */}
      <nav className={`side-menu ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* ABOUT DROPDOWN */}
          <li className="dropdown">
          <span onClick={() => setAboutOpen(!aboutOpen)}>
            About us ▾
          </span>

            {aboutOpen && (
              <ul className="submenu">
                <li><Link to="/genotek-story">The Genotek Story</Link></li>
                <li><Link to="/genotek-team">The Genotek Team</Link></li>
              </ul>
            )}
          </li>
           <li><Link to="/products">Products</Link></li>
            <li><Link to="/industry">Industry</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/get-in-touch">Get in touch</Link></li>
        </ul>
      </nav>
    </>
  );
}
