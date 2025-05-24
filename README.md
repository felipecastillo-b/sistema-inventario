[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/felipecastillo-b/sistema-inventario/releases)

## Overview

**Sistema Inventario/Iventory System** is a comprehensive inventory management system designed to help businesses:

- Track products and stock levels

- Manage client information

- Monitor financial transactions (sales, purchases, expenses)

- Control user access with role-based permissions

Built with modern technologies, the project despite being in a monorepo can easily be separated between **Frontend**, **Backend** and **Database**.

## Technology Stack

- **Frontend:** NextJS, React, Redux Toolkit, RTK Query, Tailwind CSS, Material UI, Recharts.

- **Backend:** Express, NodeJS, Prisma ORM, JWT, cloudinary.

- **Database:** PostgreSQL.

## Project Architecture

#### Frontend

- **State Management:** Redux Toolkit + RTK Query.

- **UI Components:** Modular structure with Tailwind CSS & MUI.

- **Key Features:** 
  - Dashboard with analytics
  - Product/Client/Financial management
  - Responsive design

#### Backend

- **API Routes:** RESTful endpoints for CRUD operations.

- **Layered Architecture:**
  - **Routes → Controllers → Services → Database**

- **Authentication:** JWT.

#### Database

- **Entities:** Products, Clients, Sales, Purchases, Expenses, Users, Roles, etc.

- **Relationships:** Schema with foreign keys.

## Key Modules

- **Product Management:** CRUD operations, stock tracking, category/supplier assignment.

- **Client Management:** Customer records, contact details, sales history.

- **Financial Tracking:** Sales, purchases, expenses, and category-wise reports.

- **User Management:** Role-based access control (Admin, Staff, etc.).

## Data Flow

1. **UI Event** → RTK Query API call
2. **Backend** → Controller → Service → Prisma ORM
3. **Database** → Processes query → Returns data
4. **Frontend** → Updates state → Renders changes

## Getting Started

#### Prerequisites

- NodeJS **v18+**
- PostgreSQL **v15+**

#### Instalattion

1. Clone the repository:

```bash
git clone https://github.com/felipecastillo-b/sistema-inventario.git  
```

2. Install dependencies:

```bash
cd sistema-inventario  
npm install  
cd server  
npm install  
```

3. Set up environment variables (.env files in root and server/).

```bash
#Example .env in root folder
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000/"
```
```bash
#Example .env in server/ folder
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

4. Run migrations:

```bash
cd server  
npx prisma migrate dev  
```

5. Start the application:

```bash
#Dev Frontend
npm run dev
#Dev Backend in server/
npm run dev

#Start Frontend
npm run start
#Start Backend in server/
npm run start
```

## Documentation ~Soon~

- [~Frontend Components~](https://github.com/felipecastillo-b)
- [~Backend Architecture~](https://github.com/felipecastillo-b)
- [~Database Schema~](https://github.com/felipecastillo-b)

## Contact

#### For questions or contributions:

- **Email:** <felipecastillo.snk@gmail.com> | <hardcode.contacto@gmail.com> 
- **Issues:** [Github Issues](https://github.com/felipecastillo-b/sistema-inventario/issues)

## License

- **License:** [MIT](https://github.com/felipecastillo-b/sistema-inventario/blob/main/LICENSE.md)