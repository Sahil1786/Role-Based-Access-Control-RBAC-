# RBAC Blog Platform

A secure blog platform with role-based access control (RBAC) built with Next.js, MongoDB, and shadcn/ui components.

## Features

- **Authentication**: Secure login and signup with JWT
- **Role-Based Access Control**: Different permissions for admin and user roles
- **Blog Management**: Create, read, update, and delete blog posts
- **User Management**: Admin can manage users and change roles
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes and Server Actions
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Form Validation**: React Hook Form with Zod

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable React components
- `/lib`: Utility functions, database connection, models, and middleware

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
\`\`\`

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/rbac-blog.git
cd rbac-blog
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Roles and Permissions

### Admin
- Create, read, update, and delete any blog post
- Manage users (view all users, change roles)
- Access admin dashboard

### User
- Create, read, update, and delete their own blog posts
- Read all blog posts
- Update their profile

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Login a user
- `POST /api/auth/logout`: Logout a user
- `GET /api/auth/me`: Get current user information

### Blog Posts
- `GET /api/posts`: Get all blog posts
- `POST /api/posts`: Create a new blog post (authenticated)
- `GET /api/posts/:id`: Get a specific blog post
- `PUT /api/posts/:id`: Update a blog post (owner or admin)
- `DELETE /api/posts/:id`: Delete a blog post (owner or admin)

### Users (Admin Only)
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user
- `PATCH /api/users/:id`: Update a user's role
- `DELETE /api/users/:id`: Delete a user

## Architecture and Flow

1. **Authentication Flow**:
   - User submits login credentials
   - Server validates credentials and issues JWT
   - JWT is stored in an HTTP-only cookie
   - Protected routes check for valid JWT

2. **Authorization Flow**:
   - Middleware checks user role before allowing access to protected routes
   - Different UI elements are rendered based on user role
   - API endpoints validate permissions before processing requests

3. **Data Flow**:
   - Client sends requests to Next.js API routes
   - API routes connect to MongoDB using Mongoose
   - Data is validated, processed, and returned to the client

## Security Considerations

- Passwords are hashed using bcrypt
- JWTs are stored in HTTP-only cookies
- Role-based middleware protects sensitive routes
- Input validation using Zod schema
- MongoDB connection is secured with proper authentication

## License

This project is licensed under the MIT License.
# Role-Based-Access-Control-RBAC-
