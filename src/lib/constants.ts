import { SelectOption } from '@/types';

export const APP_NAME = 'PCMS';
export const APP_FULL_NAME = 'Church of Pentecost Management System';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  MEMBERS: '/members',
  ATTENDANCE: '/attendance',
  FINANCE: '/finance',
  EVENTS: '/events',
  REPORTS: '/reports',
} as const;

export const SERVICE_TYPE_OPTIONS: SelectOption[] = [
  { value: 'sunday_service', label: 'Sunday Service' },
  { value: 'midweek_service', label: 'Midweek Service' },
  { value: 'special_program', label: 'Special Program' },
  { value: 'department_meeting', label: 'Department Meeting' },
];

export const CONTRIBUTION_TYPE_OPTIONS: SelectOption[] = [
  { value: 'tithe', label: 'Tithe' },
  { value: 'offering', label: 'Offering' },
  { value: 'welfare', label: 'Welfare' },
  { value: 'pledge', label: 'Pledge' },
  { value: 'special_donation', label: 'Special Donation' },
];

export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const MARITAL_STATUS_OPTIONS: SelectOption[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export const MEMBERSHIP_STATUS_OPTIONS: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'transferred', label: 'Transferred' },
];

export const ROLE_OPTIONS: SelectOption[] = [
  { value: 'local_admin', label: 'Local Church Admin' },
  { value: 'pastor', label: 'Pastor' },
  { value: 'finance_officer', label: 'Finance Officer' },
  { value: 'department_leader', label: 'Department Leader' },
  { value: 'member', label: 'Member' },
];

export const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  area_admin: 'Area Admin',
  district_admin: 'District Admin',
  local_admin: 'Local Church Admin',
  pastor: 'Pastor',
  finance_officer: 'Finance Officer',
  department_leader: 'Department Leader',
  member: 'Member',
};

// Roles that can access the admin dashboard
export const ADMIN_ROLES = [
  'super_admin',
  'area_admin',
  'district_admin',
  'local_admin',
  'pastor',
  'finance_officer',
  'department_leader',
];
