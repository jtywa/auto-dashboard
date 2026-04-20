import { Component } from '@angular/core';
import { UiState } from '../../core/services/uistate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private uiState: UiState) {}

  today: number = Date.now();

  toggleCheckIn() {
    this.uiState.toggleShowCheckIn();
  }
}
