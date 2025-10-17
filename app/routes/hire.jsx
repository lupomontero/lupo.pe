import { Link } from 'react-router';

const HireRoute = () => {
  return (
    <div>
      <h1>Hire me</h1>

      <p>
        Hello 👋! I'm Lupo Montero (full name Luis Enrique Montero Costa), a
        seasoned <strong>freelance consultant and developer</strong>{' '}
        with nearly three decades of experience in <strong>web development</strong>.
        Throughout my career, I've embraced various roles — from webmaster to
        CTO — adapting to the evolving landscape of technologies and project
        requirements.
      </p>
      <p>
        Beyond client work, I have a strong passion for <strong>open source</strong>,
        actively contributing to and supporting projects that foster{' '}
        <strong>learning and collaboration</strong>. I'm deeply engaged with{' '}
        <strong>developer communities</strong> and believe
        in the power of technology to drive positive <strong>social impact</strong>.
        Whether it's building inclusive digital tools or mentoring the next
        generation of developers, I'm always looking for ways to make meaningful
        contributions through my work.
      </p>
      <p>
        My expertise spans a wide range of technologies, including
        Engineering Management,
        Systems Architechture,
        Software Development,
        Cloud Computing (AWS, GCP, Firebase),
        Databases (SQL, NoSQL),
        Technical Writing,
        Training,
        Public Speaking,
        JavaScript,
        Node.js,
        React,
        Shell scripting,
        Version Control and collaboration tools (Git, GitHub),
        CI/CD,
        Docker,
        among many others.
      </p>

      <p>
        {/* <!-- Calendly link widget begin --> */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
        <a
          href="#"
          onClick={(event) => {
            Calendly.initPopupWidget({
              url: 'https://calendly.com/lupo-montero',
            });
            return false;
          }}
        >
          Schedule time with me
        </a>
        {/* <!-- Calendly link widget end --> */}
      </p>

      <p>
        <Link to="/contact">Contact</Link>
      </p>

      {/* <p>
        Book a 1:1 session to help you with...
      </p> */}

      <p>
        <Link to="/refund-and-dispute-policy">
          Refund and Dispute Policy
        </Link>
      </p>

    </div>
  );
};

export default HireRoute;
