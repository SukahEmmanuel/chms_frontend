// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole =
  | 'super_admin'
  | 'area_admin'
  | 'district_admin'
  | 'local_admin'
  | 'pastor'
  | 'finance_officer'
  | 'department_leader'
  | 'member';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  assembly?: ChurchUnit;
  avatar?: string;
  is_active: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  password2: string;
  role?: UserRole;
  assembly_id?: number;
}

// ─── Church Structure ─────────────────────────────────────────────────────────

export type ChurchUnitType = 'national' | 'area' | 'district' | 'local';

export interface ChurchUnit {
  id: number;
  name: string;
  unit_type: ChurchUnitType;
  parent?: ChurchUnit;
  leader?: User;
}

export interface Department {
  id: number;
  name: string;
  assembly: ChurchUnit;
  leader?: User;
  member_count?: number;
}

// ─── Member ───────────────────────────────────────────────────────────────────

export type MembershipStatus = 'active' | 'inactive' | 'transferred';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type Gender = 'male' | 'female';

export interface Member {
  id: number;
  full_name: string;
  gender: Gender;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  address?: string;
  marital_status: MaritalStatus;
  occupation?: string;
  assembly: ChurchUnit;
  departments: Department[];
  is_baptised: boolean;
  membership_status: MembershipStatus;
  date_joined?: string;
  spouse?: Member;
  avatar?: string;
}

export interface MemberFormData {
  full_name: string;
  gender: Gender;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  address?: string;
  marital_status: MaritalStatus;
  occupation?: string;
  assembly_id: number;
  department_ids?: number[];
  is_baptised: boolean;
  membership_status: MembershipStatus;
}

// ─── Attendance ───────────────────────────────────────────────────────────────

export type ServiceType =
  | 'sunday_service'
  | 'midweek_service'
  | 'special_program'
  | 'department_meeting';

export interface AttendanceSession {
  id: number;
  service_type: ServiceType;
  date: string;
  assembly: ChurchUnit;
  department?: Department;
  total_present: number;
  total_absent: number;
  created_by: User;
  notes?: string;
}

export interface AttendanceRecord {
  id: number;
  session: AttendanceSession;
  member: Member;
  is_present: boolean;
}

export interface AttendanceFormData {
  service_type: ServiceType;
  date: string;
  assembly_id: number;
  department_id?: number;
  notes?: string;
  present_member_ids: number[];
}

// ─── Finance ──────────────────────────────────────────────────────────────────

export type ContributionType =
  | 'tithe'
  | 'offering'
  | 'welfare'
  | 'pledge'
  | 'special_donation';

export interface Contribution {
  id: number;
  contribution_type: ContributionType;
  amount: number;
  member?: Member;
  is_anonymous: boolean;
  assembly: ChurchUnit;
  date: string;
  recorded_by: User;
  notes?: string;
}

export interface ContributionFormData {
  contribution_type: ContributionType;
  amount: number;
  member_id?: number;
  is_anonymous: boolean;
  assembly_id: number;
  date: string;
  notes?: string;
}

// ─── Events ───────────────────────────────────────────────────────────────────

export interface Event {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  assembly: ChurchUnit;
  departments: Department[];
  created_by: User;
}

// ─── API / Pagination ─────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  [key: string]: string | string[] | undefined;
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}
