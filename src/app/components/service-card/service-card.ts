import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { WorkOrder } from '../../models/work-order.model';
import { input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
})
export class ServiceCard {
  order = input.required<WorkOrder>();
  showExpandedInfo = signal(false);
  showNoteInput = signal(false);
  showHoursInput = signal(false);

  @ViewChild('noteInput') noteInput!: ElementRef<HTMLInputElement>;
  @ViewChild('hoursInput') hoursInput!: ElementRef<HTMLInputElement>;

  toggleShowExpandedInfo() {
    this.showHoursInput.set(false);
    this.showNoteInput.set(false);
    this.showExpandedInfo.set(!this.showExpandedInfo());
  }

  focusNoteInput() {
    this.showExpandedInfo.set(true);
    this.showNoteInput.set(true);
    this.showHoursInput.set(false);
    setTimeout(() => {
      this.noteInput.nativeElement.focus();
    }, 0);
  }

  focusHoursInput() {
    this.showExpandedInfo.set(true);
    this.showHoursInput.set(true);
    this.showNoteInput.set(false);
    setTimeout(() => {
      this.hoursInput.nativeElement.focus();
    }, 0);
  }
}
