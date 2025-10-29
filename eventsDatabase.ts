import type { CommunityEvent } from '../types';

export const ALL_EVENTS: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'Community Composting Workshop',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    location: 'Logan Central Library Gardens',
    description: 'Learn the basics of home composting and contribute to our community garden. All skill levels welcome!',
    icon: '♻️',
    url: 'https://example.com/events/composting',
  },
  {
    id: 'event-2',
    title: 'Native Bee Hotel Building Day',
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
    location: 'Daisy Hill Conservation Park',
    description: 'Help our local pollinators! Join us to build and install native bee hotels throughout the park.',
    icon: '🐝',
  },
  {
    id: 'event-3',
    title: 'Seedling Swap Meet',
    date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days from now
    location: 'Logan Hyperdome, Outside Area',
    description: 'Bring your excess seedlings and swap them with fellow gardeners. A great way to diversify your garden!',
    icon: '🌱',
    url: 'https://example.com/events/seedling-swap',
  },
];
