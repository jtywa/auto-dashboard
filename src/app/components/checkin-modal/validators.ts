import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const digits = (control.value ?? '').replace(/\D/g, '');
  return digits.length === 10 ? null : { invalidPhone: true };
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value ?? '';
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return valid ? null : { invalidEmail: true };
}
