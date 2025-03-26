# Mellifera API

Mellifera API is a task and checklist management system designed to optimize work processes and increase productivity.

## Business Description

Mellifera is a platform that allows users to efficiently organize and manage their daily tasks and workflows through:

- **Task Management**: Create, edit, mark, and organize tasks with different priority levels.
- **Checklists**: Create lists with verifiable items for repetitive processes or standard procedures.
- **Progress Tracking**: Monitor the status of completed and pending tasks.

This API provides the backbone for front-end applications that require a robust task management system.

## Technologies

The project uses the following technologies:

### Backend
- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: Programming language that adds static typing to JavaScript.
- **Prisma ORM**: Modern ORM (Object-Relational Mapping) for Node.js and TypeScript that simplifies database access.
- **PostgreSQL**: Relational database management system.

### Technical Features
- RESTful architecture
- Data validation with class-validator and class-transformer
- API with '/api' prefix
- CORS support

## Data Structure

### Tasks
- **Properties**: ID, title, description, status (completed/pending), priority (low/medium/high), creation and update dates.

### Checklists
- **Properties**: ID, title, items, creation date.

### List Items
- **Properties**: ID, status (checked/unchecked), description, value, reference to the checklist.

## Installation

```bash
# Install dependencies
$ npm install

# Configure the database
$ npx prisma migrate dev
```

## Execution

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Testing

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## API Documentation

The API exposes endpoints to manage tasks and checklists under the `/api` prefix.

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Get a task by ID |
| DELETE | `/api/tasks/:id` | Delete a task |
| PUT | `/api/tasks/:id` | Update an existing task |

#### Task Structure
```json
{
  "id": 1,
  "title": "Complete report",
  "description": "Write monthly sales report",
  "done": false,
  "priority": "high",
  "createdAt": "2023-05-24T10:00:00.000Z",
  "updatedAt": "2023-05-24T10:00:00.000Z"
}
```

### Checklist Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/checklists` | Get all checklists |
| POST | `/api/checklists` | Create a new checklist with items |
| GET | `/api/checklists/:id` | Get a checklist by ID |
| DELETE | `/api/checklists/:id` | Delete a checklist |

#### Checklist Structure
```json
{
  "id": 1,
  "titulo": "Sales process",
  "createdAt": "2023-05-24T10:00:00.000Z",
  "items": [
    {
      "id": 1,
      "description": "Contact the client",
      "checked": false,
      "valor": 10,
      "checklistId": 1
    }
  ]
}
```

### Checklist Item Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checklists/:checklistId/items` | Add an item to a checklist |
| GET | `/api/checklists/:checklistId/items` | Get all items from a checklist |
| GET | `/api/checklists/:checklistId/items/:itemId` | Get a specific item |
| PUT | `/api/checklists/:checklistId/items/:itemId` | Update an item |
| DELETE | `/api/checklists/:checklistId/items/:itemId` | Delete an item |

#### Item Structure
```json
{
  "id": 1,
  "description": "Contact the client",
  "checked": false,
  "valor": 10,
  "checklistId": 1
}
```

## License

This project is licensed under the terms of Mellifera's private license.
