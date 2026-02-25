import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Get in Touch</h1>

        <p className="contact-subtitle">
          Have questions about Smart Split? We’re here to help.
        </p>

        <p className="contact-description">
          Smart Split is built to make shared expenses transparent, accurate,
          and stress-free. If you’re experiencing an issue, have a feature
          request, or simply want to share feedback, we’d love to hear from you.
          Your insights help us continuously improve the platform and deliver
          a smarter expense tracking experience.
        </p>

        <div className="contact-highlight">
          <p>
            📌 General inquiries  
            <br />
            📌 Feature suggestions  
            <br />
            📌 Technical support  
            <br />
            📌 Collaboration opportunities
          </p>
        </div>

        <form className="contact-form">
          <input
            type="text"
            placeholder="Full Name"
            className="contact-input"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="contact-input"
          />

          <textarea
            placeholder="Write your message here..."
            rows="4"
            className="contact-textarea"
          ></textarea>

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>

        <p className="contact-footer">
          Our team typically responds within 24–48 hours.
        </p>
      </div>
    </div>
  );
}