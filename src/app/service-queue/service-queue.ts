import { Component, inject, effect } from '@angular/core';
import { ServiceCard } from '../components/service-card/service-card';
import { CheckinModal } from '../components/checkin-modal/checkin-modal';
import { signal } from '@angular/core';
import { UiState } from '../core/services/uistate.service';
import { HourLog, WorkOrder } from '../models/work-order.model';
import { computed } from '@angular/core';
import { Note } from '../models/work-order.model';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-service-queue',
  imports: [ServiceCard, CheckinModal],
  templateUrl: './service-queue.html',
  styleUrl: './service-queue.css',
})
export class ServiceQueue {
  protected uiState = inject(UiState);
  toastService = inject(ToastService);

  constructor() {
    effect(() => {
      this.uiState.orderCount.set(this.workOrders().length);
    });
  }

  workOrders = signal<WorkOrder[]>([
    {
      id: 1,
      year: 2023,
      make: 'Toyota',
      model: 'Camry',
      status: 'inprogress',
      service: 'Oil change + tire rotation',
      customer: {
        name: 'James Whitfield',
        phone: '(817) 555-0142',
        email: 'jwhitfield@email.com',
      },
      checkInTime: '7:58 AM',
      assignedTo: '',
      estimatedHours: 1.5,
      loggedHours: 1,
      notes: [
        { author: 'Taylor B.', time: '08:14 AM', text: 'Customer requested full synthetic oil' },
      ],
      hourLogs: [{ hours: 1, author: 'Taylor B.', time: '9:15 AM' }],
    },
    {
      id: 2,
      year: 2019,
      make: 'Ford',
      model: 'F-150',
      status: 'inprogress',
      service: 'Transmission fluid flush',
      customer: {
        name: 'Maria Santos',
        phone: '(214) 555-0391',
        email: 'msantos@email.com',
      },
      checkInTime: '8:22 AM',
      assignedTo: 'Justin T.',
      estimatedHours: 3,
      loggedHours: 0,
      notes: [],
      hourLogs: [],
    },
    {
      id: 3,
      year: 2025,
      make: 'Chevrolet',
      model: 'Equinox',
      status: 'complete',
      service: 'Brake pad replacement',
      customer: {
        name: 'Derek Owens',
        phone: '(972) 555-0227',
        email: 'dowens@email.com',
      },
      checkInTime: '8:45 AM',
      assignedTo: 'Sam R.',
      estimatedHours: 2.5,
      loggedHours: 1.5,
      notes: [
        {
          author: 'Sam R.',
          time: '9:02 AM',
          text: 'Front pads near metal-on-metal - flagging for customer approval on rotors.',
        },
      ],
      hourLogs: [{ hours: 1.5, author: 'Sam R.', time: '9:30 AM' }],
    },
    {
      id: 4,
      year: 2018,
      make: 'Honda',
      model: 'Pilot',
      status: 'waiting',
      service: 'Air filter change',
      customer: {
        name: 'Seong Park',
        phone: '(972) 525-2473',
        email: 'spark@email.com',
      },
      checkInTime: '8:03 AM',
      assignedTo: 'Sam R.',
      estimatedHours: 1,
      loggedHours: 0,
      notes: [],
      hourLogs: [],
    },
    {
      id: 5,
      year: 2020,
      make: 'Cadillac',
      model: 'Escalade',
      status: 'waiting',
      service: 'Diagnostic (engine sound)',
      customer: {
        name: 'Jocelyn Gutierrez',
        phone: '(817) 551-9531',
        email: 'jgutierrez@email.com',
      },
      checkInTime: '8:54 AM',
      assignedTo: 'Taylor B.',
      estimatedHours: 1,
      loggedHours: 0,
      notes: [],
      hourLogs: [],
    },
  ]);

  selectedFilter = signal('active');

  activeOrders = computed(() =>
    this.workOrders().filter((o: WorkOrder) => o.status !== 'complete'),
  );
  waitingOrders = computed(() =>
    this.workOrders().filter((o: WorkOrder) => o.status === 'waiting'),
  );
  inProgressOrders = computed(() =>
    this.workOrders().filter((o: WorkOrder) => o.status === 'inprogress'),
  );
  completeOrders = computed(() =>
    this.workOrders().filter((o: WorkOrder) => o.status === 'complete'),
  );
  myOrders = computed(() =>
    this.workOrders().filter((o: WorkOrder) => o.assignedTo === 'Justin T.'),
  );

  totalEstimatedHours = this.workOrders().reduce((sum, o) => sum + o.estimatedHours, 0);

  setStatus(id: number, status: string) {
    this.workOrders.update((orders) => orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  setAssignedTo(id: number, name: string) {
    this.toastService.show('Assigned new task to me', 'generic');
    this.workOrders.update((orders) =>
      orders.map((o) => (o.id === id ? { ...o, assignedTo: name } : o)),
    );
  }

  setNotes(id: number, note: Note) {
    this.workOrders.update((orders) =>
      orders.map((o) => (o.id === id ? { ...o, notes: [...o.notes, note] } : o)),
    );
  }

  setHourLog(id: number, hourLog: HourLog) {
    console.log('setHourLog()');
    this.workOrders.update((orders) =>
      orders.map((o) =>
        o.id === id
          ? { ...o, hourLogs: [...o.hourLogs, hourLog], loggedHours: o.loggedHours + hourLog.hours }
          : o,
      ),
    );
  }

  setOrders(order: WorkOrder) {
    this.workOrders.update((orders) => [...orders, order]);
  }
}
