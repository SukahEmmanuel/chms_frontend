/** Simple validation helpers — extend as needed with Zod */

export type ValidationErrors = Record<string, string>;

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

export function validateRequired(value: string, label = 'This field'): string | null {
  if (!value || !value.trim()) return `${label} is required.`;
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null; // optional field
  const cleaned = phone.replace(/\s+/g, '');
  if (!/^\+?[\d]{9,15}$/.test(cleaned)) return 'Enter a valid phone number.';
  return null;
}

export function validateAmount(amount: string | number): string | null {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(n) || n <= 0) return 'Enter a valid amount greater than 0.';
  return null;
}

export function validateLoginForm(values: { email: string; password: string }): ValidationErrors {
  const errors: ValidationErrors = {};
  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;
  const pwErr = validatePassword(values.password);
  if (pwErr) errors.password = pwErr;
  return errors;
}

export function validateRegisterForm(values: {
  full_name: string;
  email: string;
  password: string;
  password2: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  const nameErr = validateRequired(values.full_name, 'Full name');
  if (nameErr) errors.full_name = nameErr;
  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;
  const pwErr = validatePassword(values.password);
  if (pwErr) errors.password = pwErr;
  if (values.password !== values.password2) errors.password2 = 'Passwords do not match.';
  return errors;
}
