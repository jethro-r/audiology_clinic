import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  
  // Format patterns: [regex, replacement]
  const patterns: [RegExp, string][] = [
    // NZ mobile: 021 123 456 or 021 123 4567
    [/^(02\d)(\d{3})(\d{3,4})$/, "$1 $2 $3"],
    // NZ landline: 04 123 456 or 04 123 4567
    [/^(0[34679])(\d{3})(\d{3,4})$/, "$1 $2 $3"],
    // US format: (123) 456-7890
    [/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3"],
  ];
  
  for (const [regex, replacement] of patterns) {
    if (regex.test(cleaned)) {
      return cleaned.replace(regex, replacement);
    }
  }
  
  // International or unrecognized: return original
  return phone;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters for length check
  const digitsOnly = phone.replace(/\D/g, "");
  
  // Accept phone numbers with 7-15 digits (covers most international formats)
  // NZ mobile: 9-10 digits (0211234567)
  // NZ landline: 8-9 digits (041234567)
  // International with country code: 10-15 digits
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return false;
  }
  
  // Must contain at least 7 digits and valid phone characters
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phoneRegex.test(phone);
}
