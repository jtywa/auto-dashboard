import { Component, signal, ViewChild, ElementRef, inject } from '@angular/core';
import { WorkOrder } from '../../models/work-order.model';
import { input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Note, HourLog } from '../../models/work-order.model';
import { ToastService } from '../../core/services/toast.service';

function getTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

@Component({
  selector: 'app-service-card',
  imports: [NgClass],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
})
export class ServiceCard {
  order = input.required<WorkOrder>();
  showExpandedInfo = signal(false);
  showNoteInput = signal(false);
  showHoursInput = signal(false);

  toastService = inject(ToastService);

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

  submitNote(text: string) {
    if (text) {
      this.showNoteInput.set(false);
      const now = getTimestamp();
      // TODO: Replace hardcoded name with logged-in user's name
      // TODO: Add input validation
      const newNote = { author: 'Justin T.', time: now, text: text };
      this.notesChange.emit({ id: this.order().id, note: newNote });
      this.toastService.show('Added a new note', 'success');
    } else {
      this.toastService.show('Note cannot be empty', 'failure');
    }
  }

  submitHourLog(hours: number) {
    if (hours > 0 && hours % 0.25 === 0) {
      const now = getTimestamp();
      const newHourLog: HourLog = { author: 'Justin T.', hours: hours, time: now };
      this.hourLogChange.emit({ id: this.order().id, hourLog: newHourLog });
      this.toastService.show('Logged hours', 'success');
    } else {
      this.toastService.show('Invalid hours', 'failure');
    }
  }

  startWorkOrder() {
    this.toastService.show('Started work order', 'generic');
    this.statusChange.emit({ id: this.order().id, status: 'inprogress' });
  }

  completeWorkOrder() {
    this.toastService.show('Completed work order', 'success');
    this.statusChange.emit({ id: this.order().id, status: 'complete' });
  }

  statusChange = output<{ id: number; status: string }>();
  assignedToChange = output<{ id: number; name: string }>();
  notesChange = output<{ id: number; note: Note }>();
  hourLogChange = output<{ id: number; hourLog: HourLog }>();
}
