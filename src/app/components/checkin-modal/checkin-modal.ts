import { Component } from '@angular/core';
import { UiState } from '../../core/services/uistate.service';

@Component({
  selector: 'app-checkin-modal',
  imports: [],
  templateUrl: './checkin-modal.html',
  styleUrl: './checkin-modal.css',
})
export class CheckinModal {
  constructor(private uiState: UiState) {}

  closeModal() {
    // TODO: clear fields
    this.uiState.toggleShowCheckIn();
  }
}
