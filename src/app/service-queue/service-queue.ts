import { Component } from '@angular/core';
import { ServiceCard } from '../components/service-card/service-card';

@Component({
  selector: 'app-service-queue',
  imports: [ServiceCard],
  templateUrl: './service-queue.html',
  styleUrl: './service-queue.css',
})
export class ServiceQueue {}
