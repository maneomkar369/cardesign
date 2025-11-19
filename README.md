# Car Design Idea Hub

A full-stack web application for creating and sharing car design ideas using Django REST Framework backend and React frontend with Konva canvas editor.

## Features

- User registration and JWT authentication
- Create, view, and edit car designs
- Upload multiple images and SVG assets
- Interactive canvas editor with drag-and-drop
- Like and comment on designs
- Version history for designs
- Search and filter designs by tags

## Tech Stack

- **Backend**: Django 5.2, Django REST Framework, PostgreSQL
- **Frontend**: React 19, Vite, Tailwind CSS, Konva
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL (SQLite for development)
- **Deployment**: Docker + Docker Compose

## Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.12+ (for local backend development)

### Quick Start with Docker

1. Clone the repository
2. Copy `.env.example` to `.env` and update settings
3. Run `docker-compose up --build`
4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin: http://localhost:8000/admin

### Local Development

#### Backend

1. Create virtual environment: `python -m venv .venv`
2. Activate: `source .venv/bin/activate`
3. Install dependencies: `pip install -r backend/requirements.txt`
4. Run migrations: `python manage.py migrate`
5. Create superuser: `python manage.py createsuperuser`
6. Run server: `python manage.py runserver`

#### Frontend

1. Install dependencies: `cd frontend && npm install`
2. Run dev server: `npm run dev`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/refresh/` - Refresh JWT token

### Designs
- `GET /api/designs/` - List designs (with search/filter)
- `POST /api/designs/` - Create new design
- `GET /api/designs/{slug}/` - Get design details
- `PATCH /api/designs/{slug}/` - Update design
- `DELETE /api/designs/{slug}/` - Delete design
- `POST /api/designs/{slug}/images/` - Upload additional images
- `POST /api/designs/{slug}/like/` - Toggle like
- `GET /api/designs/{slug}/comments/` - List comments
- `POST /api/designs/{slug}/comments/` - Add comment

### Assets
- `GET /api/assets/` - List design assets
- `POST /api/assets/` - Upload new asset

### Versions
- `GET /api/designs/{slug}/versions/` - List design versions
- `POST /api/designs/{slug}/versions/` - Save new version

## Usage

1. Register a new account or login
2. Create a new design with title, description, and images
3. Edit the design using the Konva canvas editor
4. Add assets, change colors, and save versions
5. View designs in the gallery, like and comment

## Development

### Running Tests

Backend: `python manage.py test`

Frontend: `npm test` (if added)

### Code Structure

```
cardesign/
├── backend/          # Django project
│   ├── designs/      # Main app
│   ├── manage.py
│   └── requirements.txt
├── frontend/         # React project
│   ├── src/
│   │   ├── pages/
│   │   └── components/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Deployment

1. Update `.env` with production settings
2. Build and run with Docker Compose
3. Configure reverse proxy (nginx) for production
4. Set up S3-compatible storage for media files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

MIT License