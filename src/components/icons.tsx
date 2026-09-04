/* One stroke family, one weight, drawn once. */

type P = React.SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="10.6" cy="10.6" r="6.9" />
    <path d="M15.6 15.6 21 21" />
  </svg>
);

export const Heart = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M12 20.4 4.3 12.7a4.7 4.7 0 0 1 0-6.6 4.7 4.7 0 0 1 6.6 0l1.1 1.1 1.1-1.1a4.7 4.7 0 0 1 6.6 0 4.7 4.7 0 0 1 0 6.6Z" />
  </svg>
);

export const Bag = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 7.7h15l-1.2 12.6H5.7Z" />
    <path d="M8.6 9.5V6.2a3.4 3.4 0 0 1 6.8 0v3.3" />
  </svg>
);

export const Home = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.6 10.2 12 3.6l8.4 6.6v9.3H3.6Z" />
  </svg>
);

export const Grid = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Chart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 19V9.5M12 19V4.6M19 19v-6.4" />
  </svg>
);

export const User = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.4" r="3.8" />
    <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" />
  </svg>
);

export const Back = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.5 5 7.5 12l7 7" />
  </svg>
);

export const Star = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8Z" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="m5 12.4 4.6 4.6L19 7" />
  </svg>
);

export const Card = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
    <path d="M3 10.1h18M6.8 15h3.4" />
  </svg>
);

export const Bank = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.6 9.4 12 4.4l8.4 5H3.6Z" />
    <path d="M6.3 12.2v5.1M12 12.2v5.1M17.7 12.2v5.1M3.8 19.9h16.4" />
  </svg>
);
