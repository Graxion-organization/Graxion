import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, X } from 'lucide-react';
import ResponsiveDocumentViewer from './ResponsiveDocumentViewer';
import './ReportCardPreview.css';

export default function ReportCardPreview({ data, onClose }) {
  const reportRef = useRef(null);
  const verifyUrl = `https://graxion.in/internship/verify/${data.certificateId || data.studentId}`;

  async function handleDownload() {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `ReportCard-${data.studentId || data.certificateId}.png`;
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
    
    const html = reportRef.current.outerHTML;
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
          <title>Print Report Card - Graxion</title>
          ${styleHtml}
          <style>
            @media print {
              body { margin: 0; padding: 0; background: #fff; }
              .rc-wrapper { padding: 0; }
              .rc-container { box-shadow: none; border: none; width: 100%; max-width: none; }
            }
          </style>
        </head>
        <body>
          ${html}
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

  function getGrade(obtained, max) {
    if (!max || max === 0) return { grade: '-', color: '#6b7280' };
    const pct = (obtained / max) * 100;
    if (pct >= 85) return { grade: 'O', color: '#10b981' }; // Emerald
    if (pct >= 75) return { grade: 'A+', color: '#3b82f6' }; // Blue
    if (pct >= 65) return { grade: 'A', color: '#6366f1' }; // Indigo
    if (pct >= 55) return { grade: 'B+', color: '#8b5cf6' }; // Violet
    if (pct >= 50) return { grade: 'B', color: '#d97706' }; // Amber
    if (pct >= 40) return { grade: 'C', color: '#f59e0b' }; // Yellow
    return { grade: 'F', color: '#ef4444' }; // Red
  }

  let totalMax = 0;
  let totalObtained = 0;
  let totalModules = 0;

  data.assessments?.forEach(week => {
    week.modules.forEach(m => {
      totalMax += (m.maxMarks || 0);
      totalObtained += (m.obtainedMarks || 0);
      totalModules++;
    });
  });

  const overallGrade = getGrade(totalObtained, totalMax);
  const overallPct = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;

  const issueDate = data.certificateIssuedDate 
    ? new Date(data.certificateIssuedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <ResponsiveDocumentViewer 
      documentWidth={794} 
      documentHeight={1123}
      actions={
        <>
          <button className="admin-btn-secondary verify-btn-doc" onClick={handleDownload}>
            <Download size={16} />
            Download PNG
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
      <div className="rc-container" ref={reportRef}>
        
        {/* Watermark */}
        <div className="rc-watermark">
          <img src="/logo.png" alt="" className="rc-watermark-logo" onError={(e) => { e.target.style.display='none' }} />
          <div className="rc-watermark-text">GRAXION</div>
        </div>

        {/* Header */}
        <div className="rc-header">
          <img src="/logo.png" alt="Graxion Logo" className="rc-logo" onError={(e) => { e.target.style.display='none' }} />
          <div className="rc-logo-text-wrapper">
            GRA<span className="rc-text-orange">X</span>ION
          </div>
          <h1 className="rc-title">{data.internshipTitle} Report Card</h1>
          {data.formattedDuration && <p className="rc-duration">Duration: {data.formattedDuration}</p>}
        </div>

        {/* Remarks / Intro */}
        <div className="rc-intro">
          <h2>Congratulations, {data.studentName}!</h2>
          <p>
            On behalf of the entire team at <strong>Graxion</strong>, we extend our heartfelt congratulations on successfully completing the {data.type === 'course' ? 'course' : 'internship'}. Over this period, you have shown remarkable dedication, a genuine hunger to learn, and the discipline to excel.
          </p>
          <p>
            Your commitment to continuous growth sets the foundation of a brilliant career ahead. We wish you the very best in all your future endeavors.
          </p>
        </div>

        {/* Intern Profile */}
        <div className="rc-section">
          <h3 className="rc-section-title">INTERN PROFILE</h3>
          <table className="rc-table rc-profile-table">
            <tbody>
              <tr>
                <th>Intern Name</th>
                <td>{data.studentName}</td>
                <th>Student ID</th>
                <td>{data.studentId}</td>
              </tr>
              <tr>
                <th>Email ID</th>
                <td>{data.email}</td>
                <th>Phone</th>
                <td>{data.phone || 'N/A'}</td>
              </tr>
              <tr>
                <th>Domain</th>
                <td>{data.domain}</td>
                <th>Issue Date</th>
                <td>{issueDate}</td>
              </tr>
              <tr>
                <th>Mentor</th>
                <td>{data.mentor || 'Graxion Team'}</td>
                <th>Status</th>
                <td style={{ color: '#10b981', fontWeight: 'bold' }}>
                  {data.status ? data.status.toUpperCase() : 'COMPLETED'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assessments */}
        {data.assessments && data.assessments.length > 0 && (
          <div className="rc-section">
            <h3 className="rc-section-title">WEEK-WISE ASSESSMENT DETAILS</h3>
            
            {data.assessments.map((week, wIndex) => {
              let weekMax = 0;
              let weekObtained = 0;
              
              return (
                <div key={wIndex} className="rc-week-block">
                  <div className="rc-week-header">{week.weekName || `Week ${wIndex + 1}`}</div>
                  <table className="rc-table rc-assessment-table">
                    <thead>
                      <tr>
                        <th width="5%">#</th>
                        <th width="30%">Module / Subject</th>
                        <th width="40%">Topics Covered</th>
                        <th width="8%">Max</th>
                        <th width="8%">Obt.</th>
                        <th width="9%">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {week.modules.map((mod, mIndex) => {
                        weekMax += (mod.maxMarks || 0);
                        weekObtained += (mod.obtainedMarks || 0);
                        const { grade, color } = getGrade(mod.obtainedMarks, mod.maxMarks);
                        const pct = mod.maxMarks > 0 ? Math.round((mod.obtainedMarks / mod.maxMarks)*100) : 0;
                        
                        return (
                          <tr key={mIndex}>
                            <td className="rc-center">{mIndex + 1}</td>
                            <td>{mod.subject}</td>
                            <td className="rc-topics">{mod.topics}</td>
                            <td className="rc-center">{mod.maxMarks}</td>
                            <td className="rc-center rc-bold">{mod.obtainedMarks}</td>
                            <td className="rc-center" style={{ color, fontWeight: 'bold' }}>
                              {grade}
                              <div className="rc-pct">{pct}%</div>
                            </td>
                          </tr>
                        );
                      })}
                      {/* Week Subtotal */}
                      <tr className="rc-subtotal">
                        <td colSpan="3" style={{ textAlign: 'right', paddingRight: '15px' }}>
                          WEEK SUBTOTAL ({week.modules.length} modules assessed)
                        </td>
                        <td className="rc-center">{weekMax}</td>
                        <td className="rc-center">{weekObtained}</td>
                        <td className="rc-center" style={{ color: getGrade(weekObtained, weekMax).color }}>
                          {getGrade(weekObtained, weekMax).grade}
                          <div className="rc-pct">{weekMax > 0 ? Math.round((weekObtained/weekMax)*100) : 0}%</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}

        {/* Overall Summary */}
        <div className="rc-section">
          <h3 className="rc-section-title">OVERALL PERFORMANCE SUMMARY</h3>
          <table className="rc-table rc-summary-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Total Modules</th>
                <th>Max Marks</th>
                <th>Obtained</th>
                <th>Final Grade</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.domain}</td>
                <td className="rc-center">{totalModules}</td>
                <td className="rc-center">{totalMax}</td>
                <td className="rc-center rc-bold">{totalObtained}</td>
                <td className="rc-center" style={{ color: overallGrade.color, fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {overallGrade.grade}
                  <div className="rc-pct">{overallPct}%</div>
                </td>
                <td className="rc-center" style={{ color: overallPct >= 40 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                  {overallPct >= 40 ? 'PASS' : 'FAIL'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grading Scale */}
        <div className="rc-section">
          <h3 className="rc-section-title">GRADING SCALE</h3>
          <div className="rc-grading-scale">
            <div className="rc-grade-box" style={{ background: '#ecfdf5', borderColor: '#10b981' }}>
              <strong>O</strong>
              <span>Outstanding</span>
              <small>85-100%</small>
            </div>
            <div className="rc-grade-box" style={{ background: '#eff6ff', borderColor: '#3b82f6' }}>
              <strong>A+</strong>
              <span>Excellent</span>
              <small>75-84%</small>
            </div>
            <div className="rc-grade-box" style={{ background: '#eef2ff', borderColor: '#6366f1' }}>
              <strong>A</strong>
              <span>Very Good</span>
              <small>65-74%</small>
            </div>
            <div className="rc-grade-box" style={{ background: '#f5f3ff', borderColor: '#8b5cf6' }}>
              <strong>B+</strong>
              <span>Good</span>
              <small>55-64%</small>
            </div>
            <div className="rc-grade-box" style={{ background: '#fffbeb', borderColor: '#d97706' }}>
              <strong>B</strong>
              <span>Above Avg</span>
              <small>50-54%</small>
            </div>
            <div className="rc-grade-box" style={{ background: '#fef3c7', borderColor: '#f59e0b' }}>
              <strong>C</strong>
              <span>Average</span>
              <small>40-49%</small>
            </div>
          </div>
        </div>

        {/* Remarks */}
        {(data.overallRemarks || data.report) && (
          <div className="rc-section">
            <h3 className="rc-section-title">REMARKS</h3>
            <div className="rc-remarks-box">
              <p>{data.overallRemarks || data.report}</p>
            </div>
          </div>
        )}

        <div className="rc-signatures">
          <div className="rc-qr-section">
            <QRCodeSVG value={verifyUrl} size={64} />
            <span>Scan to Verify</span>
          </div>
          <div className="rc-sig-block">
            <strong>Issued by</strong>
            <span>Graxion</span>
          </div>
        </div>

        <div className="rc-footer">
          <p>This is an electronically generated report, hence does not require a signature and forms an official record of Graxion.</p>
          <p>https://graxion.in/internship/verify</p>
        </div>

      </div>
    </ResponsiveDocumentViewer>
  );
}
