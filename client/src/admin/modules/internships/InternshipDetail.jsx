import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AdminAuthContext';
import { internshipAPI } from '../../../utils/api';
import CertificatePreview from './CertificatePreview';
import ReportCardPreview from './ReportCardPreview';
import Modal from '../../components/Modal';
import {
  ChevronLeft,
  Edit,
  Award,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Star,
  FileText,
  Clock,
  Download,
} from 'lucide-react';
import './InternshipDetail.css';

export default function InternshipDetail() {
  const { id } = useParams();
  const { adminPath } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showReportCard, setShowReportCard] = useState(false);
  const [issuingCert, setIssuingCert] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const response = await internshipAPI.getById(id);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleIssueCertificate() {
    setIssuingCert(true);
    try {
      const response = await internshipAPI.issueCertificate(id);
      setData(response.data);
    } catch (error) {
      alert(error.message || 'Failed to issue certificate');
    } finally {
      setIssuingCert(false);
    }
  }

  if (loading) {
    return (
      <div className="id-loading">
        <div className="admin-loading-spinner" />
        <p>Loading details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="id-loading">
        <p>Record not found</p>
      </div>
    );
  }

  const starRating = data.performanceRating
    ? Array.from({ length: 5 }, (_, i) => i < data.performanceRating)
    : null;

  return (
    <div className="internship-detail">
      {/* Header */}
      <div className="id-header">
        <button
          className="if-back-btn"
          onClick={() => navigate(`/${adminPath}/students/internships`)}
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <div className="id-header-info">
          <h1>{data.studentName}</h1>
          <span className={`status-badge ${data.status}`}>
            {data.status?.replace('-', ' ')}
          </span>
        </div>
        <div className="id-header-actions">
          <button
            className="admin-btn-secondary"
            onClick={() => navigate(`/${adminPath}/students/internships/${id}/edit`)}
          >
            <Edit size={16} />
            Edit
          </button>
          {data.certificateIssued ? (
            <>
              <button
                className="admin-btn-secondary"
                onClick={() => setShowReportCard(true)}
              >
                <FileText size={16} />
                Report Card
              </button>
              <button
                className="admin-btn-primary"
                onClick={() => setShowCertificate(true)}
              >
                <Download size={16} />
                Certificate
              </button>
            </>
          ) : (
            <button
              className="admin-btn-primary"
              onClick={handleIssueCertificate}
              disabled={issuingCert}
            >
              <Award size={16} />
              {issuingCert ? 'Issuing...' : 'Issue Certificate'}
            </button>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="id-grid">
        {/* Student Info */}
        <div className="id-card">
          <h3 className="id-card-title">
            <User size={18} />
            Student Information
          </h3>
          <div className="id-info-list">
            <div className="id-info-item">
              <span className="id-info-label">Full Name</span>
              <span className="id-info-value">{data.studentName}</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label">Student ID</span>
              <span className="id-info-value mono">{data.studentId}</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label"><Mail size={14} /> Email</span>
              <span className="id-info-value">{data.email}</span>
            </div>
            {data.phone && (
              <div className="id-info-item">
                <span className="id-info-label"><Phone size={14} /> Phone</span>
                <span className="id-info-value">{data.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Internship Info */}
        <div className="id-card">
          <h3 className="id-card-title">
            <Briefcase size={18} />
            {data.type === 'course' ? 'Course' : 'Internship'} Details
          </h3>
          <div className="id-info-list">
            <div className="id-info-item">
              <span className="id-info-label">Title</span>
              <span className="id-info-value">{data.internshipTitle}</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label">Domain</span>
              <span className="id-info-value domain-tag">{data.domain}</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label"><Calendar size={14} /> Duration</span>
              <span className="id-info-value">
                {data.startDate && new Date(data.startDate).toLocaleDateString()} — {' '}
                {data.endDate && new Date(data.endDate).toLocaleDateString()}
                {data.formattedDuration && ` (${data.formattedDuration})`}
              </span>
            </div>
            {data.mentor && (
              <div className="id-info-item">
                <span className="id-info-label">Mentor</span>
                <span className="id-info-value">{data.mentor}</span>
              </div>
            )}
            {data.description && (
              <div className="id-info-item full-width">
                <span className="id-info-label">Description</span>
                <span className="id-info-value">{data.description}</span>
              </div>
            )}
          </div>
        </div>

        {/* Performance */}
        <div className="id-card">
          <h3 className="id-card-title">
            <Star size={18} />
            Performance
          </h3>
          <div className="id-info-list">
            {starRating && (
              <div className="id-info-item">
                <span className="id-info-label">Rating</span>
                <div className="id-stars">
                  {starRating.map((filled, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={filled ? 'star-filled' : 'star-empty'}
                      fill={filled ? '#f59e0b' : 'none'}
                    />
                  ))}
                  <span className="id-rating-num">{data.performanceRating}/5</span>
                </div>
              </div>
            )}
            {data.tasksCompleted && (
              <div className="id-info-item full-width">
                <span className="id-info-label">Tasks Completed</span>
                <span className="id-info-value pre">{data.tasksCompleted}</span>
              </div>
            )}
            {data.report && (
              <div className="id-info-item full-width">
                <span className="id-info-label"><FileText size={14} /> Report</span>
                <span className="id-info-value pre">{data.report}</span>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Info */}
        <div className="id-card">
          <h3 className="id-card-title">
            <Award size={18} />
            Certificate
          </h3>
          <div className="id-info-list">
            <div className="id-info-item">
              <span className="id-info-label">Status</span>
              <span className="id-info-value">
                {data.certificateIssued ? (
                  <span className="id-cert-status issued">✓ Issued</span>
                ) : (
                  <span className="id-cert-status pending">Pending</span>
                )}
              </span>
            </div>
            {data.certificateId && (
              <div className="id-info-item">
                <span className="id-info-label">Certificate ID</span>
                <span className="id-info-value mono cyan">{data.certificateId}</span>
              </div>
            )}
            {data.certificateIssuedDate && (
              <div className="id-info-item">
                <span className="id-info-label">Issued Date</span>
                <span className="id-info-value">
                  {new Date(data.certificateIssuedDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <Modal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        title="Certificate Preview"
        size="xl"
      >
        <CertificatePreview data={data} />
      </Modal>

      {/* Report Card Modal */}
      <Modal
        isOpen={showReportCard}
        onClose={() => setShowReportCard(false)}
        title="Report Card Preview"
        size="xl"
      >
        <ReportCardPreview data={data} />
      </Modal>
    </div>
  );
}
