# EventHub – Event Management System

A fully responsive, frontend web application built with **React 18** and **Tailwind CSS**. Users can browse, search, register for, and create events.

---

## 🚀 Live Demo

> Deploy to Vercel: [eventhub.vercel.app](https://eventhub.vercel.app) *(after deployment)*

---

## 📋 Project Description

EventHub is a modern event management platform that allows users to:
- **Browse** events by category, price, and keyword
- **Register** for events with one click
- **Create** new events using a 3-step guided form
- **Track** registered and created events in a personal dashboard

This project was built as part of an Advanced Web Development course, demonstrating:
- React component architecture
- React Router v6 for client-side navigation
- Context API + LocalStorage for state management
- Responsive design with Tailwind CSS
- Git version control and Vercel deployment

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| React Icons | Icon library |
| Context API | Global state management |
| LocalStorage | Data persistence |
| Vercel | Deployment |

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero section, featured & upcoming events |
| Events | `/events` | Browse, search, filter all events |
| Event Detail | `/events/:id` | Full event info + registration |
| Create Event | `/create` | 3-step event creation form |
| My Events | `/my-events` | Registered & created events dashboard |
| Features | `/features` | Platform features & how it works |
| About | `/about` | Mission, team, tech stack |
| Contact | `/contact` | Contact form |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+ 
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/eventhub.git

# 2. Navigate into the project
cd eventhub

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## 🚀 Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Responsive navigation bar
│   ├── Footer.jsx        # Site footer
│   ├── EventCard.jsx     # Reusable event card component
│   └── Notification.jsx  # Toast notifications
├── context/
│   └── AppContext.jsx    # Global state (registrations, events)
├── data/
│   └── events.js         # Mock event data & helpers
├── pages/
│   ├── Home.jsx          # Landing page
│   ├── Events.jsx        # Events listing with filters
│   ├── EventDetail.jsx   # Single event + registration
│   ├── CreateEvent.jsx   # 3-step event creation form
│   ├── MyEvents.jsx      # Personal dashboard
│   ├── Features.jsx      # Features showcase
│   ├── About.jsx         # About page
│   └── Contact.jsx       # Contact form
├── App.jsx               # Router setup
└── index.js              # Entry point
```

---

## ✨ Key Features

- 🔍 **Search & Filter** — by keyword, category, price, sorted by date/popularity
- 📝 **3-Step Form** — guided event creation with validation
- ✅ **Registration System** — register/unregister with LocalStorage persistence
- 📊 **Seat Availability** — real-time progress bars
- 📱 **Fully Responsive** — mobile-first design
- 🔔 **Toast Notifications** — user feedback on actions
- 🗺️ **Dynamic Routes** — `/events/:id` for individual events

---

## 📸 Screenshots

> *(Add screenshots after running the app)*

---

## 👨‍💻 Author

**Wissam** — Advanced Web Development Project, 2026
