import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import HeroSlider from "./Home/HeroSlider";
import Story from "./genotek-story/genotek-story";
import Team from "./genotek-team/genotek-team";

/* Pages */
function Home() {
  return <HeroSlider />;
}



function Products() {
  return <h1>Products Page</h1>;
}

function Industry() {
  return <h1>Industry Page</h1>;
}

function Services() {
  return <h1>Services Page</h1>;
}

function Contact() {
  return <h1>Get in Touch</h1>;
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genotek-story" element={<Story />} />
        <Route path="/genotek-team" element={<Team />} />
        <Route path="/products" element={<Products />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/services" element={<Services />} />
        <Route path="/get-in-touch" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;