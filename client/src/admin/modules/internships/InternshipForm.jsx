import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AdminAuthContext';
import { internshipAPI } from '../../../utils/api';
import FormField from '../../components/FormField';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Star,
  FileText,
  ChevronLeft,
  Save,
  Loader,
  Plus,
  Trash2
} from 'lucide-react';
import './InternshipForm.css';

const DOMAINS = [
  'Artificial Intelligence',
  'Web Development',
  'App Development',
  'Cyber Security',
  'Cloud Computing',
  'Data Science',
  'Machine Learning',
  'Blockchain',
  'IoT',
  'Robotics',
  'UI/UX Design',
  'Digital Marketing',
  'Business Development',
  'Other',
];

const STATUS_OPTIONS = [
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'dropped', label: 'Dropped' },
];

const TYPE_OPTIONS = [
  { value: 'internship', label: 'Internship' },
  { value: 'course', label: 'Course' },
];

export default function InternshipForm() {
  const { adminPath } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    internshipTitle: '',
    domain: '',
    type: 'internship',
    description: '',
    startDate: '',
    endDate: '',
    duration: '',
    status: 'enrolled',
    performanceRating: '',
    tasksCompleted: '',
    report: '',
    mentor: '',
    overallRemarks: '',
    assessments: []
  });

  useEffect(() => {
    if (isEdit) {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await internshipAPI.getById(id);
      const d = response.data;
      setFormData({
        studentName: d.studentName || '',
        email: d.email || '',
        phone: d.phone || '',
        internshipTitle: d.internshipTitle || '',
        domain: d.domain || '',
        type: d.type || 'internship',
        description: d.description || '',
        startDate: d.startDate ? d.startDate.split('T')[0] : '',
        endDate: d.endDate ? d.endDate.split('T')[0] : '',
        duration: d.duration || '',
        status: d.status || 'enrolled',
        performanceRating: d.performanceRating || '',
        tasksCompleted: d.tasksCompleted || '',
        report: d.report || '',
        mentor: d.mentor || '',
        overallRemarks: d.overallRemarks || '',
        assessments: d.assessments || []
      });
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  // ---- Assessments Logic ----
  function addWeek() {
    setFormData((prev) => ({
      ...prev,
      assessments: [
        ...prev.assessments,
        { weekName: `Week ${prev.assessments.length + 1}`, modules: [] }
      ]
    }));
  }

  function removeWeek(weekIndex) {
    setFormData((prev) => ({
      ...prev,
      assessments: prev.assessments.filter((_, i) => i !== weekIndex)
    }));
  }

  function updateWeekName(weekIndex, name) {
    const newAssessments = [...formData.assessments];
    newAssessments[weekIndex].weekName = name;
    setFormData({ ...formData, assessments: newAssessments });
  }

  function addModule(weekIndex) {
    const newAssessments = [...formData.assessments];
    newAssessments[weekIndex].modules.push({
      subject: '',
      topics: '',
      maxMarks: 25,
      obtainedMarks: 0
    });
    setFormData({ ...formData, assessments: newAssessments });
  }

  function removeModule(weekIndex, moduleIndex) {
    const newAssessments = [...formData.assessments];
    newAssessments[weekIndex].modules = newAssessments[weekIndex].modules.filter((_, i) => i !== moduleIndex);
    setFormData({ ...formData, assessments: newAssessments });
  }

  function updateModule(weekIndex, moduleIndex, field, value) {
    const newAssessments = [...formData.assessments];
    newAssessments[weekIndex].modules[moduleIndex][field] = value;
    setFormData({ ...formData, assessments: newAssessments });
  }
  // ---------------------------

  function validateStep(stepNum) {
    const newErrors = {};
    if (stepNum === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
    }
    if (stepNum === 2) {
      if (!formData.internshipTitle.trim()) newErrors.internshipTitle = 'Title is required';
      if (!formData.domain) newErrors.domain = 'Domain is required';
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.endDate) newErrors.endDate = 'End date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      setStep(Object.keys(errors).some((k) =>
        ['studentName', 'email'].includes(k)) ? 1 : 2);
      return;
    }

    setSaving(true);
    try {
      const payload = { ...formData };
      if (payload.performanceRating) {
        payload.performanceRating = Number(payload.performanceRating);
      } else {
        delete payload.performanceRating;
      }

      if (isEdit) {
        await internshipAPI.update(id, payload);
      } else {
        await internshipAPI.create(payload);
      }
      navigate(`/${adminPath}/internships`);
    } catch (error) {
      console.error('Save failed:', error);
      setErrors({ submit: error.message || 'Failed to save' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="if-loading">
        <div className="admin-loading-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="internship-form-page">
      <div className="if-header">
        <button
          className="if-back-btn"
          onClick={() => navigate(`/${adminPath}/internships`)}
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <div>
          <h1>{isEdit ? 'Edit Record' : 'Add New Record'}</h1>
          <p>{isEdit ? 'Update internship/course details' : 'Create a new internship or course record'}</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="if-steps">
        {[
          { num: 1, label: 'Student' },
          { num: 2, label: 'Internship' },
          { num: 3, label: 'Performance' },
          { num: 4, label: 'Assessments' },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            className={`if-step ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
            onClick={() => setStep(s.num)}
          >
            <span className="if-step-num">{step > s.num ? '✓' : s.num}</span>
            <span className="if-step-label">{s.label}</span>
          </button>
        ))}
      </div>

      {errors.submit && (
        <div className="if-error-banner">⚠ {errors.submit}</div>
      )}

      <form onSubmit={handleSubmit} className="if-form-card">
        {/* Step 1: Student Details */}
        {step === 1 && (
          <div className="if-step-content">
            <div className="if-form-grid">
              <FormField
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter student full name"
                required
                error={errors.studentName}
                icon={User}
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@email.com"
                required
                error={errors.email}
                icon={Mail}
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                icon={Phone}
              />
              <FormField
                label="Record Type"
                name="type"
                type="select"
                value={formData.type}
                onChange={handleChange}
                options={TYPE_OPTIONS}
              />
            </div>
          </div>
        )}

        {/* Step 2: Internship Details */}
        {step === 2 && (
          <div className="if-step-content">
            <div className="if-form-grid">
              <FormField
                label="Title"
                name="internshipTitle"
                value={formData.internshipTitle}
                onChange={handleChange}
                placeholder="e.g., Full Stack Web Development Internship"
                required
                error={errors.internshipTitle}
                icon={Briefcase}
              />
              <FormField
                label="Domain"
                name="domain"
                type="select"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Select domain"
                options={DOMAINS}
                required
                error={errors.domain}
              />
              <FormField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                error={errors.startDate}
                icon={Calendar}
              />
              <FormField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                error={errors.endDate}
                icon={Calendar}
              />
              <FormField
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 months"
                hint="Will be auto-calculated if left empty"
              />
              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status}
                onChange={handleChange}
                options={STATUS_OPTIONS}
              />
            </div>
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the internship/course..."
              rows={3}
            />
          </div>
        )}

        {/* Step 3: Performance */}
        {step === 3 && (
          <div className="if-step-content">
            <div className="if-form-grid">
              <FormField
                label="Performance Rating"
                name="performanceRating"
                type="number"
                value={formData.performanceRating}
                onChange={handleChange}
                placeholder="1-5"
                min={1}
                max={5}
                step={0.5}
                icon={Star}
              />
              <FormField
                label="Mentor"
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                placeholder="Mentor name"
                icon={User}
              />
            </div>
            <FormField
              label="Tasks Completed"
              name="tasksCompleted"
              type="textarea"
              value={formData.tasksCompleted}
              onChange={handleChange}
              placeholder="List the major tasks or projects completed..."
              rows={4}
            />
            <FormField
              label="Overall Report / Remarks"
              name="overallRemarks"
              type="textarea"
              value={formData.overallRemarks}
              onChange={handleChange}
              placeholder="These remarks will appear on the Report Card..."
              rows={4}
              icon={FileText}
            />
          </div>
        )}

        {/* Step 4: Weekly Assessments */}
        {step === 4 && (
          <div className="if-step-content assessments-step">
            <div className="assessments-header">
              <h3>Weekly Assessments</h3>
              <button type="button" className="admin-btn-secondary" onClick={addWeek}>
                <Plus size={16} /> Add Week
              </button>
            </div>
            
            {formData.assessments.length === 0 ? (
              <p className="no-assessments">No assessments added yet. Click 'Add Week' to start grading.</p>
            ) : (
              <div className="assessments-list">
                {formData.assessments.map((week, wIndex) => (
                  <div key={wIndex} className="assessment-week">
                    <div className="week-header">
                      <input
                        type="text"
                        value={week.weekName}
                        onChange={(e) => updateWeekName(wIndex, e.target.value)}
                        placeholder="Week Name (e.g. Week 1)"
                        className="week-name-input"
                      />
                      <button type="button" className="icon-btn danger" onClick={() => removeWeek(wIndex)}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="modules-list">
                      {week.modules.map((mod, mIndex) => (
                        <div key={mIndex} className="module-row">
                          <input 
                            type="text" 
                            placeholder="Subject (e.g. Cyber Security)" 
                            value={mod.subject}
                            onChange={(e) => updateModule(wIndex, mIndex, 'subject', e.target.value)}
                            className="mod-input-lg"
                          />
                          <input 
                            type="text" 
                            placeholder="Topics Covered" 
                            value={mod.topics}
                            onChange={(e) => updateModule(wIndex, mIndex, 'topics', e.target.value)}
                            className="mod-input-lg"
                          />
                          <input 
                            type="number" 
                            placeholder="Max" 
                            value={mod.maxMarks}
                            onChange={(e) => updateModule(wIndex, mIndex, 'maxMarks', Number(e.target.value))}
                            className="mod-input-sm"
                            title="Max Marks"
                          />
                          <input 
                            type="number" 
                            placeholder="Obtained" 
                            value={mod.obtainedMarks}
                            onChange={(e) => updateModule(wIndex, mIndex, 'obtainedMarks', Number(e.target.value))}
                            className="mod-input-sm"
                            title="Obtained Marks"
                          />
                          <button type="button" className="icon-btn danger" onClick={() => removeModule(wIndex, mIndex)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button type="button" className="add-module-btn" onClick={() => addModule(wIndex)}>
                        <Plus size={14} /> Add Module
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="if-form-actions">
          {step > 1 && (
            <button type="button" className="admin-btn-secondary" onClick={prevStep}>
              <ChevronLeft size={16} />
              Previous
            </button>
          )}
          <div className="if-form-actions-right">
            {step < 4 ? (
              <button type="button" className="admin-btn-primary" onClick={nextStep}>
                Next Step
              </button>
            ) : (
              <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <Loader size={16} className="spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {isEdit ? 'Update Record' : 'Create Record'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
