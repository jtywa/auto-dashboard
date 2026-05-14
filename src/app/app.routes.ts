import { Routes } from '@angular/router';
import { ServiceQueue } from './service-queue/service-queue';
import { TechnicianOverview } from './technician-overview/technician-overview';
import { Reports } from './reports/reports';

export const routes: Routes = [
  {
    path: '',
    title: 'Angular Auto | Service Queue',
    data: { page: 'home' },
    component: ServiceQueue,
  },
  {
    path: 'techs',
    title: 'Angular Auto | Technicians',
    data: { page: 'techs' },
    component: TechnicianOverview,
  },
  {
    path: 'reports',
    title: 'Angular Auto | Reports',
    data: { page: 'reports' },
    component: Reports,
  },
];
