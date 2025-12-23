/**
 * 🎭 Mock Performance Data
 * 
 * This is demo data for the Houston Ballet prototype.
 * In a production app, this would come from the API.
 */

export interface Performance {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  seats: string;
  image: string;
  orderNumber: string;
  ticketHolder: string;
  patronNumber: string;
  ticketPrice: number;
  isVIP?: boolean;
}

/**
 * Upcoming performances - shows the user has tickets for
 */
export const mockPerformances: Performance[] = [
  {
    id: '1',
    title: 'The Nutcracker',
    date: 'Dec 20, 2025',
    time: '7:30 PM',
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Section A, Row F, Seats 12-13',
    image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRjcmFja2VyJTIwYmFsbGV0fGVufDF8fHx8MTc2NTMwODAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20251547',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 95.00,
    isVIP: true,
  },
  {
    id: '2',
    title: 'Swan Lake',
    date: 'Jan 15, 2026',
    time: '8:00 PM',
    venue: 'Wortham Theater Center',
    seats: 'Mezzanine, Section B, Row C, Seats 8-11', // 4 seats for testing carousel
    image: 'https://images.unsplash.com/photo-1684251198295-6c0682080278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2FuJTIwbGFrZSUyMGJhbGxldHxlbnwxfHx8fDE3NjUyNDQ1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20260089',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 78.00,
  },
  {
    id: '3',
    title: 'Giselle',
    date: 'Feb 22, 2026',
    time: '7:30 PM',
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Section A, Row D, Seats 15-16',
    image: 'https://images.unsplash.com/photo-1760543320338-7bde1336eaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsZXQlMjBwZXJmb3JtYW5jZSUyMHN0YWdlfGVufDF8fHx8MTc2NTI4ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20260234',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 110.00,
  },
];

/**
 * Past performances - order history
 */
export const mockPastPerformances: Performance[] = [
  {
    id: '4',
    title: 'Don Quixote',
    date: 'Oct 15, 2024',
    time: '7:30 PM',
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Section A, Row G, Seats 20-21',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsZXQlMjBkYW5jZXJzfGVufDF8fHx8MTc2NTMwODAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20242891',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 85.00,
  },
  {
    id: '5',
    title: 'Romeo and Juliet',
    date: 'Sep 8, 2024',
    time: '8:00 PM',
    venue: 'Wortham Theater Center',
    seats: 'Mezzanine, Section B, Row B, Seats 14-15',
    image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiYWxsZXQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjUzMDgwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20242456',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 92.00,
  },
  {
    id: '6',
    title: 'The Sleeping Beauty',
    date: 'Jul 20, 2024',
    time: '7:30 PM',
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Section A, Row E, Seats 8-9',
    image: 'https://images.unsplash.com/photo-1609874896515-0c7e28a14074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcGluZyUyMGJlYXV0eSUyMGJhbGxldHxlbnwxfHx8fDE3NjUzMDgwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20241823',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 88.00,
  },
  {
    id: '7',
    title: 'Cinderella',
    date: 'May 12, 2024',
    time: '2:00 PM', // Matinee
    venue: 'Wortham Theater Center',
    seats: 'Orchestra, Section A, Row J, Seats 5-6',
    image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxiYWxsZXQlMjBkYW5jZXJzfGVufDF8fHx8MTc2NTMwODAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    orderNumber: '20241456',
    ticketHolder: 'Sarah Mitchell',
    patronNumber: '448291',
    ticketPrice: 75.00,
  },
];

