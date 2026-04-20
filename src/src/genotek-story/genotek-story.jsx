    import "./genotek-story.css";

    export default function GenotekStory() {
    return (
        <div className="genotek-container">

        {/* HERO SECTION */}
        <div className="hero">
            <img src="/images/slide1.png" alt="hero" className="hero-img" />
            <div className="hero-overlay">
            <pre className="over"   >    The Genotek <br />         <strong>Story</strong>.</pre>
            </div>
        </div>

        <p className="intro-text">
            At Genotek Biochem Private Limited, we believe that true progress in science
            comes from balancing scale with sensitivity. Guided by our mantra,
            “Big enough to deliver, small enough to care”.
        </p>

        {/* WHO WE ARE */}
        <div className="section">
            <img src="/images/who-we-are.png" alt="who we are" />
            <div className="text">
            <h2>Who we are</h2>
            <p>
                We are a science-driven organization rooted in chemistry, committed to
                delivering reliable, high-quality solutions that support industries.
                Our strength lies in our ability to operate with the efficiency,
                infrastructure, and expertise of a large organization, while maintaining
                the responsiveness and personal attention of a close-knit team.
                <br/><br/>
                <a href="/genotek-our-team"><strong>Our Team</strong></a>
            </p>
            </div>
        </div>

        <hr />

        {/* WHAT WE DO */}
        <div className="section reverse">
            <div className="right-text">
            <h2>What we do</h2>
            <p>
                We are a science-driven organization rooted in chemistry, committed to
delivering reliable, high-quality solutions that support industries. Our
strength lies in our ability to operate with the efficiency, infrastructure, and
expertise of a large organization, while maintaining the responsiveness,
flexibility, and personal attention of a close-knit team.

            </p>
            </div>
            <img src="/images/who-we-are.png" alt="what we do" />
        </div>

        <hr class="custom"></hr>

        {/* WHY CHOOSE US */}
        <div className="section">
            <img src="/images/who-we-are.png" alt="why choose us" />
            <div className="text">
            <h2>Why Choose Us?</h2>
            <p>
                We are a science-driven organization rooted in chemistry, committed to
delivering reliable, high-quality solutions that support industries. Our
strength lies in our ability to operate with
the efficiency, infrastructure, and expertise of a large organization, while 
            </p>
            </div>
        </div>

        </div>
    );
    }