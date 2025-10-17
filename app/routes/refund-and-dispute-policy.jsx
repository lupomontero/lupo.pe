import { Link } from 'react-router';

const RefundAndDisputePolicyRoute = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <h2>Refund and Dispute Policy</h2>
      <p><strong>Effective Date:</strong> 6 May 2025</p>

      <p>
        As a freelance web consultant, I strive to deliver high-quality services
        that meet or exceed client expectations. This policy outlines the terms
        regarding refunds and dispute resolution to ensure a transparent and
        fair working relationship.
      </p>

      <h3>1. Refund Policy</h3>
      <p>
        Refunds are handled on a case-by-case basis and are generally{' '}
        <strong>not provided</strong> once work has begun or a milestone has
        been completed, except under the following conditions:
      </p>
      <ul>
        <li>A payment was made in error (e.g., duplicate payment).</li>
        <li>
          A deliverable was not provided as agreed upon in the written scope of
          work or contract.
        </li>
        <li>
          A cancellation occurs <strong>before</strong> any substantial work has
          begun.
        </li>
      </ul>
      <p>To request a refund, you must:</p>
      <ul>
        <li>
          Submit a written request through{' '}
          <Link to="/contact">this form</Link> within{' '}
          <strong>7 days</strong> of the payment date.
        </li>
        <li>
          Include the reason for the refund, relevant details, and any
          supporting documentation.
        </li>
      </ul>
      <p>
        If a refund is approved, it will be issued to the original payment
        method within <strong>10 business days</strong>.
      </p>

      <h3>2. Non-Refundable Services</h3>
      <p>The following items are generally <strong>non-refundable</strong>:</p>
      <ul>
        <li>Completed work or delivered digital products.</li>
        <li>Deposits or retainers for reserved time blocks or project slots.</li>
        <li>
          Time-based consulting, strategy sessions, or discovery calls that have
          been conducted.
        </li>
      </ul>

      <h3>3. Dispute Resolution</h3>
      <p>
        Before initiating a formal dispute or chargeback through your payment
        provider, you agree to:
      </p>
      <ul>
        <li>
          Contact me directly via
          {' '}
          <Link to="/contact">this form</Link>
          {' '}
          with your concerns.
        </li>
        <li>
          Allow up to <strong>5 business days</strong> for a response and
          <strong>good faith effort</strong> toward resolution.
        </li>
      </ul>
      <p>
        Should a chargeback be initiated without prior communication, I reserve
        the right to:
      </p>
      <ul>
        <li>Dispute the chargeback with supporting evidence of services rendered.</li>
        <li>Suspend any ongoing or future work until the dispute is resolved.</li>
      </ul>

      <h3>4. Modifications</h3>
      <p>
        This policy may be updated from time to time. Clients will be notified
        of material changes via email or on my website.
      </p>
    </div>
  );
};

export default RefundAndDisputePolicyRoute;