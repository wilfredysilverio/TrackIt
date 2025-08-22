import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Depth layers for enhanced 3D perception */}
      <div className="depth-layer"></div>
      <div className="depth-layer"></div>
      
      {/* Meteor trail elements for 3D effect */}
      <div className="meteor-trail"></div>
      <div className="meteor-trail"></div>
      <div className="meteor-trail"></div>
      <div className="meteor-trail"></div>
      <div className="meteor-trail"></div>
      <div className="meteor-trail"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            A capital app for independents
          </h1>
          <p className="hero-subtitle">
            Get paid faster and manage your finances effortlessly. Perfect for freelancers seeking a seamless financial solution.
          </p>
          <button className="hero-cta">
            Join today
          </button>
        </div>
        
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-header">
                <h3>Payments</h3>
              </div>
              <div className="card-display">
                <div className="visa-card">
                  <div className="card-chip"></div>
                  <div className="card-number">**** **** **** 1234</div>
                  <div className="card-info">
                    <span className="card-name">JOHN DOE</span>
                    <span className="card-expiry">12/25</span>
                  </div>
                </div>
              </div>
              <div className="integration-message">
                <p>Integrate with just one single tap</p>
                <div className="tap-indicator">
                  <span className="tap-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



