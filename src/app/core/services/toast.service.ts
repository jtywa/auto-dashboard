import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: string;
  removing?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, type = 'generic') {
    const id = this.nextId++;
    this.toasts.update((t) => [{ id, message, type, removing: true }, ...t]);

    // flip to visible on next frame to trigger fade in
    requestAnimationFrame(() => {
      this.toasts.update((t) =>
        t.map((toast) => (toast.id === id ? { ...toast, removing: false } : toast)),
      );
    });

    setTimeout(() => this.startDismiss(id), 5000);
  }

  startDismiss(id: number) {
    // mark as removing to trigger fade out CSS class
    this.toasts.update((t) =>
      t.map((toast) => (toast.id === id ? { ...toast, removing: true } : toast)),
    );
    // remove from DOM after transition finishes
    setTimeout(() => this.dismiss(id), 200);
  }

  dismiss(id: number) {
    this.toasts.update((t) => t.filter((toast) => toast.id !== id));
  }
}
