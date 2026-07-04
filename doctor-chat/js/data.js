const doctors = [
  {
    id: 'chen',
    name: 'Dr. David Chen',
    initials: 'DC',
    photo: 'assets/dr-david-chen.png',
    palette: ['var(--pale-blue-bg)', 'var(--pale-blue-fg)'],
    fields: [
      { label: 'Role', value: 'Internal Medicine' },
      { label: 'Segment', value: 'Early Adopter' },
      { label: 'Experience', value: '15+ Years of Experience' },
      { label: 'Location', value: 'San Francisco, CA' },
      { label: 'Practice setting', value: 'UCSF Medical Center' },
      { label: 'Primary practice', value: 'Metabolic & Cardiac Care' }
    ],
    time: '09:42',
    unread: 2,
    messages: [
      { from: 'in',  text: 'Good morning, Tushar. I reviewed your latest labs — everything looks stable.', time: '09:12' },
      { from: 'out', text: 'That is a relief, thank you. Should I continue the same dosage?', time: '09:20' },
      { from: 'in',  text: 'Yes, keep the current dose for now. We will reassess at your follow-up in August.', time: '09:38' },
      { from: 'in',  text: 'Also, try to log your morning blood pressure readings this week if you can.', time: '09:42' }
    ]
  },
  {
    id: 'okafor',
    name: 'Dr. Amara Okafor',
    initials: 'AO',
    photo: 'assets/dr-amara-okafor.png',
    palette: ['var(--pale-red-bg)', 'var(--pale-red-fg)'],
    fields: [
      { label: 'Role', value: 'Cardiology' },
      { label: 'Segment', value: 'Established User' },
      { label: 'Experience', value: '12+ Years of Experience' },
      { label: 'Location', value: 'New York, NY' },
      { label: 'Practice setting', value: 'Mount Sinai Medical Center' },
      { label: 'Primary practice', value: 'Arrhythmia & Heart Failure' }
    ],
    time: 'Yesterday',
    unread: 0,
    messages: [
      { from: 'out', text: 'Hi Dr. Okafor, the new moisturizer routine has really helped, thank you.', time: 'Yesterday' },
      { from: 'in',  text: 'Glad to hear it. Keep it up and let me know if anything changes.', time: 'Yesterday' }
    ]
  },
  {
    id: 'raghavan',
    name: 'Dr. Priya Raghavan',
    initials: 'PR',
    photo: 'assets/dr-priya-raghavan.png',
    palette: ['var(--pale-green-bg)', 'var(--pale-green-fg)'],
    fields: [
      { label: 'Role', value: 'Pediatrics' },
      { label: 'Segment', value: 'Growing Practice' },
      { label: 'Experience', value: '10+ Years of Experience' },
      { label: 'Location', value: 'Boston, MA' },
      { label: 'Practice setting', value: 'Bright Horizons Clinic' },
      { label: 'Primary practice', value: 'Early Childhood Development' }
    ],
    time: '08:15',
    unread: 1,
    messages: [
      { from: 'out', text: 'Aarav has had a mild fever since last night, around 100.4°F. Should we come in?', time: '07:50' },
      { from: 'in',  text: 'If he is drinking fluids and alert, monitor at home for now.', time: '08:02' },
      { from: 'in',  text: 'Book a same-day visit if it crosses 102°F or he becomes lethargic.', time: '08:15' }
    ]
  },
  {
    id: 'thorne',
    name: 'Dr. Elias Thorne',
    initials: 'ET',
    photo: 'assets/dr-elias-thorne.png',
    palette: ['var(--pale-yellow-bg)', 'var(--pale-yellow-fg)'],
    fields: [
      { label: 'Role', value: 'Orthopedics' },
      { label: 'Segment', value: 'Expert Practitioner' },
      { label: 'Experience', value: '18+ Years of Experience' },
      { label: 'Location', value: 'Denver, CO' },
      { label: 'Practice setting', value: 'Summit Orthopedic Group' },
      { label: 'Primary practice', value: 'Sports Injury & Recovery' }
    ],
    time: 'Mon',
    unread: 0,
    messages: [
      { from: 'in',  text: 'Your knee MRI came back clean — no meniscus damage, just mild inflammation.', time: 'Mon' },
      { from: 'out', text: 'Great news. Can I get back to running soon?', time: 'Mon' }
    ]
  },
  {
    id: 'lindqvist',
    name: 'Dr. Sofia Lindqvist',
    initials: 'SL',
    photo: 'assets/dr-sofia-lindqvist.png',
    palette: ['var(--pale-purple-bg)', 'var(--pale-purple-fg)'],
    fields: [
      { label: 'Role', value: 'Neurology' },
      { label: 'Segment', value: 'Specialist User' },
      { label: 'Experience', value: '14+ Years of Experience' },
      { label: 'Location', value: 'Seattle, WA' },
      { label: 'Practice setting', value: 'Lindqvist Neurology Partners' },
      { label: 'Primary practice', value: 'Migraine & Headache Disorders' }
    ],
    time: 'Jun 27',
    unread: 0,
    messages: [
      { from: 'out', text: 'The migraines have dropped to about once a week since the new medication.', time: 'Jun 27' },
      { from: 'in',  text: 'That is meaningful progress. Keep the headache diary going.', time: 'Jun 27' }
    ]
  }
];

const replies = [
  'Noted — I have added that to your chart. Let me know if anything changes.',
  'Thanks for the update. That sounds like the right course, keep me posted.',
  'Understood. If symptoms persist beyond a few days, we should schedule a visit.',
  'Good question — let me check your records and get back to you shortly.'
];
