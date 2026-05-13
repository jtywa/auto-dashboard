import { Component } from '@angular/core';
import { TechnicianCard } from '../components/technician-card/technician-card';

@Component({
  selector: 'app-technician-overview',
  imports: [TechnicianCard],
  templateUrl: './technician-overview.html',
  styleUrl: './technician-overview.css',
})
export class TechnicianOverview {}
