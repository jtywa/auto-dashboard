import { Component } from '@angular/core';
import { input, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.css',
})
export class NavButton {
  label = input<string>();
  count = input<number>();
  path = input<string>();

  toastService = inject(ToastService);
}
