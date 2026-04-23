import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { input, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-nav-button',
  imports: [NgClass],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.css',
})
export class NavButton {
  current = input<boolean>(false);
  label = input<string>();
  count = input<number>();

  toastService = inject(ToastService);

  onClick() {
    if (this.label() !== 'Service Queue') {
      const message = `Page coming soon`;
      this.toastService.show(message, 'generic');
    }
  }
}
