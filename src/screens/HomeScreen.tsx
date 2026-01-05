import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { MemberStats, Event, Announcement } from '../types/home.types';

// Données de démonstration
const mockUserData: MemberStats = {
  hoursVolunteered: 120,
  attendanceRate: 85,
  speakingTime: 45,
  eventsAttended: 5,
  status: 'Active',
  statusDescription: 'Good Standing',
  memberSince: '2021',
  role: 'Treasurer',
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Monthly General Assembly',
    date: new Date(2023, 8, 5), // 5 septembre 2023
    startTime: '18:00',
    endTime: '20:00',
    location: 'Community Hall A',
    type: 'MEETING',
    attendees: 12,
  },
  {
    id: '2',
    title: 'Tech Workshop: React Native',
    date: new Date(2023, 8, 12),
    startTime: '14:00',
    endTime: '17:00',
    location: 'Innovation Lab',
    type: 'WORKSHOP',
    attendees: 8,
  },
];

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Nouvelle opportunité de formation',
    message: 'Inscrivez-vous à notre atelier de développement web avancé prévu le mois prochain.',
    date: new Date(),
    priority: 'high',
    author: 'Admin',
  },
  {
    id: '2',
    title: 'Assemblée générale annuelle',
    message: "L'assemblée générale annuelle aura lieu le 15 octobre. Votre présence est importante.",
    date: new Date(),
    priority: 'medium',
    author: 'Président',
  },
];

