import React from "react";

const Icon = ({ size = 18, sw = 1.75, children, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

export const I = {
  Home: (p) => <Icon {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></Icon>,
  Users: (p) => <Icon {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-3.6 3.1-6 7-6s7 2.4 7 6" /><circle cx="17" cy="9" r="2.5" /><path d="M22 19c0-2.5-1.8-4.2-4.5-4.2" /></Icon>,
  Sparkles: (p) => <Icon {...p}><path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8z" /><path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></Icon>,
  Library: (p) => <Icon {...p}><rect x="4" y="3" width="4" height="18" rx="1" /><rect x="10" y="3" width="4" height="18" rx="1" /><path d="M17 4l4 1-3 17-4-1z" /></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.5-2.4.8a7 7 0 0 0-2.1-1.2L14 3h-4l-.4 2.4a7 7 0 0 0-2.1 1.2L5.1 5.8l-2 3.5 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.5 2.4-.8c.6.5 1.3.9 2.1 1.2L10 21h4l.4-2.4c.8-.3 1.5-.7 2.1-1.2l2.4.8 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z" /></Icon>,
  Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
  Arrow: (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>,
  ArrowL: (p) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>,
  Check: (p) => <Icon {...p}><path d="M4 12l5 5L20 6" /></Icon>,
  Download: (p) => <Icon {...p}><path d="M12 3v13M6 11l6 6 6-6" /><path d="M5 21h14" /></Icon>,
  Print: (p) => <Icon {...p}><path d="M7 8V3h10v5" /><rect x="4" y="8" width="16" height="9" rx="2" /><path d="M7 14h10v7H7z" /></Icon>,
  Share: (p) => <Icon {...p}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8 11l8-4M8 13l8 4" /></Icon>,
  Save: (p) => <Icon {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></Icon>,
  Clock: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>,
  Heart: (p) => <Icon {...p}><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z" /></Icon>,
  Alert: (p) => <Icon {...p}><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18h.01" /></Icon>,
  Tag: (p) => <Icon {...p}><path d="M3 12V4h8l10 10-8 8z" /><circle cx="8" cy="9" r="1.4" /></Icon>,
  Edit: (p) => <Icon {...p}><path d="M4 20h4l11-11-4-4L4 16z" /></Icon>,
  Doc: (p) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></Icon>,
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></Icon>,
  Bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 20a2 2 0 0 0 4 0" /></Icon>,
  Help: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7" /><path d="M12 17h.01" /></Icon>,
  Mail: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>,
  Eye: (p) => <Icon {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>,
  Refresh: (p) => <Icon {...p}><path d="M20 11A8 8 0 0 0 5.5 6.5L3 9" /><path d="M3 4v5h5" /><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15" /><path d="M21 20v-5h-5" /></Icon>,
  Trash: (p) => <Icon {...p}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></Icon>,
  Speech: (p) => <Icon {...p}><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z" /></Icon>,
  Smile: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><circle cx="9" cy="10" r=".8" fill="currentColor" /><circle cx="15" cy="10" r=".8" fill="currentColor" /></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></Icon>,
  Star: (p) => <Icon {...p}><path d="M12 3l2.7 6 6.3.5-4.8 4.3 1.5 6.2L12 17l-5.7 3 1.5-6.2L3 9.5 9.3 9z" /></Icon>,
  Menu: (p) => <Icon {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>,
  Close: (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>,
};

export default I;
