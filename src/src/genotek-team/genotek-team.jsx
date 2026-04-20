    import "./genotek-team.css";

    export default function GenotekTeam() {
    return (
        <div className="genotek-container">

        {/* HERO SECTION */}
        <div className="hero">
            <img src="/images/slide1.png" alt="hero" className="hero-img" />
            <div className="hero-overlay">
            <pre className="over"   >    The Genotek <br />           <strong>Team</strong>.</pre>
            </div>
        </div>

        

        {/* WHO WE ARE */}
        <div className="section">
            <img src="/images/who-we-are.png" alt="who we are" />
            <div className="text">
               
                <h1>Rushab Gohil</h1>
            <h3>CEO</h3>
            <p>
                Rushabh Gohil is an emerging leader known for his strategic thinking and
execution-driven approach. With a strong focus on building relationships and
driving business outcomes, he brings a balanced perspective of operational
discipline and growth ambition. He plays a key role in enabling customerfocused solutions, contributing to scalable success and long-term value
creation in dynamic and competitive environments.

                <br/><br/>
                <a href="/genotek-our-team"><strong>Our Team</strong></a>
            </p>
            </div>
        </div>

        <hr />

        {/* WHAT WE DO */}
        <div className="section reverse">
            <div className="text">
                 <div className="rightAlign">
            <h1>Hitesh Gandhi</h1>
            <h3>President - Marketing & Projects
</h3>
            <p>
                Hitesh is a results-driven leader in the pharmaceutical and CDMO sector,
recognized for shaping growth strategies and building strong global
partnerships. Combining commercial acumen with industry expertise, he
drives execution-focused teams to deliver customer-centric solutions.
His leadership emphasizes innovation, agility, and long-term value
creation, enabling organizations to scale effectively and succeed in
competitive, evolving markets

            </p></div>
            </div>
            <img src="/images/who-we-are.png" alt="what we do" />
        </div>

        <hr class="custom"></hr>

       

        </div>
    );
    }