export default function HomeScreen() {
  const [currentMonth] = useState(new Date(2023, 8, 1)); // Septembre 2023
  const userName = 'Sarah';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const eventDates = mockEvents.map(e => e.date.getDate());

    const days = [];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Header du calendrier
    days.push(
      <View key="header" style={styles.calendarHeader}>
        <TouchableOpacity>
          <Text style={styles.calendarArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.calendarMonth}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity>
          <Text style={styles.calendarArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );

    // Jours de la semaine
    days.push(
      <View key="weekdays" style={styles.calendarWeekDays}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.calendarWeekDay}>
            {day}
          </Text>
        ))}
      </View>
    );

    // Jours du mois
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = eventDates.includes(day);
      const isToday = day === 5;

      calendarDays.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isToday && styles.calendarDayToday,
          ]}
        >
          <Text style={[
            styles.calendarDayText,
            isToday && styles.calendarDayTextToday,
          ]}>
            {day}
          </Text>
          {hasEvent && <View style={styles.eventDot} />}
        </TouchableOpacity>
      );
    }

    days.push(
      <View key="days" style={styles.calendarDaysGrid}>
        {calendarDays}
      </View>
    );

    return days;
  };

  const getEventTypeColor = (type: Event['type']) => {
    const colors = {
      MEETING: '#FFB800',
      WORKSHOP: '#007AFF',
      CONFERENCE: '#34C759',
      NETWORKING: '#FF9500',
      OTHER: '#8E8E93',
    };
    return colors[type];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.userName}>{userName}!</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Badge membre */}
      <View style={styles.memberBadge}>
        <Text style={styles.badgeIcon}>✓</Text>
        <Text style={styles.badgeText}>
          Member since {mockUserData.memberSince}
          {mockUserData.role && ` | ${mockUserData.role}`}
        </Text>
      </View>

      {/* Carte principale - Heures de bénévolat */}
      <View style={styles.mainCard}>
        <View style={styles.mainCardHeader}>
          <Text style={styles.mainCardTitle}>Hours Volunteered</Text>
          <Text style={styles.mainCardIcon}>🤝</Text>
        </View>
        <View style={styles.mainCardContent}>
          <Text style={styles.mainCardValue}>{mockUserData.hoursVolunteered}</Text>
          <Text style={styles.mainCardLabel}>Hours</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(mockUserData.hoursVolunteered / 200) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* KPIs */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiIcon}>📊</Text>
            <Text style={styles.kpiLabel}>ATTENDANCE</Text>
          </View>
          <Text style={styles.kpiValue}>{mockUserData.attendanceRate}%</Text>
          <Text style={styles.kpiDescription}>Presence rate</Text>
        </View>

        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiIcon}>🎤</Text>
            <Text style={styles.kpiLabel}>SPEAKING</Text>
          </View>
          <Text style={styles.kpiValue}>{mockUserData.speakingTime}</Text>
          <Text style={styles.kpiDescription}>Minutes avg.</Text>
        </View>
      </View>

      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiIcon}>📅</Text>
            <Text style={styles.kpiLabel}>EVENTS</Text>
          </View>
          <Text style={styles.kpiValue}>{mockUserData.eventsAttended}</Text>
          <Text style={styles.kpiDescription}>Attended this year</Text>
        </View>

        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiIcon}>🛡️</Text>
            <Text style={styles.kpiLabel}>STATUS</Text>
          </View>
          <Text style={styles.kpiValueStatus}>{mockUserData.status}</Text>
          <Text style={styles.kpiDescriptionGood}>{mockUserData.statusDescription}</Text>
        </View>
      </View>

      {/* Calendrier */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.viewFullLink}>View Full</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>{renderCalendar()}</View>
      </View>

      {/* Prochaines activités */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Up</Text>
        {mockEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventMonth}>
                {event.date.toLocaleString('en', { month: 'short' }).toUpperCase()}
              </Text>
              <Text style={styles.eventDay}>{event.date.getDate()}</Text>
              <Text style={styles.eventToday}>Today</Text>
            </View>

            <View style={styles.eventDetails}>
              <View style={styles.eventTitleRow}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View
                  style={[
                    styles.eventTypeBadge,
                    { backgroundColor: getEventTypeColor(event.type) },
                  ]}
                >
                  <Text style={styles.eventTypeBadgeText}>{event.type}</Text>
                </View>
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventInfoIcon}>🕐</Text>
                <Text style={styles.eventInfoText}>
                  {event.startTime} - {event.endTime}
                </Text>
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventInfoIcon}>📍</Text>
                <Text style={styles.eventInfoText}>{event.location}</Text>
              </View>

              <View style={styles.eventFooter}>
                <View style={styles.eventAttendees}>
                  <View style={styles.attendeeAvatarsContainer}>
                    <View style={styles.attendeeAvatar}>
                      <Text style={styles.attendeeInitial}>A</Text>
                    </View>
                    <View style={[styles.attendeeAvatar, styles.attendeeAvatarOverlap]}>
                      <Text style={styles.attendeeInitial}>B</Text>
                    </View>
                    <View style={[styles.attendeeAvatar, styles.attendeeAvatarOverlap]}>
                      <Text style={styles.attendeeInitial}>C</Text>
                    </View>
                    <View style={[styles.attendeeCount, styles.attendeeAvatarOverlap]}>
                      <Text style={styles.attendeeCountText}>+{event.attendees - 3}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.checkInButton}>
                  <Text style={styles.checkInButtonText}>Check-in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Annonces */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        {mockAnnouncements.map((announcement) => (
          <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
            <View
              style={[
                styles.announcementPriority,
                announcement.priority === 'high' && styles.announcementPriorityHigh,
                announcement.priority === 'medium' && styles.announcementPriorityMedium,
              ]}
            />
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementMessage} numberOfLines={2}>
                {announcement.message}
              </Text>
              <Text style={styles.announcementAuthor}>By {announcement.author}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FF',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  badgeIcon: {
    fontSize: 16,
    color: '#007AFF',
  },
  badgeText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  mainCard: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  mainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainCardTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  mainCardIcon: {
    fontSize: 32,
  },
  mainCardContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  mainCardValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  mainCardLabel: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  kpiContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kpiIcon: {
    fontSize: 20,
  },
  kpiLabel: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  kpiValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  kpiValueStatus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  kpiDescription: {
    fontSize: 13,
    color: '#8E8E93',
  },
  kpiDescriptionGood: {
    fontSize: 13,
    color: '#34C759',
    fontWeight: '600',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  viewFullLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  calendar: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarMonth: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  calendarArrow: {
    fontSize: 18,
    color: '#8E8E93',
    paddingHorizontal: 12,
  },
  calendarWeekDays: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  calendarWeekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  calendarDaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  calendarDayToday: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
  },
  calendarDayText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  calendarDayTextToday: {
    color: '#fff',
    fontWeight: '600',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#34C759',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventDate: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#E5E5EA',
    minWidth: 80,
  },
  eventMonth: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  eventToday: {
    fontSize: 12,
    color: '#8E8E93',
  },
  eventDetails: {
    flex: 1,
    paddingLeft: 20,
  },
  eventTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  eventTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  eventTypeBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfoIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  eventInfoText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatarsContainer: {
    flexDirection: 'row',
  },
  attendeeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  attendeeAvatarOverlap: {
    marginLeft: -12,
  },
  attendeeInitial: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  attendeeCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  attendeeCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  checkInButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  announcementPriority: {
    width: 4,
    backgroundColor: '#8E8E93',
  },
  announcementPriorityHigh: {
    backgroundColor: '#FF3B30',
  },
  announcementPriorityMedium: {
    backgroundColor: '#FF9500',
  },
  announcementContent: {
    flex: 1,
    padding: 16,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  announcementMessage: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 8,
  },
  announcementAuthor: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});
