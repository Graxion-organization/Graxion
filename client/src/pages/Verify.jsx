import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QRCodeSVG } from 'qrcode.react';
import { verifyAPI } from '../utils/api';
import CertificatePreview from '../admin/modules/internships/CertificatePreview';
import ReportCardPreview from '../admin/modules/internships/ReportCardPreview';
import {
  Shield,
  CheckCircle,
  XCircle,
  Search,
  Award,
  User,
  Briefcase,
  Calendar,
  Star,
  Loader,
  IdCard,
  Mail,
  FileText,
  X
} from 'lucide-react';
import './Verify.css';

export default function Verify() {
  const { certificateId: paramCertId } = useParams();
  const [searchId, setSearchId] = useState('');
  const [searchType, setSearchType] = useState('certificate'); // 'certificate', 'student'
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  
  const [viewingDoc, setViewingDoc] = useState(null); // { type: 'certificate' | 'report', data: object }

  // Auto-verify if certificate ID is in URL
  useEffect(() => {
    if (paramCertId) {
      setSearchId(paramCertId);
      handleVerify(paramCertId, 'certificate');
    }
  }, [paramCertId]);

  async function handleVerify(id = searchId, type = searchType) {
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setSearched(true);
    setViewingDoc(null);

    try {
      let response;
      if (type === 'certificate') {
        response = await verifyAPI.byCertificateId(id.trim());
        setResult({
          verified: true,
          data: response.data,
          multiple: false,
        });
      } else if (type === 'student') {
        response = await verifyAPI.byStudentId(id.trim());
        setResult({
          verified: true,
          data: response.data,
          multiple: Array.isArray(response.data),
        });
      }
    } catch (err) {
      if (err.status === 404) {
        setResult({ verified: false });
      } else {
        setError(err.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleVerify();
  }

  const certData = result?.multiple ? null : result?.data;
  const certList = result?.multiple ? result.data : null;

  return (
    <>
      <Helmet>
        <title>Verify Certificate — Graxion</title>
        <meta name="description" content="Verify the authenticity of Graxion internship and course certificates." />
      </Helmet>

      <div className="verify-page">
        {/* Background */}
        <div className="verify-bg">
          <div className="verify-orb verify-orb-1" />
          <div className="verify-orb verify-orb-2" />
          <div className="verify-grid-bg" />
        </div>

        <div className="verify-container">
          {/* Header */}
          <div className="verify-header">
            <div className="verify-logo">
              <div className="verify-logo-icon">
                <Shield size={24} />
              </div>
              <span>GRAXION</span>
            </div>
            <h1>Certificate Verification</h1>
            <p>Verify the authenticity of Graxion internship & course certificates</p>
          </div>

          {/* Search Card */}
          <div className="verify-search-card">
            <div className="verify-search-tabs">
              <button
                className={`verify-tab ${searchType === 'certificate' ? 'active' : ''}`}
                onClick={() => setSearchType('certificate')}
              >
                <Award size={16} />
                Certificate ID
              </button>
              <button
                className={`verify-tab ${searchType === 'student' ? 'active' : ''}`}
                onClick={() => setSearchType('student')}
              >
                <IdCard size={16} />
                Student ID
              </button>
            </div>

            <form onSubmit={handleSubmit} className="verify-search-form">
              <div className="verify-input-wrap">
                <Search size={18} />
                <input
                  type="text"
                  placeholder={
                    searchType === 'certificate'
                      ? 'Enter Certificate ID (e.g., GRX-INT...)'
                      : 'Enter Student ID (e.g., GRX-STD...)'
                  }
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="verify-search-btn" disabled={loading}>
                {loading ? <Loader size={18} className="spin-icon" /> : 'Verify'}
              </button>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="verify-error">
              <XCircle size={18} />
              {error}
            </div>
          )}

          {/* Result: NOT FOUND */}
          {searched && result && !result.verified && (
            <div className="verify-result verify-invalid">
              <div className="verify-result-icon invalid">
                <XCircle size={48} />
              </div>
              <h2>Records Not Found</h2>
              <p>
                The provided details do not match any verified certificate in our records.
                Please double-check and try again.
              </p>
            </div>
          )}

          {/* Result: VERIFIED - Single */}
          {result?.verified && certData && !result.multiple && (
            <div className="verify-result verify-valid">
              <div className="verify-result-icon valid">
                <CheckCircle size={48} />
              </div>
              <h2>Certificate Verified ✓</h2>
              <p className="verify-valid-msg">
                This certificate has been verified as authentic and was issued by Graxion.
              </p>

              <div className="verify-details-card">
                <div className="verify-detail-grid">
                  <div className="verify-detail">
                    <span className="verify-detail-label">
                      <User size={14} /> Student Name
                    </span>
                    <span className="verify-detail-value highlight">
                      {certData.studentName}
                    </span>
                  </div>
                  <div className="verify-detail">
                    <span className="verify-detail-label">
                      <IdCard size={14} /> Student ID
                    </span>
                    <span className="verify-detail-value mono">
                      {certData.studentId}
                    </span>
                  </div>
                  <div className="verify-detail">
                    <span className="verify-detail-label">
                      <Briefcase size={14} /> Program
                    </span>
                    <span className="verify-detail-value">
                      {certData.internshipTitle}
                    </span>
                  </div>
                  <div className="verify-detail">
                    <span className="verify-detail-label">Domain</span>
                    <span className="verify-detail-value domain">
                      {certData.domain}
                    </span>
                  </div>
                  <div className="verify-detail">
                    <span className="verify-detail-label">
                      <Calendar size={14} /> Duration
                    </span>
                    <span className="verify-detail-value">
                      {certData.startDate &&
                        new Date(certData.startDate).toLocaleDateString()} — {' '}
                      {certData.endDate &&
                        new Date(certData.endDate).toLocaleDateString()}
                      {certData.duration && ` (${certData.duration})`}
                    </span>
                  </div>
                  {certData.performanceRating && (
                    <div className="verify-detail">
                      <span className="verify-detail-label">
                        <Star size={14} /> Rating
                      </span>
                      <div className="verify-stars">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < certData.performanceRating ? '#f59e0b' : 'none'}
                            className={i < certData.performanceRating ? 'star-gold' : 'star-muted'}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {certData.mentor && (
                    <div className="verify-detail">
                      <span className="verify-detail-label">Mentor</span>
                      <span className="verify-detail-value">{certData.mentor}</span>
                    </div>
                  )}
                  <div className="verify-detail">
                    <span className="verify-detail-label">
                      <Award size={14} /> Certificate ID
                    </span>
                    <span className="verify-detail-value mono cyan">
                      {certData.certificateId}
                    </span>
                  </div>
                  <div className="verify-detail">
                    <span className="verify-detail-label">Issued Date</span>
                    <span className="verify-detail-value">
                      {certData.certificateIssuedDate &&
                        new Date(certData.certificateIssuedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="verify-doc-actions">
                  <button className="verify-btn-doc" onClick={() => setViewingDoc({ type: 'certificate', data: certData })}>
                    <Award size={18} /> View Certificate
                  </button>
                  <button className="verify-btn-doc" onClick={() => setViewingDoc({ type: 'report', data: certData })}>
                    <FileText size={18} /> View Report Card
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Result: VERIFIED - Multiple */}
          {result?.verified && certList && (
            <div className="verify-result verify-valid">
              <div className="verify-result-icon valid">
                <CheckCircle size={48} />
              </div>
              <h2>{certList.length} Record(s) Found ✓</h2>
              <p className="verify-valid-msg">
                These records have been verified as authentic and were issued by Graxion.
              </p>

              <div className="verify-multi-list">
                {certList.map((cert, i) => (
                  <div key={i} className="verify-multi-card">
                    <div className="verify-multi-header">
                      <h3>{cert.internshipTitle}</h3>
                      <span className="verify-multi-domain">{cert.domain}</span>
                    </div>
                    <div className="verify-multi-info">
                      <span><strong>Certificate:</strong> {cert.certificateId}</span>
                      <span><strong>Student:</strong> {cert.studentName}</span>
                      <span>
                        <strong>Period:</strong>{' '}
                        {cert.startDate && new Date(cert.startDate).toLocaleDateString()} — {' '}
                        {cert.endDate && new Date(cert.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="verify-doc-actions" style={{ marginTop: '1rem' }}>
                      <button className="verify-btn-doc" onClick={() => setViewingDoc({ type: 'certificate', data: cert })}>
                        <Award size={16} /> View Certificate
                      </button>
                      <button className="verify-btn-doc" onClick={() => setViewingDoc({ type: 'report', data: cert })}>
                        <FileText size={16} /> View Report Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="verify-footer">
            <p>© {new Date().getFullYear()} Graxion. All certificates are verified against our secure database.</p>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div className="verify-doc-modal">
          <div className="verify-doc-modal-content">
            <button className="verify-doc-close" onClick={() => setViewingDoc(null)}>
              <X size={24} />
            </button>
            <div className="verify-doc-scrollable">
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
