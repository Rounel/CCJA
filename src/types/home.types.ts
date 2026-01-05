export interface MemberStats {
  hoursVolunteered: number;
  attendanceRate: number; // Pourcentage de présence
  speakingTime: number; // Temps de parole en minutes
  eventsAttended: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  statusDescription: string;
  memberSince: string;
  role?: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: 'MEETING' | 'WORKSHOP' | 'CONFERENCE' | 'NETWORKING' | 'OTHER';
  attendees: number;
  hasCheckedIn?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: Date;
  priority: 'low' | 'medium' | 'high';
  author: string;
}

export interface CalendarDay {
  date: Date;
  hasEvents: boolean;
  eventCount: number;
}
