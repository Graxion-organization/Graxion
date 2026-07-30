import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { Download, Printer } from 'lucide-react';
import ResponsiveDocumentViewer from './ResponsiveDocumentViewer';
import './CertificatePreview.css';

export default function CertificatePreview({ data }) {
  const certRef = useRef(null);

  const verifyUrl = `${window.location.origin}/internship/verify/${data.certificateId}`;

  async function handleDownload() {
    if (!certRef.current) return;
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `Graxion-Certificate-${data.certificateId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  }

  function handlePrint() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const certHtml = certRef.current.outerHTML;
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    let styleHtml = '';
    styles.forEach((s) => {
      styleHtml += s.outerHTML;
    });

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Certificate - Graxion</title>
          ${styleHtml}
        </head>
        <body style="background: #ffffff; display: flex; justify-content: center; padding: 20px; margin: 0;">
          ${certHtml}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    }, 500);
  }

  const formattedStartDate = data.startDate
    ? new Date(data.startDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';
  const formattedEndDate = data.endDate
    ? new Date(data.endDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';
  const issuedDate = data.certificateIssuedDate
    ? new Date(data.certificateIssuedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });

  return (
    <ResponsiveDocumentViewer 
      documentWidth={800} 
      documentHeight={566}
      actions={
        <>
          <button className="admin-btn-secondary" onClick={handleDownload}>
            <Download size={16} />
            Download PNG
          </button>
          <button className="admin-btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            Print
          </button>
        </>
      }
    >
      <div className="cert-container" ref={certRef}>
        {/* Background decorations */}
        <div className="cert-bg-pattern" />
        <div className="cert-corner cert-corner-tl" />
        <div className="cert-corner cert-corner-tr" />
        <div className="cert-corner cert-corner-bl" />
        <div className="cert-corner cert-corner-br" />

        {/* Watermark */}
        <div className="cert-watermark">
          <img src="/logo.png" alt="" className="cert-watermark-logo" onError={(e) => { e.target.style.display='none' }} />
          <div className="cert-watermark-text">GRAXION</div>
        </div>

        {/* Gradient borders */}
        <div className="cert-border-top" />
        <div className="cert-border-bottom" />

        {/* Content */}
        <div className="cert-content">
          {/* Logo */}
          <div className="cert-logo">
            <img src="/logo.png" alt="Graxion Logo" className="cert-logo-img" onError={(e) => { e.target.style.display='none' }} />
            <div className="cert-logo-text-wrapper">
              GRA<span className="cert-text-orange">X</span>ION
            </div>
          </div>

          <div className="cert-divider" />

          <p className="cert-subtitle">Certificate of Completion</p>

          <h1 className="cert-title">
            {data.type === 'course' ? 'Course' : 'Internship'} Certificate
          </h1>

          <p className="cert-text">This is to certify that</p>

          <h2 className="cert-name">{data.studentName}</h2>

          <p className="cert-text">
            has successfully completed the{' '}
            <strong>{data.type === 'course' ? 'course' : 'internship'}</strong> program in
          </p>

          <h3 className="cert-program">{data.internshipTitle}</h3>

          <p className="cert-domain-label">
            Domain: <span className="cert-domain">{data.domain}</span>
          </p>

          <p className="cert-text">
            during the period of{' '}
            <strong>{formattedStartDate}</strong> to{' '}
            <strong>{formattedEndDate}</strong>
            {data.formattedDuration && (
              <> ({data.formattedDuration})</>
            )}
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

          <div className="cert-bottom">
            <div className="cert-signature">
              <p className="cert-sig-name">Issued by</p>
              <p className="cert-sig-title">Graxion</p>
            </div>

            <div className="cert-qr-section">
              <div className="cert-qr-box">
                <QRCodeSVG
                  value={verifyUrl}
                  size={90}
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

          {/* Seal */}
          <div className="cert-seal">
            <div className="cert-seal-inner">
              <span className="cert-seal-text">VERIFIED</span>
              <span className="cert-seal-icon">G</span>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveDocumentViewer>
  );
}
