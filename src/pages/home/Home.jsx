import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './HomePage.css';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homepage">
      <header className="header">
        <h1>BookMyEvent</h1>
        <nav>
          {!currentUser ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <Link to="/explore" className="signup-btn">Explore</Link>
          )}
        </nav>
      </header>

      <section className="hero">
        <h2>Discover Events, Connect with Communities</h2>
        <p>Join us to explore exciting events, clubs, and more on your campus. Register now and never miss an event again!</p>
        {currentUser ? (
          <Link to="/explore" className="cta-btn">Explore Now</Link>
        ) : (
          <Link to="/signup" className="cta-btn">Get Started</Link>
        )}
      </section>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>🔍 Discover Events</h3>
            <p>Find events tailored to your preferences and location.</p>
          </div>
          <div className="card">
            <h3>🎟️ Book Tickets</h3>
            <p>Easily register and book tickets for events.</p>
          </div>
          <div className="card">
            <h3>🤖 AI Chatbot</h3>
            <p>Get instant assistance with our intelligent chatbot.</p>
          </div>
          <div className="card">
            <h3>🌐 Connect with Communities</h3>
            <p>Join clubs and societies to enhance your campus life.</p>
          </div>
        </div>
      </section>

      <section id="event-gallery" className="event-gallery">
        <h2>Event Highlights</h2>
        <div className="gallery-images">
          <img src="https://th.bing.com/th/id/OIP.o8d0STltT9yqVBNZrR96DgHaE8?w=273&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Event 1" />
          <img src="https://th.bing.com/th/id/OIP.3bc1zvRgXWp5Mv3eIGX7BwHaEH?pid=ImgDet&w=474&h=263&rs=1" alt="Event 2" />
          <img src="https://th.bing.com/th/id/OIP.wkEPc18idrMPj2ZbqkWC6gHaE6?rs=1&pid=ImgDetMain" alt="Event 3" />
          <img src="https://th.bing.com/th/id/OIP.g7HgNZQIQovnswxaoK-MQgHaFj?w=245&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Event 4" />
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>BookMyEvent aims to streamline the process of discovering and registering for events on campus. Our platform connects students with events, groups, and experiences, making campus life richer and more accessible for everyone.</p>
      </section>

      <section id="signup" className="signup">
        <h2>Ready to Get Started?</h2>
        <p>Sign up to access all features and join a vibrant campus community.</p>
        {currentUser ? (
          <Link to="/explore" className="signup-btn">Explore</Link>
        ) : (
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;
