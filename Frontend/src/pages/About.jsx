import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About Smart Split</h1>

        <p className="about-intro">
          <strong>Smart Split</strong> is a modern expense tracking application
          designed to simplify group expense management. Whether you're
          traveling with friends, living with roommates, or managing shared
          project costs, Smart Split helps you track and settle expenses
          effortlessly.
        </p>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Create and manage multiple groups</li>
            <li>Add and track shared expenses</li>
            <li>Automatic expense calculation</li>
            <li>Equal and time-based split options</li>
            <li>Clear “₹ amount from/to person” tracking</li>
            <li>Real-time balance summary</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <ol>
            <li>Create a group</li>
            <li>Add members</li>
            <li>Add expenses with payer details</li>
            <li>Smart Split calculates balances automatically</li>
            <li>View your net balance instantly</li>
          </ol>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make shared expenses simple, transparent, and
            hassle-free through smart automation and clean user experience.
          </p>
        </section>

        <section className="about-section">
          <h2>Built With</h2>
          <p>
            MERN Stack (MongoDB, Express.js, React.js, Node.js) with modern UI
            design and secure authentication.
          </p>
        </section>
      </div>
    </div>
  );
}