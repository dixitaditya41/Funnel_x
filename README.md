# ⚽ Football Quiz Application

A production-grade, football-themed quiz application built with React, Vite, and Tailwind CSS. Test your sports knowledge with 15 questions in 30 minutes!

![Football Quiz](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-7.3-purple) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-cyan)

## 🎯 Live Demo

<a href="https://casualquiz-app.netlify.app" target="_blank">
  🚀 Click to View Live Quiz App
</a>

## ✨ Features

### Core Functionality
- **Email Validation**: Start quiz with email verification
- **15 Sports Questions**: Fetched dynamically from OpenTDB API
- **30-Minute Timer**: Countdown timer with visual warnings at 5 and 1 minute marks
- **Auto-Submit**: Quiz automatically submits when timer reaches zero
- **Question Navigation**: Navigate between questions using next/previous buttons or question navigator
- **Progress Tracking**: Visual indicators for visited, attempted, and current questions
- **Comprehensive Report**: Detailed results page showing user answers vs correct answers

### Technical Features
- **Session Persistence**: Progress saved in sessionStorage - refresh without losing data
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Football Theme**: Beautiful pitch-green design with stadium aesthetics
- **Smooth Animations**: Micro-animations and transitions throughout
- **Error Handling**: Graceful API failure handling with retry option
- **HTML Entity Decoding**: Properly displays special characters in questions
- **Browser Navigation Warning**: Prevents accidental quiz exit

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router DOM 7.1
- **State Management**: React Context API
- **API**: OpenTDB Trivia API (Sports Category)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Funnel_x
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
Funnel_x/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Timer.jsx
│   │   ├── QuestionCard.jsx
│   │   └── NavigationPanel.jsx
│   ├── pages/              # Main application pages
│   │   ├── StartPage.jsx
│   │   ├── QuizPage.jsx
│   │   └── ReportPage.jsx
│   ├── context/            # Global state management
│   │   └── QuizContext.jsx
│   ├── services/           # API integration
│   │   └── quizApi.js
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json
```

## 🎨 Component Architecture

### Pages
- **StartPage**: Email submission and quiz initialization
- **QuizPage**: Main quiz interface with timer, questions, and navigation
- **ReportPage**: Results display with answer comparison

### Components
- **Button**: Reusable button with variants (primary, secondary, danger, outline)
- **Input**: Form input with validation and error states
- **Modal**: Confirmation dialogs with backdrop
- **Timer**: Countdown timer with visual warnings
- **QuestionCard**: Question display with multiple-choice answers
- **NavigationPanel**: Question overview with status indicators

### Context
- **QuizContext**: Global state for quiz data, answers, timer, and navigation

## 🔧 Key Implementation Details

### State Management
The application uses React Context API for global state management with session persistence:
- Email and quiz progress persisted in `sessionStorage`
- Supports page refresh without data loss
- Clean state reset on quiz completion

### API Integration
- Fetches 15 questions from OpenTDB API (Sports category)
- Fisher-Yates shuffle algorithm for randomizing answer choices
- Error handling with user-friendly messages
- Retry mechanism on API failures

### Timer Implementation
- 30-minute countdown (1800 seconds)
- Visual warnings at 5 minutes (yellow) and 1 minute (red, pulsing)
- Auto-submit callback when time expires
- Persists in sessionStorage

### Navigation System
- **Next/Previous buttons**: Linear navigation
- **Question navigator**: Direct jump to any question
- **Status indicators**: 
  - Current (green with ring)
  - Attempted (yellow border)
  - Visited (gray border)
  - Not Visited (dark gray)

## 🎯 Assumptions Made

1. **Internet Connection**: Application requires active internet for API calls
2. **Browser Support**: Modern browsers with ES6+ support
3. **Session Storage**: Browser supports sessionStorage API
4. **Screen Size**: Optimized for screens 375px and above
5. **API Availability**: OpenTDB API is accessible and returns valid data
6. **Question Format**: All questions are multiple-choice with 4 options

## 🚧 Challenges Faced & Solutions

### 1. Tailwind CSS Version Compatibility
**Challenge**: Initial setup used Tailwind CSS v4 which changed PostCSS plugin architecture.  
**Solution**: Downgraded to stable Tailwind CSS v3 for better compatibility with Vite.

### 2. HTML Entity Encoding
**Challenge**: API returns questions with HTML entities (e.g., `&quot;`, `&#039;`).  
**Solution**: Implemented `decodeHTML` utility function using `textarea.innerHTML` parsing.

### 3. State Persistence
**Challenge**: Users losing progress on page refresh.  
**Solution**: Implemented comprehensive sessionStorage integration for all quiz state.

### 4. Timer Auto-Submit
**Challenge**: Ensuring quiz submits exactly when timer reaches zero without race conditions.  
**Solution**: Used `useEffect` with proper cleanup and callback mechanism.

### 5. Browser Navigation Warning
**Challenge**: Users accidentally leaving quiz page using browser back button.  
**Solution**: Implemented `beforeunload` event listener with cleanup.

## 📱 Responsive Design

- **Mobile (375px - 767px)**: Single column layout, collapsible navigation panel
- **Tablet (768px - 1023px)**: Optimized spacing and font sizes
- **Desktop (1024px+)**: Two-column layout with persistent navigation panel

## 🎨 Design Decisions

### Color Palette
- **Pitch Green** (`#16a34a`): Primary actions, success states
- **Stadium Gray** (`#1e293b` to `#f8fafc`): Backgrounds and borders
- **Yellow Card** (`#fbbf24`): Warnings and attempted questions
- **Red Card** (`#ef4444`): Critical warnings and errors

### Typography
- **Display Font**: Outfit (headers, numbers)
- **Body Font**: Inter (content, labels)

### Animations
- Fade-in on page load
- Slide transitions for navigation
- Bounce effect for success celebration
- Pulse animation for critical timer

## 🔒 Browser Compatibility

Tested on:
- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Edge 120+
- ✅ Safari 17+

## 📝 Future Enhancements

- Leaderboard with score tracking
- Difficulty level selection
- Custom quiz duration
- Social sharing of results
- Dark/light mode toggle
- Offline support with PWA
- Analytics integration

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Git Workflow

This project follows a feature-based Git workflow with commits for each major feature:
1. Initial project setup
2. UI components and design system
3. State management and API integration
4. Page implementations
5. Polish and bug fixes

## 📄 License

This project is part of a coding assignment for CausalFunnel.

## 🙏 Acknowledgments

- [OpenTDB](https://opentdb.com/) for the trivia API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React Router](https://reactrouter.com/) for routing
- [Vite](https://vite.dev/) for blazing fast development

---

**Note**: This is a demonstration project showcasing production-grade code quality, clean architecture, and attention to detail.
