# DevOps To-Do App - Complete Guide

This project demonstrates key DevOps principles including CI/CD, containerization, automated testing, and cloud deployment.

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Lovable Cloud (Supabase) - PostgreSQL database with Row Level Security
- **Styling**: Tailwind CSS + shadcn/ui components
- **Testing**: Vitest + React Testing Library
- **Containerization**: Docker (multi-stage build)
- **CI/CD**: GitHub Actions
- **Deployment**: Render (or any cloud platform)

### Database Schema
```sql
-- User profiles (auto-created on signup)
profiles:
  - id (UUID, primary key)
  - email (TEXT)
  - created_at (TIMESTAMP)

-- Tasks table with Row Level Security
tasks:
  - id (UUID, primary key, auto-generated)
  - user_id (UUID, foreign key to profiles)
  - description (TEXT, not null)
  - due_date (DATE, not null)
  - completed (BOOLEAN, default false)
  - created_at (TIMESTAMP, default now)
```

## 🚀 Local Development

### Prerequisites
- Node.js 20+ and npm
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd devops-todo-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Key Features Implemented

✅ **User Authentication**
- Email/password signup and login
- Session management with auto-redirect
- Row Level Security (RLS) ensures users only see their own tasks

✅ **Task Management (CRUD)**
- Create: Add new tasks with description and due date
- Read: View all tasks sorted by due date (earliest first)
- Update: Mark tasks as complete/incomplete
- Delete: Remove tasks permanently

✅ **Responsive Design**
- Mobile-first approach
- Clean, modern UI with Tailwind CSS
- Accessible components from shadcn/ui

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Suite Coverage

The project includes 5 comprehensive tests:

1. **UI Rendering Test** - Verifies form renders correctly
2. **Add Task Test** - Tests CREATE operation
3. **Toggle Completion Test** - Tests UPDATE operation  
4. **Sort by Due Date Test** - Verifies proper data ordering
5. **Delete Task Test** - Tests DELETE operation

All tests use mocked Supabase client to ensure fast, reliable testing without database dependencies.

## 🐳 Docker Containerization

### Building the Docker Image

```bash
# Build image
docker build -t devops-todo-app .

# Run container
docker run -p 80:80 devops-todo-app
```

### Multi-Stage Build Benefits

1. **Stage 1 (Builder)**: Compiles TypeScript and builds optimized production bundle
2. **Stage 2 (Production)**: Serves static files with nginx (lightweight Alpine Linux)

**Benefits:**
- Smaller final image size (~50MB vs 1GB+)
- Faster deployments
- Improved security (no build tools in production)

## 🔄 CI/CD Pipeline (GitHub Actions)

### Workflow Overview

The `.github/workflows/ci-cd.yml` file defines a three-stage pipeline:

#### Stage 1: Test
- Triggered on: Push to main, Pull Requests
- Actions:
  - Checkout code
  - Setup Node.js 20
  - Install dependencies (npm ci)
  - Run test suite
  - Upload coverage reports

#### Stage 2: Build
- Runs after: Tests pass
- Actions:
  - Setup Docker Buildx
  - Build Docker image
  - Tag with commit SHA and 'latest'
  - (Optional) Push to Docker Hub

#### Stage 3: Deploy
- Runs after: Build succeeds
- Condition: Only on main branch
- Actions:
  - Trigger Render deployment via webhook
  - Report deployment status

### Required GitHub Secrets

To enable automatic deployment, add these secrets in GitHub Settings → Secrets:

- `RENDER_SERVICE_ID` - Your Render service ID
- `RENDER_API_KEY` - Your Render API key

(If using Docker Hub, also add `DOCKER_USERNAME` and `DOCKER_PASSWORD`)

## ☁️ Deployment to Render

### Step-by-Step Deployment

1. **Create Render Account**
   - Sign up at https://render.com

2. **Create New Web Service**
   - Connect your GitHub repository
   - Choose "Docker" as environment
   - Set build command: (automatic via Dockerfile)
   - Set start command: (automatic via Dockerfile)

3. **Configure Environment Variables**
   - Add any required environment variables
   - Backend is managed by Lovable Cloud (no additional config needed)

4. **Enable Auto-Deploy**
   - Render will automatically deploy on push to main branch
   - GitHub Actions can also trigger deploys via webhook

### Alternative Deployment Options

This app can be deployed to:
- **Netlify** (static hosting)
- **Vercel** (optimized for React)
- **AWS ECS/EKS** (Docker orchestration)
- **Google Cloud Run** (serverless containers)
- **Azure App Service** (PaaS)

## 📊 DevOps Principles Demonstrated

### 1. **Continuous Integration**
- Automated testing on every commit
- Code quality checks
- Build verification

### 2. **Continuous Deployment**
- Automated deployments from main branch
- Environment-specific configurations
- Rollback capabilities (via Render or GitHub)

### 3. **Infrastructure as Code**
- Dockerfile defines reproducible environment
- GitHub Actions YAML defines CI/CD pipeline
- Database schema in SQL migrations

### 4. **Monitoring & Logging**
- Application logs via Render dashboard
- Database logs via Lovable Cloud backend
- GitHub Actions logs for CI/CD pipeline

### 5. **Security Best Practices**
- Row Level Security (RLS) at database level
- Environment variables for secrets
- HTTPS enforced in production
- Input validation on all forms

## 🎓 University Project Checklist

Use this checklist for your DevOps presentation:

- [x] Application runs locally
- [x] Code hosted on GitHub
- [x] Automated testing implemented (5 tests)
- [x] Docker containerization
- [x] Multi-stage Docker build
- [x] CI/CD pipeline with GitHub Actions
- [x] Automated deployments
- [x] Production deployment on cloud platform
- [x] Database with proper security (RLS)
- [x] User authentication
- [x] Full CRUD operations
- [x] Responsive design
- [x] Documentation (this file)

## 📝 Presentation Talking Points

### Architecture
- "Full-stack React application with TypeScript for type safety"
- "PostgreSQL database with Row Level Security ensures data isolation"
- "RESTful API patterns via Supabase client library"

### DevOps Practices
- "GitHub Actions automates our entire deployment pipeline"
- "Multi-stage Docker builds reduce image size by 95%"
- "Automated testing catches bugs before production"
- "Infrastructure as Code ensures reproducible environments"

### Scalability
- "Containerized architecture enables horizontal scaling"
- "Database indices optimize query performance"
- "CDN delivery for static assets (Render/Netlify)"

### Security
- "Row Level Security prevents unauthorized data access"
- "Environment variables keep secrets secure"
- "HTTPS encryption in production"
- "Input validation prevents injection attacks"

## 🛠️ Troubleshooting

### Common Issues

**Issue**: Tests fail locally
- **Solution**: Ensure all dependencies installed: `npm ci`

**Issue**: Docker build fails
- **Solution**: Check Docker daemon is running: `docker ps`

**Issue**: Can't log in after signup
- **Solution**: Email confirmation is disabled for testing (auto-confirm enabled)

**Issue**: Tasks not displaying
- **Solution**: Check browser console for errors, verify backend connection

**Issue**: CI/CD pipeline fails
- **Solution**: Check GitHub Actions logs, verify secrets are configured

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Render Documentation](https://render.com/docs)
- [Vitest Documentation](https://vitest.dev)

## 👥 Contributing

This is a university project, but feel free to fork and enhance!

## 📄 License

MIT License - Feel free to use for your own DevOps projects.

---

**Good luck with your university project! 🎓**
