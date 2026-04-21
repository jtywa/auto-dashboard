import { Component, inject } from '@angular/core';
import { UiState } from '../../core/services/uistate.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { output } from '@angular/core';
import { WorkOrder } from '../../models/work-order.model';
import { ToastService } from '../../core/services/toast.service';

function getTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

@Component({
  selector: 'app-checkin-modal',
  imports: [FormsModule],
  templateUrl: './checkin-modal.html',
  styleUrl: './checkin-modal.css',
})
export class CheckinModal {
  constructor(private uiState: UiState) {}

  toastService = inject(ToastService);

  years = Array.from({ length: 27 }, (_, i) => 2026 - i);

  closeModal() {
    // TODO: clear fields
    this.uiState.toggleShowCheckIn();
  }

  onSubmit(form: NgForm) {
    // TODO: form validation

    if (form.valid) {
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
      this.closeModal();
    } else {
      this.toastService.show('Complete all fields', 'failure');
    }
  }

  ordersChange = output<{ order: WorkOrder }>();
}
