import { Component } from '@angular/core';
import { ServiceCard } from '../components/service-card/service-card';
import { CheckinModal } from '../components/checkin-modal/checkin-modal';
import { signal } from '@angular/core';
import { UiState } from '../core/services/uistate.service';
import { WorkOrder } from '../models/work-order.model';
import { computed } from '@angular/core';

@Component({
  selector: 'app-service-queue',
  imports: [ServiceCard, CheckinModal],
  templateUrl: './service-queue.html',
  styleUrl: './service-queue.css',
})
export class ServiceQueue {
  constructor(public uiState: UiState) {}

  workOrders = signal<WorkOrder[]>([
    {
      id: 1,
      year: 2021,
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
      assignedTo: 'Taylor B.',
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
      status: 'waiting',
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

  totalEstimatedHours = this.workOrders().reduce((sum, o) => sum + o.estimatedHours, 0);

  setStatus(id: number, status: string) {
    this.workOrders.update((orders) => orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }
}
