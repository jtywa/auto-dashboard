import { Routes } from '@angular/router';
import { ServiceQueue } from './service-queue/service-queue';
import { TechnicianOverview } from './technician-overview/technician-overview';
import { Reports } from './reports/reports';

export const routes: Routes = [
  { path: '', title: 'Angular Auto | Service Queue', component: ServiceQueue },
  { path: 'techs', title: 'Angular Auto | Technicians', component: TechnicianOverview },
  { path: 'reports', title: 'Angular Auto | Reports', component: Reports },
];
