import { Component } from '@angular/core';
import { UiState } from '../../core/services/uistate.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private uiState: UiState) {}

  toggleCheckIn() {
    this.uiState.toggleShowCheckIn();
  }
}
