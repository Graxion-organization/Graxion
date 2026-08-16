import { QRCodeSVG } from 'qrcode.react';
import { format, parseISO } from 'date-fns';
import './CertificatePreview.css';

export default function CertificateContent({ data, certRef }) {
  const verifyUrl = `https://graxion.in/internship/verify/${data.certificateId}`;
  
  let formattedStartDate = 'N/A';
  let formattedEndDate = 'N/A';
  let issuedDate = 'N/A';

  try {
    if (data.startDate) formattedStartDate = format(parseISO(data.startDate), 'MMMM d, yyyy');
    if (data.endDate) formattedEndDate = format(parseISO(data.endDate), 'MMMM d, yyyy');
    issuedDate = data.endDate 
      ? format(parseISO(data.endDate), 'MMMM d, yyyy') 
      : format(new Date(), 'MMMM d, yyyy');
  } catch (err) {
    console.error('Date parsing error', err);
  }

  return (
    <div className="cert-container" ref={certRef}>
      {/* Background decorations */}
      <div className="cert-bg-pattern" />
      <div className="cert-corner cert-corner-tl" />
      <div className="cert-corner cert-corner-tr" />
      <div className="cert-corner cert-corner-bl" />
      <div className="cert-corner cert-corner-br" />

      {/* Gradient borders */}
      <div className="cert-border-top" />
      <div className="cert-border-bottom" />

      {/* Content */}
      <div className="cert-content">
        {/* Logo */}
        <div className="cert-logo">
          <div className="cert-logo-img-wrapper">
            <img src="/logo.png" alt="Graxion Logo" className="cert-logo-img" onError={(e) => { e.target.style.display='none' }} />
          </div>
          <div className="cert-logo-text-wrapper">
            GRA<span className="cert-text-orange">X</span>ION
          </div>
        </div>

        <div className="cert-divider" />

        <p className="cert-subtitle">Certificate of Completion</p>

        <h1 className="cert-title">
          {data.type === 'course' ? 'Course' : 'Internship'} Certificate
        </h1>

        <p className="cert-text-intro">This is to certify that</p>

        <h2 className="cert-name">{data.studentName}</h2>

        <p className="cert-desc-paragraph">
          has successfully completed the <strong>{data.type === 'course' ? 'Course' : 'Internship'} Program</strong> in{' '}
          <strong>{data.domain}</strong> as a <strong>{data.internshipTitle}</strong>. The program was conducted{' '}
          from <strong>{formattedStartDate}</strong> to <strong>{formattedEndDate}</strong>{data.formattedDuration && ` (${data.formattedDuration})`}.{' '}
          During this tenure, they demonstrated outstanding technical performance, dedication, and problem-solving skills.
        </p>

        {data.performanceRating && (
          <div className="cert-rating">
            <span>Performance Rating:</span>
            <div className="cert-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`cert-star ${i < data.performanceRating ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="cert-bottom">
        <div className="cert-signature">
          <div className="cert-cursive-sig">Graxion Team</div>
          <div className="cert-signature-line"></div>
          <p className="cert-sig-name">Authorized Signatory</p>
          <p className="cert-sig-title">Graxion</p>
        </div>

        <div className="cert-qr-section">
          <div className="cert-qr-box">
            <QRCodeSVG
              value={verifyUrl}
              size={80}
              bgColor="transparent"
              fgColor="#00d4ff"
              level="H"
            />
          </div>
          <p className="cert-qr-label">Scan to Verify</p>
        </div>

        <div className="cert-details">
          <p><strong>Certificate ID:</strong> {data.certificateId}</p>
          <p><strong>Student ID:</strong> {data.studentId}</p>
          <p><strong>Issue Date:</strong> {issuedDate}</p>
        </div>
      </div>
    </div>
  );
}
