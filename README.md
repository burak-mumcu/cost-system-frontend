# COST-SYSTEM-FRONTEND

*Empowering Cost Insights Through Seamless Innovation*

<div align="center">

![last-commit](https://img.shields.io/github/last-commit/burak-mumcu/cost-system-frontend?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/burak-mumcu/cost-system-frontend?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/burak-mumcu/cost-system-frontend?style=flat&color=0080ff)

*Built with the tools and technologies:*

![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)

---

## Overview

cost-system-frontend is a modern React application designed to facilitate cost management and system monitoring with a focus on developer efficiency and user experience.

**Why cost-system-frontend?**

This project aims to deliver a responsive, maintainable frontend for the cost system, enabling rapid development and real-time data interaction. The core features include:

- 🛠️ **Fast Development Environment:** Configured with Vite for quick builds and hot module replacement.
- 🚀 **Modular Architecture:** Clear separation of pages like Schema, Health, and Calculate for easy extension.
- 🎯 **Code Quality:** Enforces best practices with integrated ESLint rules.
- 🌐 **API Integration:** Dynamic retrieval and display of backend data for schema visualization and health checks.
- ⚙️ **Responsive UI Components:** Intuitive navigation and user interactions for efficient workflows.

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** npm
- **Node.js:** Version 16 or higher
- **Backend API:** cost-system-backend running on accessible endpoint

### Installation

Build cost-system-frontend from the source and install dependencies:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/burak-mumcu/cost-system-frontend
   ```

2. **Navigate to the project directory:**
   ```sh
   cd cost-system-frontend
   ```

3. **Install the dependencies:**
   ```sh
   npm install
   ```

4. **Set up environment variables:**
   ```sh
   # Create .env file
   echo "REACT_APP_API_URL=https://cost-system-backend.vercel.app" > .env
   ```

### Usage

Run the project with:

**Development server:**
```sh
npm run dev
```

**Build for production:**
```sh
npm run build
```

**Preview production build:**
```sh
npm run preview
```

**Linting:**
```sh
npm run lint
```

### Testing

Cost-system-frontend uses modern testing frameworks. Run the test suite with:

```sh
npm test
```

**Test coverage:**
```sh
npm run test:coverage
```

---

## Features

### 🧮 Cost Calculator
- Interactive form for cost calculation parameters
- Real-time calculation results
- Multi-currency support (TRY, EUR, USD, GBP)
- Batch size optimization

### 📊 Schema Visualization
- Dynamic display of default calculation parameters
- Backend configuration overview
- Parameter validation rules

### 🏥 Health Monitoring
- System health checks
- API status monitoring
- Performance metrics
- Dependency status

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean, intuitive interface
- Loading states and error handling
- Accessibility features

## API Integration

The frontend integrates with the following backend endpoints:

- `GET /api/health` - System health status
- `GET /api/schema` - Default calculation parameters
- `POST /api/calculate` - Cost calculation service

## Configuration

### Environment Variables

```env
# API Configuration
REACT_APP_API_URL=https://your-backend-url.com

# Development Settings
REACT_APP_ENV=development
```

### Build Configuration

The project uses Vite for fast builds and development:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
```

## Deployment

### Vercel (Recommended)
```sh
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify
```sh
# Build
npm run build

# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint rules
- Write unit tests for new features
- Update documentation
- Use semantic commit messages

## Performance Optimization

- ⚡ **Vite**: Lightning-fast builds and HMR
- 🎯 **Code Splitting**: Lazy loading for optimal performance
- 📦 **Bundle Optimization**: Tree shaking and minification
- 🔄 **Caching**: Efficient API response caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Developer:** Burak Mumcu
- **Email:** contact@example.com
- **GitHub:** [@burak-mumcu](https://github.com/burak-mumcu)
- **Project Link:** [https://github.com/burak-mumcu/cost-system-frontend](https://github.com/burak-mumcu/cost-system-frontend)

---

<div align="center">

**[⬆ Back to Top](#cost-system-frontend)**

</div>