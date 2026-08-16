import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, X, FileText } from 'lucide-react';
import ResponsiveDocumentViewer from './ResponsiveDocumentViewer';
import './CertificatePreview.css';

export default function CertificatePreview({ data, onClose }) {
  const certRef = useRef(null);

  const verifyUrl = `https://graxion.in/internship/verify/${data.certificateId}`;

  async function handleDownload() {
    if (!certRef.current) return;
    try {
      // FIX for text squishing: Temporarily remove scaling from the ResponsiveDocumentViewer
      // html2canvas miscalculates font tracking/widths when the parent has a CSS transform scale applied.
      const scaledContainer = certRef.current.closest('.rdv-scaled-inner');
      let originalTransform = '';
      if (scaledContainer) {
        originalTransform = scaledContainer.style.transform;
        scaledContainer.style.transform = 'none';
      }

      // Small delay to allow the browser to recalculate unscaled layout
      await new Promise(resolve => setTimeout(resolve, 50));

      const canvas = await html2canvas(certRef.current, {
        scale: 3, // 300 DPI Export Scale
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      // Restore transform immediately after capture
      if (scaledContainer) {
        scaledContainer.style.transform = originalTransform;
      }

      const link = document.createElement('a');
      link.download = `Graxion-Certificate-${data.certificateId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      // Ensure we restore transform even on error
      const scaledContainer = certRef.current?.closest('.rdv-scaled-inner');
      if (scaledContainer && scaledContainer.style.transform === 'none') {
        scaledContainer.style.transform = '';
      }
    }
  }

  async function handleDownloadPDF() {
    if (!certRef.current) return;
    try {
      const scaledContainer = certRef.current.closest('.rdv-scaled-inner');
      let originalTransform = '';
      if (scaledContainer) {
        originalTransform = scaledContainer.style.transform;
        scaledContainer.style.transform = 'none';
      }

      await new Promise(resolve => setTimeout(resolve, 50));

      const canvas = await html2canvas(certRef.current, {
        scale: 3, 
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      if (scaledContainer) {
        scaledContainer.style.transform = originalTransform;
      }

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
      pdf.save(`Graxion-Certificate-${data.certificateId}.pdf`);
      
    } catch (error) {
      console.error('PDF Download failed:', error);
      const scaledContainer = certRef.current?.closest('.rdv-scaled-inner');
      if (scaledContainer && scaledContainer.style.transform === 'none') {
        scaledContainer.style.transform = '';
      }
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
          <style>
            @page {
              size: landscape;
              margin: 0mm;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100vw;
              height: 100vh;
              background: #ffffff;
              overflow: hidden;
            }
            .cert-container {
              box-shadow: none !important;
              transform: scale(0.95);
              transform-origin: center;
            }
          </style>
        </head>
        <body>
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
      documentWidth={1123} 
      documentHeight={794}
      actions={
        <>
          <button className="admin-btn-secondary verify-btn-doc" onClick={handleDownload}>
            <Download size={16} />
            Download PNG
          </button>
          <button className="admin-btn-secondary verify-btn-doc" onClick={handleDownloadPDF}>
            <FileText size={16} />
            Download PDF
          </button>
          <button className="admin-btn-secondary verify-btn-doc" onClick={handlePrint}>
            <Printer size={16} />
            Print
          </button>
          {onClose && (
            <button className="admin-btn-secondary verify-btn-doc" onClick={onClose} style={{ borderColor: '#ef4444', color: '#ef4444' }}>
              <X size={16} />
              Close
            </button>
          )}
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
                imageSettings={{
                  src: "/logo.png",
                  height: 16,
                  width: 16,
                  excavate: true
                }}
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
    </ResponsiveDocumentViewer>
  );
}
