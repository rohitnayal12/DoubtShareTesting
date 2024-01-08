
# DoubtShare

## Introduction

Greetings and welcome to DoubtShare, a cutting-edge real-time doubt-solving platform meticulously crafted to aid students in addressing their academic inquiries promptly. This documentation serves as a detailed guide, offering an extensive overview of the application, encompassing its distinctive features, robust tech stack, and comprehensive instructions for seamless setup and operation.

---

## Features

### Secure User Authentication
- Empowering users with a secure login and registration system, facilitating access for both students and tutors with confidence and privacy.

### Dynamic Doubt Request Management
- Students possess the ability to seamlessly create doubt requests, triggering real-time notifications for online tutors whose expertise aligns with the specified criteria.

### Advanced Real-Time Communication
- Leveraging WebSocket technology to establish a robust and seamless real-time communication channel between students and tutors, ensuring a dynamic and responsive interaction.

### Intuitive Doubt History Tracking
- Providing students with a user-friendly interface to effortlessly track and review their doubt history on the platform, enhancing the overall learning experience with insightful analytics.



---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Real-Time Communication:** WebSocket (Socket.io)

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running
- React development environment set up

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/DoubtShare.git


## Running the Application

1. **Navigate to the project directory:**
    ```sh
    cd DoubtShare
    ```

2. **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```sh
    cd frontend
    npm install
    ```

4. **Start the MongoDB server.**

5. **Run the backend server:**
    ```sh
    cd backend
    npm start
    ```

6. **Run the frontend:**
    ```sh
    cd frontend
    npm start
    ```

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

---

## Application Structure

### Backend
- Engineered with Node.js and Express to ensure a robust foundation.
- Manages user authentication, doubt request processing, and WebSocket communication.
  - **server.js:** Serves as the primary entry point for the Express application.
  - **routes/:** Houses API routes dedicated to user authentication and doubt handling.
  - **models/:** Defines MongoDB data models for users and doubt requests.
  - **utils/:** Incorporates utility functions for enhanced efficiency.

### Frontend
- Crafted using React to provide a responsive and intuitive user interface.
- Collaborates seamlessly with the backend through API calls and WebSocket communication.
  - **src/:** Encompasses React components, styles, and services.
  - **components/:** Hosts reusable React components for a streamlined design.
  - **services/:** Employs functions tailored for API calls and WebSocket communication.

### API Endpoints
- **POST /api/auth/register:** Facilitates user registration securely.
- **POST /api/auth/login:** Ensures a seamless user login experience.
- **GET /api/user/one:** Retrieves detailed user information.
- **POST /api/doubt/create:** Allows students to initiate doubt requests effortlessly.

### WebSocket Communication
- Implements real-time updates to facilitate a fluid and dynamic interaction.
  - **tutorOnline:** Notifies the server when a tutor comes online.
  - **doubtRequest:** Propagates a doubt request from a student to available tutors.
  - **tutorResponse:** Manages a tutor's response to a doubt request.
  - **sendMessage:** Enables communication through instant messaging between tutors and students.

---

## Usage

### Student Interaction
1. **Authentication:**
   - Log in or register as a student with secure authentication credentials.

2. **Doubt Submission:**
   - Articulate your academic query by entering your question and selecting "Ask Doubt."

3. **Tutor Response:**
   - Patiently await responses from available tutors who align with your specific query criteria.

4. **Engagement:**
   - Seamlessly engage in a dedicated chat interface upon acceptance by a tutor, fostering effective communication and learning.

### Tutor Interaction
1. **Authentication:**
   - Log in or register as a tutor, securing your credentials for a professional experience.

2. **Tailored Notifications:**
   - Receive targeted notifications tailored to doubt requests that align with your area of expertise.

3. **Prompt Evaluation:**
   - Evaluate and respond promptly to incoming doubt requests by either accepting or rejecting, maintaining a proactive stance.

4. **Effective Communication:**
   - Upon acceptance, initiate a chat interface to effectively address the student's query, providing a comprehensive and enriching learning experience.

Feel free to explore and elevate the DoubtShare platform for a professional and seamless learning experience!


