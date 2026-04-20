import { Component } from '@angular/core';
import { ServiceCard } from '../components/service-card/service-card';
import { CheckinModal } from '../components/checkin-modal/checkin-modal';

@Component({
  selector: 'app-service-queue',
  imports: [ServiceCard, CheckinModal],
  templateUrl: './service-queue.html',
  styleUrl: './service-queue.css',
})
export class ServiceQueue {}
