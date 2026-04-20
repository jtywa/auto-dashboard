import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiState {
  private _showCheckIn = signal<boolean>(false);

  public readonly showCheckIn = this._showCheckIn.asReadonly();

  toggleShowCheckIn() {
    this._showCheckIn.update((prev) => !prev);
  }
}
