import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  // Student Details
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  rollNumber: {
    type: String,
    trim: true,
  },
  program: {
    type: String, // e.g., BCA, BTech
    trim: true,
  },
  semester: {
    type: String,
    trim: true,
  },
  institution: {
    type: String,
    trim: true,
  },
  photo: {
    type: String, // URL or file path
    default: null,
  },

  // Internship Details
  internshipTitle: {
    type: String,
    required: [true, 'Internship title is required'],
    trim: true,
  },
  domain: {
    type: String,
    required: [true, 'Domain is required'],
    enum: [
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
    ],
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  duration: {
    type: String, // e.g., "3 months", "6 weeks"
    trim: true,
  },

  // Performance
  performanceRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  tasksCompleted: {
    type: String,
    trim: true,
  },
  report: {
    type: String, // Detailed report/description
    trim: true,
  },
  mentor: {
    type: String,
    trim: true,
  },

  // Assessments for Report Card
  assessments: [
    {
      weekName: String,
      modules: [
        {
          subject: String,
          topics: String,
          maxMarks: { type: Number, default: 25 },
          obtainedMarks: { type: Number, default: 0 },
        }
      ]
    }
  ],
  overallRemarks: {
    type: String,
    trim: true,
  },


  // Certificate
  certificateId: {
    type: String,
    unique: true,
    sparse: true, // Allow nulls but enforce uniqueness when present
  },
  certificateIssued: {
    type: Boolean,
    default: false,
  },
  certificateIssuedDate: {
    type: Date,
    default: null,
  },

  // Status
  status: {
    type: String,
    enum: ['enrolled', 'ongoing', 'completed', 'certificate-issued', 'dropped'],
    default: 'enrolled',
  },

  // Type
  type: {
    type: String,
    enum: ['internship', 'course'],
    default: 'internship',
  },

  // Project Report Content
  projectReport: {
    certificateText: { type: String, trim: true },
    techStack: { type: String, trim: true },
    intro: { type: String, trim: true },
    objectives: { type: String, trim: true },
    methodology: { type: String, trim: true },
    outcomes: { type: String, trim: true },
    overallOutcomes: { type: String, trim: true },
    references: { type: String, trim: true },
  },

  // Metadata
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
}, {
  timestamps: true,
});

// Indexes for fast lookups
internshipSchema.index({ certificateId: 1 });
internshipSchema.index({ studentId: 1 });
internshipSchema.index({ email: 1 });
internshipSchema.index({ status: 1 });
internshipSchema.index({ domain: 1 });

// Virtual for formatted duration
internshipSchema.virtual('formattedDuration').get(function () {
  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 30) {
      const months = Math.round(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    const weeks = Math.round(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
  return this.duration || 'N/A';
});

internshipSchema.set('toJSON', { virtuals: true });

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
