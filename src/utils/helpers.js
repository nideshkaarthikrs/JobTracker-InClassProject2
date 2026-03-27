import { format, parseISO } from 'date-fns'

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return format(parseISO(dateStr), 'MMM dd, yyyy')
  } catch (e) {
    return dateStr
  }
}

// dropdown options
export const STATUS_OPTIONS = ['Applied', 'Interviewing', 'Offer Received', 'Rejected']

export const PLATFORM_OPTIONS = [
  'LinkedIn',
  'Company Website',
  'Referral',
  'Indeed',
  'Glassdoor',
  'Other',
]

export const LOCATION_OPTIONS = ['Remote', 'On-Site', 'Hybrid']

export const STATUS_COLORS = {
  Applied: '#3B82F6',
  Interviewing: '#F59E0B',
  'Offer Received': '#10B981',
  Rejected: '#EF4444',
}

export function generateId() {
  return 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// sample data to show on first load
export const SAMPLE_JOBS = [
  {
    id: 'job_001',
    company: 'Google',
    role: 'Frontend Engineer',
    location: 'Remote',
    salary: 140000,
    platform: 'LinkedIn',
    status: 'Interviewing',
    appliedDate: '2026-02-15',
    interviewDate: '2026-03-01',
    notes: 'Technical screen passed. Waiting for onsite.',
    bookmarked: true,
  },
  {
    id: 'job_002',
    company: 'Meta',
    role: 'React Developer',
    location: 'On-Site',
    salary: 155000,
    platform: 'Company Website',
    status: 'Applied',
    appliedDate: '2026-02-20',
    interviewDate: '',
    notes: 'Applied via careers portal.',
    bookmarked: false,
  },
  {
    id: 'job_003',
    company: 'Stripe',
    role: 'Software Engineer',
    location: 'Hybrid',
    salary: 160000,
    platform: 'Referral',
    status: 'Offer Received',
    appliedDate: '2026-01-10',
    interviewDate: '2026-01-25',
    notes: 'Offer received! Negotiating salary.',
    bookmarked: true,
  },
  {
    id: 'job_004',
    company: 'Amazon',
    role: 'Full Stack Developer',
    location: 'On-Site',
    salary: 130000,
    platform: 'Indeed',
    status: 'Rejected',
    appliedDate: '2026-01-28',
    interviewDate: '2026-02-10',
    notes: 'Rejected after final round.',
    bookmarked: false,
  },
  {
    id: 'job_005',
    company: 'Airbnb',
    role: 'UI Engineer',
    location: 'Remote',
    salary: 145000,
    platform: 'LinkedIn',
    status: 'Applied',
    appliedDate: '2026-03-01',
    interviewDate: '',
    notes: '',
    bookmarked: false,
  },
  {
    id: 'job_006',
    company: 'Netflix',
    role: 'Senior Frontend Developer',
    location: 'Hybrid',
    salary: 175000,
    platform: 'Glassdoor',
    status: 'Interviewing',
    appliedDate: '2026-02-25',
    interviewDate: '2026-03-10',
    notes: 'First round scheduled.',
    bookmarked: true,
  },
]
