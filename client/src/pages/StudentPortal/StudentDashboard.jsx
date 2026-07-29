import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { studentAPI } from '../../utils/api';
import CertificatePreview from '../../admin/modules/internships/CertificatePreview';
import ReportCardPreview from '../../admin/modules/internships/ReportCardPreview';
import { LogOut, Award, FileText, Loader, Shield, User, X } from 'lucide-react';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewingDoc, setViewingDoc] = useState(null);

  const email = localStorage.getItem('studentEmail');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('studentToken');
      if (!token) {
        navigate('/student/login');
        return;
      }

      try {
        const res = await studentAPI.getDashboard(token);
        setInternships(res.data);
      } catch (err) {
        if (err.status === 401 || err.status === 403) {
          handleLogout();
        } else {
          setError(err.message || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentEmail');
    navigate('/student/login');
  };

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <Loader className="spin" size={40} />
      </div>
    );
  }

  const studentName = internships.length > 0 ? internships[0].studentName : 'Student';

  return (
    <>
      <Helmet>
        <title>Student Dashboard — Graxion</title>
      </Helmet>

      <div className="student-dashboard">
        {/* Header */}
        <header className="sd-header">
          <div className="sd-header-content">
            <div className="sd-brand">
              <Shield size={28} className="sd-brand-icon" />
              <span>Graxion Student Portal</span>
            </div>
            <div className="sd-user-actions">
              <div className="sd-user-info">
                <User size={18} />
                <span className="sd-email">{email}</span>
              </div>
              <button onClick={handleLogout} className="sd-logout-btn">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="sd-main">
          <div className="sd-welcome">
            <h1>Welcome back, {studentName}!</h1>
            <p>Manage and download your Graxion certificates and report cards below.</p>
          </div>

          {error && <div className="sd-error">{error}</div>}

          <div className="sd-grid">
            {internships.length === 0 ? (
              <div className="sd-empty">
                <Award size={48} className="sd-empty-icon" />
                <h3>No records found</h3>
                <p>We couldn't find any completed internships or courses linked to your email.</p>
              </div>
            ) : (
              internships.map((internship) => (
                <div key={internship._id} className="sd-card">
                  <div className="sd-card-header">
                    <span className="sd-card-type">{internship.type.toUpperCase()}</span>
                    <span className={`sd-card-status ${internship.status === 'completed' ? 'completed' : 'ongoing'}`}>
                      {internship.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="sd-card-title">{internship.internshipTitle}</h3>
                  <div className="sd-card-details">
                    <p><strong>Domain:</strong> {internship.domain}</p>
                    <p><strong>Certificate ID:</strong> {internship.certificateId || 'N/A'}</p>
                    {internship.certificateIssuedDate && (
                      <p><strong>Issued:</strong> {new Date(internship.certificateIssuedDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  
                  <div className="sd-card-actions">
                    {internship.certificateIssued ? (
                      <>
                        <button 
                          className="sd-btn-primary" 
                          onClick={() => setViewingDoc({ type: 'certificate', data: internship })}
                        >
                          <Award size={16} /> Certificate
                        </button>
                        <button 
                          className="sd-btn-secondary"
                          onClick={() => setViewingDoc({ type: 'report', data: internship })}
                        >
                          <FileText size={16} /> Report Card
                        </button>
                      </>
                    ) : (
                      <div className="sd-pending-msg">
                        Documents will be available once the program is marked as completed.
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div className="sd-modal">
          <div className="sd-modal-content">
            <button className="sd-modal-close" onClick={() => setViewingDoc(null)}>
              <X size={24} />
            </button>
            <div className="sd-modal-scrollable">
              {viewingDoc.type === 'certificate' ? (
                <CertificatePreview data={viewingDoc.data} />
              ) : (
                <ReportCardPreview data={viewingDoc.data} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
