import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QRCodeSVG } from 'qrcode.react';
import { verifyAPI } from '../utils/api';
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
} from 'lucide-react';
import './Verify.css';

export default function Verify() {
  const { certificateId: paramCertId } = useParams();
  const [searchId, setSearchId] = useState('');
  const [searchType, setSearchType] = useState('certificate'); // 'certificate' or 'student'
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

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

    try {
      let response;
      if (type === 'certificate') {
        response = await verifyAPI.byCertificateId(id.trim());
        setResult({
          verified: true,
          data: response.data,
          multiple: false,
        });
      } else {
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
                      ? 'Enter Certificate ID (e.g., GRX-INT-2026-A7F3B2)'
                      : 'Enter Student ID (e.g., GRX-STD-B2C1A7)'
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
              <h2>Certificate Not Found</h2>
              <p>
                The provided ID does not match any verified certificate in our records.
                Please double-check the ID and try again.
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
                This certificate has been verified as authentic and was issued by Graxion Technologies.
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
                  <div className="verify-detail">
                    <span className="verify-detail-label">Issued By</span>
                    <span className="verify-detail-value">
                      {certData.issuedBy || 'Graxion Technologies'}
                    </span>
                  </div>
                </div>

                {/* Share QR */}
                <div className="verify-share">
                  <div className="verify-qr">
                    <QRCodeSVG
                      value={window.location.href}
                      size={80}
                      bgColor="transparent"
                      fgColor="#00d4ff"
                      level="M"
                    />
                  </div>
                  <p className="verify-share-text">Share this verification</p>
                </div>
              </div>
            </div>
          )}

          {/* Result: VERIFIED - Multiple (Student ID) */}
          {result?.verified && certList && (
            <div className="verify-result verify-valid">
              <div className="verify-result-icon valid">
                <CheckCircle size={48} />
              </div>
              <h2>{certList.length} Certificate(s) Found</h2>

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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="verify-footer">
            <p>© {new Date().getFullYear()} Graxion Technologies. All certificates are verified against our secure database.</p>
          </div>
        </div>
      </div>
    </>
  );
}
