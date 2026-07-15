# Dynamic React Dashboard

Pixel-perfect clone of the GoodFood "Delicious Burger" admin dashboard (Figma), built with a modular React component architecture and a fully reactive Control Panel.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Recharts
- lucide-react

## Features

- Responsive dashboard layout matching the Figma design
- Modular, reusable React components
- Revenue Bar Chart
- Order Time Pie/Donut Chart
- Your Rating (proportional circles)
- Most Ordered Food list
- Order Line Chart
- Interactive Control Panel with number inputs and sliders
- Real-time chart updates via React useState

## Component Architecture

```
App
├── Sidebar
├── Topbar
├── StatCard (reusable card wrapper)
├── RevenueChart (Bar)
├── OrderTimeChart (Pie / Donut)
├── RatingBubbles
├── MostOrderedFood
├── OrderChart (Line)
└── ControlPanel
```

All dashboard data lives in `useState` hooks inside `App.jsx`. Every chart and the Control Panel receive their values and setters as props — no chart or the Control Panel ever stores its own data.

## Data Flow

- Control Panel input changes → `onChange` fires
- Calls the setter passed down from `App.jsx` as a prop
- `useState` value updates in `App.jsx`
- New value passed down as a `data` prop to the relevant chart
- Recharts re-renders with the new data

## Installation

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Preview

```
npm run preview
```

## Deployment

Deployed with the Vercel CLI:

```
vercel --prod
```

Live URL: https://your-project-name.vercel.app
