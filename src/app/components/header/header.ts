import { Component, inject, computed } from '@angular/core';
import { UiState } from '../../core/services/uistate.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  constructor(private uiState: UiState) {}

  private page = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.route.firstChild?.snapshot.data['page']),
      startWith(this.route.firstChild?.snapshot.data['page']),
    ),
  );

  title = computed(() => {
    switch (this.page()) {
      case 'home':
        return 'Service Queue';
      case 'techs':
        return 'Technicians';
      case 'reports':
        return 'Reports';
      default:
        return '';
    }
  });

  today: number = Date.now();

  toggleCheckIn() {
    this.uiState.toggleShowCheckIn();
  }
}
