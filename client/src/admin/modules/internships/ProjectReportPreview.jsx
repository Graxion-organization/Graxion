import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, X } from 'lucide-react';
import ResponsiveDocumentViewer from './ResponsiveDocumentViewer';
import './ProjectReportPreview.css';

export default function ProjectReportPreview({ data, onClose }) {
  const reportRef = useRef(null);
  
  const issueDate = data.certificateIssuedDate 
    ? new Date(data.certificateIssuedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const monthYear = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }).toUpperCase();
  const startDate = data.startDate ? new Date(data.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A';
  const endDate = data.endDate ? new Date(data.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A';

  async function handleDownloadPDF() {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`ProjectReport-${data.studentId || 'Draft'}.pdf`);
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
          <title>Print Project Report - Graxion</title>
          ${styleHtml}
          <style>
            @media print {
              body { margin: 0; padding: 0; background: #fff; }
              .pr-wrapper { padding: 0; }
              .pr-container { box-shadow: none; border: none; width: 100%; max-width: none; }
              .page-break { page-break-after: always; }
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

  const getDomainSpecificContent = (domain) => {
    if (domain === 'Backend Development' || domain === 'Web Development') {
      return {
        techStack: 'Node.js, Express.js & MongoDB',
        intro: [
          'Backend Development is the process of building the server-side logic that powers modern web applications. It manages business logic, databases, authentication, APIs, and communication between the frontend and the server.',
          'During this internship, I learned modern backend development using Node.js, Express.js, and MongoDB, which are widely used technologies for building scalable and high-performance web applications.',
          'Node.js is a JavaScript runtime environment that enables developers to build fast and scalable server-side applications using JavaScript.',
          'Express.js is a lightweight and flexible web application framework built on Node.js. It simplifies routing, middleware management, REST API development, request handling, and server configuration.',
          'MongoDB is a NoSQL document-oriented database that stores application data in JSON-like documents, making it flexible and efficient for modern applications.',
          'Authentication and authorization are essential parts of backend development. During the internship, I implemented secure login systems using JWT (JSON Web Token) and encrypted user passwords using bcrypt, ensuring secure user authentication and password protection.',
          'Version control was managed using Git and GitHub, allowing project tracking, collaboration, source code management, and deployment readiness.',
          'API testing and debugging were performed using Postman, which helped verify API endpoints, request validation, authentication, and response handling.',
          'Development was carried out using Visual Studio Code, providing an efficient environment for coding, debugging, and project organization.',
          'Throughout the internship, I learned RESTful API architecture, CRUD operations, middleware implementation, authentication, database integration, project structuring, environment configuration, and backend best practices.',
          'This internship provided practical industry exposure and significantly improved my understanding of backend application development, software engineering principles, clean coding practices, debugging techniques, and deployment-ready project architecture.',
          'The report explains the technologies studied, methodology followed, practical work performed, technical skills acquired, and the overall learning outcomes achieved during the internship.'
        ],
        objectives: [
          'To understand the fundamentals of Backend Development and server-side programming.',
          'To learn the architecture and working principles of Node.js applications.',
          'To gain practical knowledge of Express.js framework for developing RESTful APIs.',
          'To understand MongoDB database concepts including collections, documents, CRUD operations, and schema design.',
          'To learn secure authentication using JWT (JSON Web Token).',
          'To understand password hashing and security using bcrypt.',
          'To develop APIs capable of handling client requests and server responses efficiently.',
          'To understand middleware, routing, request validation, and error handling in Express.js.',
          'To gain practical experience using Git and GitHub for version control and collaborative development.',
          'To learn API testing, debugging, and documentation using Postman.',
          'To understand environment configuration using dotenv and project organization techniques.',
          'To improve logical thinking, debugging skills, and problem-solving abilities while developing backend applications.',
          'To enhance teamwork, communication, documentation, and professional development skills.',
          'To apply theoretical knowledge gained during the BCA course in real-world backend development projects.'
        ],
        methodology: [
          'Attended the internship orientation session to understand the project objectives, workflow, coding standards, and development environment.',
          'Installed and configured Node.js, MongoDB, Git, GitHub, Visual Studio Code, and Postman for backend development.',
          'Learned JavaScript fundamentals required for server-side programming.',
          'Understood the architecture and execution model of Node.js.',
          'Developed RESTful APIs using Express.js and implemented proper routing mechanisms.',
          'Created MongoDB databases and performed CRUD operations using collections and documents.',
          'Integrated MongoDB with Node.js applications for dynamic data storage and retrieval.',
          'Implemented user registration and login systems using JWT authentication and bcrypt password encryption.',
          'Learned middleware implementation for authentication, authorization, logging, validation, and error handling.',
          'Practiced environment variable management using dotenv for secure application configuration.',
          'Used Git and GitHub to maintain source code, manage versions, create repositories, and track project history.',
          'Tested API endpoints using Postman by sending GET, POST, PUT, PATCH, and DELETE requests.',
          'Debugged server-side errors and optimized application performance through continuous testing.',
          'Followed clean coding standards, modular project architecture, and organized folder structures.',
          'Received continuous feedback from mentors to improve coding quality, debugging skills, API design, and backend architecture.',
          'Recorded daily learning activities, completed practical assignments, and successfully developed backend modules during the internship.'
        ],
        outcomes: [
          'Gained a strong understanding of Backend Development concepts and server-side application architecture.',
          'Developed practical knowledge of Node.js for building scalable backend applications.',
          'Learned Express.js framework for creating secure and efficient RESTful APIs.',
          'Successfully performed CRUD operations using MongoDB databases.',
          'Understood the integration of backend applications with MongoDB using modern development practices.',
          'Learned secure authentication using JWT and password encryption using bcrypt.',
          'Improved API development, request handling, middleware implementation, and routing techniques.',
          'Gained practical experience using Git and GitHub for source code management and version control.',
          'Learned API testing and debugging using Postman.',
          'Improved debugging, logical thinking, and problem-solving skills while working on backend applications.',
          'Understood project structure, modular coding practices, environment configuration, and backend security principles.',
          'Enhanced communication, teamwork, documentation, and time management skills while working in a professional environment.',
          'Successfully applied classroom knowledge to real-world backend development projects.'
        ],
        overallOutcomes: 'The internship provided valuable industry exposure and strengthened both my technical and professional capabilities. Through hands-on development using Node.js, Express.js, MongoDB, JWT, bcrypt, Git, GitHub, Visual Studio Code, and Postman, I developed practical backend development skills and gained confidence in building secure, scalable, and production-ready web applications. The internship prepared me to contribute effectively to modern software development projects and established a strong foundation for my future career as a Backend Developer.',
        references: [
          'Node.js Official Documentation.',
          'Express.js Official Documentation.',
          'MongoDB Official Documentation.',
          'JWT (JSON Web Token) Documentation.',
          'bcrypt Official Documentation.',
          'Git Official Documentation.',
          'GitHub Documentation.',
          'Postman Learning Center.',
          'Visual Studio Code Official Documentation.',
          'MDN Web Docs (JavaScript Reference).',
          'Training material and practical assignments provided by Graxion.',
          'Internet resources, developer blogs, and educational platforms related to Backend Development.'
        ]
      };
    }

    return {
      techStack: 'Industry Standard Tools & Technologies',
      intro: [
        `This internship focused on practical skill development and project execution in the field of ${domain}.`,
        'During the internship period, I was exposed to modern industry practices, tools, and methodologies required for professional software development and engineering.',
        'The primary focus was on bridging the gap between theoretical knowledge and real-world application through hands-on assignments and mentorship.',
        'Version control was managed using standard tools like Git and GitHub, allowing project tracking, collaboration, and source code management.',
        'Throughout the internship, I learned core concepts, best practices, project structuring, environment configuration, and professional workflows.',
        `This internship provided practical industry exposure and significantly improved my understanding of ${domain}, software engineering principles, clean coding practices, and debugging techniques.`,
        'The report explains the technologies studied, methodology followed, practical work performed, technical skills acquired, and the overall learning outcomes achieved during the internship.'
      ],
      objectives: [
        `To understand the fundamentals of ${domain} and related technologies.`,
        'To gain practical knowledge of industry-standard frameworks and tools.',
        'To develop applications and solutions capable of handling real-world requirements efficiently.',
        'To gain practical experience using Git and GitHub for version control and collaborative development.',
        'To improve logical thinking, debugging skills, and problem-solving abilities.',
        'To enhance teamwork, communication, documentation, and professional development skills.',
        `To apply theoretical knowledge gained during the academic course in real-world ${domain} projects.`
      ],
      methodology: [
        'Attended the internship orientation session to understand the project objectives, workflow, coding standards, and development environment.',
        'Installed and configured the necessary development environment and tools.',
        'Learned the fundamental concepts and architecture required for the domain.',
        'Developed projects and assignments following industry best practices.',
        'Used Git and GitHub to maintain source code, manage versions, create repositories, and track project history.',
        'Tested and debugged the application through continuous testing and validation.',
        'Followed clean coding standards, modular project architecture, and organized folder structures.',
        'Received continuous feedback from mentors to improve coding quality and architecture.',
        'Recorded daily learning activities, completed practical assignments, and successfully developed modules during the internship.'
      ],
      outcomes: [
        `Gained a strong understanding of ${domain} concepts and application architecture.`,
        'Developed practical knowledge of relevant tools and technologies.',
        'Gained practical experience using Git and GitHub for source code management and version control.',
        'Improved debugging, logical thinking, and problem-solving skills.',
        'Understood project structure, modular coding practices, and environment configuration.',
        'Enhanced communication, teamwork, documentation, and time management skills while working in a professional environment.',
        'Successfully applied classroom knowledge to real-world projects.'
      ],
      overallOutcomes: `The internship provided valuable industry exposure and strengthened both my technical and professional capabilities. Through hands-on development in ${domain}, I developed practical skills and gained confidence in building professional applications. The internship prepared me to contribute effectively to modern software development projects and established a strong foundation for my future career.`,
      references: [
        'Official Technology Documentation.',
        'Git Official Documentation.',
        'GitHub Documentation.',
        'Training material and practical assignments provided by Graxion.',
        `Internet resources, developer blogs, and educational platforms related to ${domain}.`
      ]
    };
  };

  const parseLines = (customText, defaultArray) => {
    if (customText && customText.trim() !== '') {
      return customText.split('\n').filter(line => line.trim() !== '');
    }
    return defaultArray;
  };

  const dbReport = data.projectReport || {};
  const defaultContent = getDomainSpecificContent(data.domain || 'Backend Development');

  const content = {
    techStack: (dbReport.techStack && dbReport.techStack.trim() !== '') ? dbReport.techStack : defaultContent.techStack,
    intro: parseLines(dbReport.intro, defaultContent.intro),
    objectives: parseLines(dbReport.objectives, defaultContent.objectives),
    methodology: parseLines(dbReport.methodology, defaultContent.methodology),
    outcomes: parseLines(dbReport.outcomes, defaultContent.outcomes),
    overallOutcomes: (dbReport.overallOutcomes && dbReport.overallOutcomes.trim() !== '') ? dbReport.overallOutcomes : defaultContent.overallOutcomes,
    references: parseLines(dbReport.references, defaultContent.references),
  };
  const studentIdStr = data.studentId || 'GRX-STD-XXXXXX';
  const certIdStr = data.certificateId || 'GRX-INT-XXXXXX';

  return (
    <ResponsiveDocumentViewer 
      documentWidth={794} 
      documentHeight={1123}
      actions={
        <>
          <button className="admin-btn-secondary verify-btn-doc" onClick={handleDownloadPDF}>
            <Download size={16} />
            Download PDF
          </button>
          <button className="admin-btn-secondary verify-btn-doc" onClick={handlePrint}>
            <Printer size={16} />
            Print Report
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
      <div className="pr-container" ref={reportRef}>
        
        {/* ================= PAGE 1: TITLE PAGE ================= */}
        <div className="pr-page page-break pr-center-page">
          <h1 className="pr-main-title">INTERNSHIP REPORT</h1>
          <h2 className="pr-domain">{data.domain || 'Backend Development'}</h2>
          <h3 className="pr-tech">using {content.techStack}</h3>
          
          <div className="pr-submitted-by">
            <h4>Submitted By:</h4>
            <table className="pr-table-info">
              <tbody>
                <tr><td><strong>Name:</strong></td><td>{data.studentName}</td></tr>
                <tr><td><strong>Roll Number:</strong></td><td>{data.rollNumber || '______________'}</td></tr>
                <tr><td><strong>Program:</strong></td><td>{data.program || '______________'}</td></tr>
                <tr><td><strong>Semester:</strong></td><td>{data.semester || '______________'}</td></tr>
                <tr><td><strong>Institution:</strong></td><td>{data.institution || '______________'}</td></tr>
                <tr><td><strong>Organization:</strong></td><td>Graxion</td></tr>
                <tr><td><strong>Internship Duration:</strong></td><td>{startDate} – {endDate} ({data.duration || 'N/A'})</td></tr>
                <tr><td><strong>Student ID:</strong></td><td>{studentIdStr}</td></tr>
                <tr><td><strong>Certificate ID:</strong></td><td>{certIdStr}</td></tr>
                <tr><td><strong>Issued Date:</strong></td><td>{issueDate}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="pr-verification">
            <h4>Certificate Verification:</h4>
            <a href={`https://www.graxion.in/internship/verify/${certIdStr}`}>https://www.graxion.in/internship/verify/{certIdStr}</a><br/>
            <a href={`https://www.graxion.in/internship/verify/${studentIdStr}`}>https://www.graxion.in/internship/verify/{studentIdStr}</a>
          </div>

          <div className="pr-submitted-to">
            <h4>Submitted to:</h4>
            <p>{data.mentor || '______________'}</p>
            <p className="pr-month-year">[{monthYear}]</p>
          </div>
        </div>

        {/* ================= PAGE 2: CERTIFICATE ================= */}
        <div className="pr-page page-break">
          <h2 className="pr-section-title">2. Certificate</h2>
          <p className="pr-text" style={{ marginTop: '40px', fontStyle: 'italic', color: '#666' }}>
            [Attach or print the official Graxion Internship Certificate here]
          </p>
        </div>

        {/* ================= PAGE 4: INTRODUCTION ================= */}
        <div className="pr-page page-break">
          <h2 className="pr-section-title">3. Introduction</h2>
          {content.intro.map((para, idx) => (
            <p key={idx} className="pr-text">{para}</p>
          ))}
        </div>

        {/* ================= PAGE 5: OBJECTIVES ================= */}
        <div className="pr-page page-break">
          <h2 className="pr-section-title">4. Objectives</h2>
          <ul className="pr-list">
            {content.objectives.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </div>

        {/* ================= PAGE 6: METHODOLOGY ================= */}
        <div className="pr-page page-break">
          <h2 className="pr-section-title">5. Methodology</h2>
          <ul className="pr-list">
            {content.methodology.map((method, idx) => (
              <li key={idx}>{method}</li>
            ))}
          </ul>
        </div>

        {/* ================= PAGE 6: OUTCOMES ================= */}
        <div className="pr-page page-break">
          <h2 className="pr-section-title">6. Outcomes</h2>
          <ul className="pr-list">
            {content.outcomes.map((outcome, idx) => (
              <li key={idx}>{outcome}</li>
            ))}
          </ul>
          
          <h3 className="pr-subsection-title">Overall Outcomes</h3>
          <p className="pr-text">{content.overallOutcomes}</p>
        </div>

        {/* ================= PAGE 7: REFERENCES ================= */}
        <div className="pr-page">
          <h2 className="pr-section-title">7. References</h2>
          <p className="pr-text">The following resources were referred to during the internship and while preparing this report:</p>
          <ul className="pr-list">
            {content.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
          <div className="pr-verification-refs">
            <p>Internship verification portal:</p>
            <a href={`https://www.graxion.in/internship/verify/${certIdStr}`}>https://www.graxion.in/internship/verify/{certIdStr}</a><br/>
            <a href={`https://www.graxion.in/internship/verify/${studentIdStr}`}>https://www.graxion.in/internship/verify/{studentIdStr}</a>
          </div>
        </div>

      </div>
    </ResponsiveDocumentViewer>
  );
}
