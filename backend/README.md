# Wordwise API Documentation

## Overview

This API allows users to register, log in, create, update, and delete blog posts. It uses JSON Web Tokens (JWT) for authentication. Admin users have special privileges to manage other users and blogs.

### Base URL

http://localhost:5000

*__(this url is used for the development process not in the production)__*

## Authentication

All routes that require authentication expect a JWT token in the `Authorization` header:

Authorization: Bearer <your - token>

## Endpoints

### User Routes

#### 1. **Register a New User**

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
- **Req**:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```
 - **Response**:
```json
{
  "message": "User registered successfully!",
  "token": "<jwt-token>"
}
```

#### 2. **Login a User**
- **URL**: /api/users/login
- **Method**: `POST`
- **Description**: Log in an existing user.
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Login successful!",
  "token": "<jwt-token>",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### **3. Get User Profile**
- **URL**: /api/users/profile
- **Method**: GET
- **Description**: Fetch the logged-in user's profile. (Authentication required)
- **Headers**: `Authorization`: `Bearer <your-token>`
- **Response**:
```json
{
  "id": "user_id",
  "username": "john_doe",
  "email": "john@example.com"
}
```

#### **4. Get All Users (Admin Only)**
- **URL**: /api/users
- **Method**: GET
- **Description**: Fetch a list of all users. (Admin authentication required)
- **Headers**: `Authorization`: `Bearer <admin-token>`
- **Response**:

```json
[
  {
    "id": "user_id_1",
    "username": "john_doe",
    "email": "john@example.com"
  },
  {
    "id": "user_id_2",
    "username": "jane_doe",
    "email": "jane@example.com"
  }
]
```

### Blog Routes

#### **1. Create a Blog Post**
- **URL**: /api/blogs
- **Method**: POST
- **Description**: Create a new blog post. (Authentication required)
- **Headers**: `Authorization`: `Bearer <your-token>`
- **Request Body**:

```json
{
  "title": "How to Learn JavaScript",
  "topic": "Programming",
  "image": "https://example.com/js-image.png",
  "content": "JavaScript is a versatile language...",
  "writer": "John Doe"
}
```
- **Response**:
```json
{
  "message": "Blog post created successfully!",
  "blog": {
    "id": "blog_id",
    "title": "How to Learn JavaScript",
    "topic": "Programming",
    "image": "https://example.com/js-image.png",
    "content": "JavaScript is a versatile language...",
    "writer": "John Doe"
  }
}
```

#### **2. Update a Blog Post**

- **URL**: /api/blogs/:id
- **Method**: PUT
- **Description**: Update an existing blog post. (Authentication required)
- **Headers**: `Authorization`: `Bearer <your-token>`
- **Request Body**:
```json
{
  "title": "Updated JavaScript Guide",
  "topic": "Programming",
  "image": "https://example.com/updated-js-image.png",
  "content": "This guide has been updated to include ES6...",
  "writer": "John Doe"
}
```
Response:
```json
{
  "message": "Blog post updated successfully!",
  "blog": {
    "id": "blog_id",
    "title": "Updated JavaScript Guide",
    "topic": "Programming",
    "image": "https://example.com/updated-js-image.png",
    "content": "This guide has been updated to include ES6...",
    "writer": "John Doe"
  }
}
```

### **3. Delete a Blog Post (Admin Only)**
**URL**: /api/blogs/:id
**Method**: DELETE
**Description**: Delete a blog post. (Admin authentication required)
**Headers**: `Authorization`: `Bearer <admin-token>`
Response:
```json
{
  "message": "Blog post deleted successfully!"
}
```
Error Handling
All error responses follow the same structure:

```json
{
  "error": "Error message explaining the problem"
}
```
### Example Flow for Testing
- **Register a User**: Send a `POST` request to `/api/users/register` with registration data.
- **Login**: Send a `POST` request to `/api/users/login` with the login data and get a JWT token.
- **Create a Blog**: Send a `POST` request to `/api/blogs` with the JWT token to create a blog.
- **Update a Blog**: Send a `PUT` request to `/api/blogs/:id` with updated data.
- **Delete a Blog (Admin Only)**: Send a `DELETE` request to `/api/blogs/:id` with the admin token.