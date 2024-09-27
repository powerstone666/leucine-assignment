# leucine-assignment

This project is a full-stack web application that leverages modern technologies for the front-end and back-end, providing a seamless user experience with efficient data management and processing.

## Tech Stack

- **Frontend:**
  - React (TypeScript and TSX)
  - Tailwind CSS
  - ShadCN UI components
- **Backend:**
  - Spring Boot (REST API)
  - MySQL (Database)

## Features

1. **Frontend:**
   - Responsive UI using **Tailwind CSS** for fast and easy styling.
   - **ShadCN** components for elegant and accessible design.
   - React with **TypeScript** ensures type safety and improved code quality.
   
2. **Backend:**
   - REST API built with **Spring Boot**, providing scalable, efficient server-side logic.
   - **MySQL** database integration for storing and retrieving user data.
   - CRUD functionality for managing users, profiles, and related entities.

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- MySQL (Ensure you have MySQL server running locally or in a cloud environment)
- Java (for Spring Boot)

### Frontend Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/your-repo-url.git
Navigate to the frontend directory and install dependencies.

cd frontend
npm install

Start the development server.

npm run dev

Access the application at http://localhost:5173.

Backend Setup
Navigate to the backend directory.

cd backend

Install dependencies and set up the application.

mvn clean install

Update the application.properties file with your MySQL configuration.

spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password

Run the Spring Boot application.

mvn spring-boot:run

The backend API will be available at http://localhost:8080.

API Endpoints
Method|Endpoint |	Description
GET	/users	Fetch all users
POST	/users	Add a new user
PUT	/users/{id}	Update a user by ID
DELETE	/users/{id}	Delete a user by ID
GET	/admin	Fetch admin profile


Database Schema
User Table
Column	Type	Description
id	Long	Primary Key
username	String	Unique username
password	String	User's password
role	String	User's role
name	String	Full name of the user
email	String	Unique email
phone	String	Contact number
StudentProfile Table
Column	Type	Description
userId	Long	Foreign Key (User)
photo	String	User's profile photo
year	String	Academic year


Contribution
Feel free to fork the repository and submit pull requests. For significant changes, please open an issue to discuss what you would like to change.

License
This project is licensed under the MIT License.
