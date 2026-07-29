export interface Slide {
  url: string;
  tag: string;
  headline: string;
  sub: string;
}

export interface Impact {
  stat: string;
  label: string;
  desc: string;
  color: string;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
  tag: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
}

export const SLIDES: Slide[] = [
  {
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80',
    tag: 'AI INFRASTRUCTURE DIAGNOSTICS',
    headline: 'AI-Powered Road Hazard Detection & Resolution System',
    sub: 'Transforming urban road maintenance with computer vision. Citizens report in seconds, AI assesses severity, and municipal crews respond automatically.',
  },
  {
    url: '/hero_slide_2.png',
    tag: 'INTELLIGENT COMPLAINT ROUTING',
    headline: 'Real-Time Defect Classification & Priority Dispatch',
    sub: 'YOLO-powered detection instantly categorizes potholes, structural cracks, and surface erosion, routing high-priority hazards straight to field teams.',
  },
  {
    url: '/hero_slide_3.png',
    tag: 'TRANSPARENT GOVERNANCE',
    headline: 'Live Defect Heatmaps & SLA Trackers for Municipalities',
    sub: 'Municipal authorities get full operational control — heatmap radar, live team capacity tracking, automated work orders, and citizen feedback loops.',
  },
  {
    url: '/hero_slide_4.png',
    tag: 'CITIZEN-FIRST CIVIC ACTION',
    headline: 'Empowering Communities to Build Safer City Infrastructure',
    sub: 'Snap a photo, let AI detect the damage level, track repair progress live, and give direct feedback once the road is fixed.',
  },
];

export const IMPACTS: Impact[] = [
  { stat: '4,800+', label: 'Accidents Caused Yearly', desc: 'Potholes cause thousands of fatal accidents on Indian roads every year.', color: '#EF4444' },
  { stat: '< 48 Hrs', label: 'Target SLA Response', desc: 'AI automated classification accelerates repair dispatch times by 4x.', color: '#22C55E' },
  { stat: '94.2%', label: 'AI Detection Accuracy', desc: 'Deep learning vision model categorizes damage severity in sub-seconds.', color: '#FF5C00' },
  { stat: '12,400+', label: 'Citizens Protected', desc: 'Active monitoring across municipal zones in Hyderabad.', color: '#3B82F6' },
];

export const STEPS: Step[] = [
  { num: '01', title: 'Snap & Upload', desc: 'Take a photo of any road defect — pothole, crack, or crater. Upload directly from your smartphone.', tag: 'Citizen Action' },
  { num: '02', title: 'AI Diagnostics', desc: 'Our vision model scans the image, measures damage depth, assigns a severity score (HIGH/MED/LOW), and tags GPS coordinates.', tag: 'Automated Processing' },
  { num: '03', title: 'Priority Dispatch', desc: 'High-severity hazards automatically alert municipal command centers and trigger field crew work orders.', tag: 'Government Routing' },
  { num: '04', title: 'Track & Verify', desc: 'Monitor repair status live. Once fixed, citizens receive photo proof and rate the work quality.', tag: 'Resolution Loop' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Reported a major crater on KPHB Main Road at 9 AM. By noon, inspection was confirmed, and it was repaired within 36 hours. Best civic service initiative!',
    name: 'K. Rajeshwar Rao',
    role: 'Resident, Kukatpally',
    location: 'Hyderabad',
    rating: 5,
  },
  {
    quote: 'The heatmap visualization gives our municipal teams exact spatial density of road defects. Emergency work order dispatch time dropped by 60%.',
    name: 'Officer Sunita Rao',
    role: 'Assistant Engineer, GHMC',
    location: 'Mehdipatnam Division',
    rating: 5,
  },
  {
    quote: 'As a daily commuter, seeing my complaint move from Pending to In Progress with real-time field crew logs builds true trust in governance.',
    name: 'Priya Sharma',
    role: 'IT Professional',
    location: 'Gachibowli, Hyderabad',
    rating: 5,
  },
];
