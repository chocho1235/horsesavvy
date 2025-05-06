# Be Horse Savvy

A modern web application for horse education and training services. Built with React, TypeScript, and Framer Motion.

## Features

- 🎓 Educational content and course previews
- 📍 Postcode-based service area checker
- 📱 Responsive design for all devices
- 🎨 Modern UI with smooth animations
- ♿ Accessibility-first approach
- 🔍 SEO-friendly structure

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router
- **State Management:** React Query
- **UI Components:** Custom components with shadcn/ui
- **Icons:** Lucide Icons
- **API Integration:** Postcodes.io

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/behorsesavvy.git
cd behorsesavvy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   ├── ContactHeader.tsx
│   ├── Footer.tsx
│   ├── PhotoBubble.tsx
│   ├── CircleNavButton.tsx
│   └── PostcodeChecker.tsx
├── pages/             # Page components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Key Components

### ContactHeader
A sticky header displaying contact information, responsive and accessible.

### Footer
A responsive footer with contact information and social media links, featuring smooth animations.

### PhotoBubble
A circular image component with customizable sizes and styling.

### CircleNavButton
A circular navigation button with various color schemes and responsive sizing.

### PostcodeChecker
A service area checker that uses the postcodes.io API to determine if a location is within the service radius.

## Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Accessibility
- ARIA labels and roles
- Semantic HTML
- Keyboard navigation support
- Screen reader compatibility

### Performance
- Lazy loading for images
- Optimized animations
- Efficient state management
- Responsive design

## Deployment

The application is configured for deployment on Vercel. The production build can be created using:

```bash
npm run build
# or
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Penelope Pleasant - [Penelopepleasant@gmail.com](mailto:Penelopepleasant@gmail.com)

Project Link: [https://github.com/yourusername/behorsesavvy](https://github.com/yourusername/behorsesavvy)
