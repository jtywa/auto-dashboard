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

  workOrders: WorkOrder[] = [
    {
      id: 1,
      year: 2025,
      make: 'Toyota',
      model: 'Camry',
      status: 'inprogress',
      service: 'Oil change + tire rotation',
      customer: {
        name: 'James Whitfield',
        phone: '(555) 123-4567',
        email: 'jwhitfield@email.com',
      },
      checkInTime: '8:22 AM',
      assignedTo: 'Taylor B.',
      estimatedHours: 1.5,
      loggedHours: 1,
      notes: [{ author: 'Taylor B.', time: '03:31 PM', text: 'Lorem ipsum dolor sit amet' }],
      hourLogs: [{ hours: 1, author: 'Taylor B.', time: '03:31 PM' }],
    },
    {
      id: 2,
      year: 2025,
      make: 'Toyota',
      model: 'Camry',
      status: 'complete',
      service: 'Oil change + tire rotation',
      customer: {
        name: 'James Whitfield',
        phone: '(555) 123-4567',
        email: 'jwhitfield@email.com',
      },
      checkInTime: '8:22 AM',
      assignedTo: 'Taylor B.',
      estimatedHours: 1.5,
      loggedHours: 1,
      notes: [{ author: 'Taylor B.', time: '03:31 PM', text: 'Lorem ipsum dolor sit amet' }],
      hourLogs: [{ hours: 1, author: 'Taylor B.', time: '03:31 PM' }],
    },
    {
      id: 1,
      year: 2025,
      make: 'Toyota',
      model: 'Camry',
      status: 'waiting',
      service: 'Oil change + tire rotation',
      customer: {
        name: 'James Whitfield',
        phone: '(555) 123-4567',
        email: 'jwhitfield@email.com',
      },
      checkInTime: '8:22 AM',
      assignedTo: 'Taylor B.',
      estimatedHours: 1.5,
      loggedHours: 1,
      notes: [{ author: 'Taylor B.', time: '03:31 PM', text: 'Lorem ipsum dolor sit amet' }],
      hourLogs: [{ hours: 1, author: 'Taylor B.', time: '03:31 PM' }],
    },
  ];

  completedCount = this.workOrders.filter((o) => o.status === 'complete').length;
  waitingCount = this.workOrders.filter((o) => o.status === 'waiting').length;
  inProgressCount = this.workOrders.filter((o) => o.status === 'inprogress').length;
  totalEstimatedHours = this.workOrders.reduce((sum, o) => sum + o.estimatedHours, 0);
}
