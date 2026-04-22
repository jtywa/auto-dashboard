import { Component, inject } from '@angular/core';
import { NavButton } from '../nav-button/nav-button';
import { UserBox } from '../user-box/user-box';
import { UiState } from '../../core/services/uistate.service';

@Component({
  selector: 'app-sidebar',
  imports: [NavButton, UserBox],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected uiState = inject(UiState);
}
