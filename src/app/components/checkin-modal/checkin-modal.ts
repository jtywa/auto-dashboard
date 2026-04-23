import { Component, inject } from '@angular/core';
import { UiState } from '../../core/services/uistate.service';
import { FormsModule } from '@angular/forms';
import { NgForm, Validators } from '@angular/forms';
import { output } from '@angular/core';
import { WorkOrder } from '../../models/work-order.model';
import { ToastService } from '../../core/services/toast.service';
import { NhtsaService } from '../../core/services/nhtsa.service';
import { ChangeDetectorRef } from '@angular/core';
import { phoneValidator, emailValidator } from './validators';
import { PhoneFormatDirective } from './phone-format.directive';

function getTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

@Component({
  selector: 'app-checkin-modal',
  imports: [FormsModule, PhoneFormatDirective],
  templateUrl: './checkin-modal.html',
  styleUrl: './checkin-modal.css',
})
export class CheckinModal {
  private uiState = inject(UiState);
  private nhtsa = inject(NhtsaService);
  toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  years = Array.from({ length: 27 }, (_, i) => 2026 - i);

  makes: { MakeId: number; MakeName: string }[] = [];
  models: { Model_ID: number; Model_Name: string }[] = [];
  selectedYear: number | null = null;
  selectedMake: string | null = null;
  loadingMakes = false;
  loadingModels = false;

  onYearChange(year: number) {
    this.selectedYear = year;
    this.selectedMake = null;
    this.makes = [];
    this.models = [];

    if (!year) return;
    this.loadingMakes = true;

    this.nhtsa.getMakes(year).subscribe({
      next: (makes) => {
        this.makes = makes.sort((a, b) => a.MakeName.localeCompare(b.MakeName));
        this.loadingMakes = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingMakes = false;
      },
    });
  }

  onMakeChange(make: string) {
    this.selectedMake = make;
    this.models = [];

    if (!make || !this.selectedYear) return;
    this.loadingModels = true;

    this.nhtsa.getModels(this.selectedYear, make).subscribe({
      next: (models) => {
        this.models = models.sort((a, b) => a.Model_Name.localeCompare(b.Model_Name));
        this.loadingModels = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingModels = false;
      },
    });
  }

  closeModal() {
    // TODO: clear fields
    this.uiState.toggleShowCheckIn();
  }

  onSubmit(form: NgForm) {
    // TODO: form validation

    const phone = form.controls['phone'].value?.replace(/\D/g, '') ?? '';
    const email = form.controls['email'].value ?? '';
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (phone.length !== 10 || !emailValid) {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
      this.toastService.show('Invalid entry', 'failure');
      return;
    }

    if (!form.valid) {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
      this.toastService.show('Complete all fields', 'failure');
      return;
    }

    const newOrder: WorkOrder = {
      id: 9,
      year: form.value.year,
      make: form.value.make,
      model: form.value.model,
      status: 'waiting',
      service: form.value.service,
      customer: {
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email,
      },
      checkInTime: getTimestamp(),
      assignedTo: form.value.assignedTo,
      estimatedHours: form.value.estimatedHours,
      loggedHours: 0,
      notes: [],
      hourLogs: [],
    };
    this.ordersChange.emit({ order: newOrder });
    this.toastService.show('Added new work order', 'success');
    this.closeModal();
  }

  ordersChange = output<{ order: WorkOrder }>();
}
