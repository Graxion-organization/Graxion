import { useRef } from 'react';
import { Printer, X } from 'lucide-react';
import ResponsiveDocumentViewer from './ResponsiveDocumentViewer';
import CertificateContent from './CertificateContent';
import './CertificatePreview.css';

export default function CertificatePreview({ data, onClose }) {
  const certRef = useRef(null);

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
      }, 100);
    }, 250);
  }


  return (
    <ResponsiveDocumentViewer 
      documentWidth={1123} 
      documentHeight={794}
      actions={
        <>

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
      <CertificateContent data={data} certRef={certRef} />
    </ResponsiveDocumentViewer>
  );
}
