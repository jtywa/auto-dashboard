export interface WorkOrder {
  id: number;
  year: number;
  make: string;
  model: string;
  status: string;
  service: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  checkInTime: string;
  assignedTo: string;
  estimatedHours: number;
  loggedHours: number;
  notes: Note[];
  hourLogs: HourLog[];
}

export interface Note {
  author: string;
  time: string;
  text: string;
}

export interface HourLog {
  hours: number;
  author: string;
  time: string;
}
