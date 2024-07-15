# Cynomi

## Features

- Add new users.
- Log sleep duration for users.
- View the list of users and their sleep entries.
- Display sleep chart for the last 7 days.

## Technologies Used

- Next.js
- React
- TypeScript
- Prisma
- SQLite (for development and testing)

## Installation and Setup

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alisonborba/cynomi-test.git
   cd cynomi-test
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application should now be running on `http://localhost:3000`.

## Deployment

The application can be deployed to Vercel. The current live version is available at:

[Vercel Deployment URL](https://cynomi.vercel.app/)

## Possible Improvements

- **API Error Handling**: Implement comprehensive error handling for all API endpoints to provide more informative error messages and improve robustness.
- **User Uniqueness**: Add validation to ensure that user are unique, preventing duplicate user entries.
- **Optimized Data Fetching**: Use more sophisticated data fetching techniques, such as GraphQL or custom REST endpoints, to reduce the amount of data transferred and avoid fetching the entire user list repeatedly.
- **Enhanced User Interface**: Improve the UI with better design and user experience enhancements.
- **Authentication and Authorization**: Add user authentication and authorization to secure the application and provide personalized experiences.

## Usage

### Adding a New User

1. Click the "Add New User" button.
2. Fill in the user's name and gender.
3. Submit the form to add the user.

### Logging Sleep

1. Select a user from the dropdown.
2. Enter the sleep duration in hours.
3. Select the date.
4. Submit the form to log the sleep entry.

### Viewing Sleep Data

1. Go to the `/list` page to view all users and their sleep entries.
2. Click on a user to see a bar chart showing their sleep chart for the last 7 days.

## Demo Video

For a quick demo of the application, you can watch the following video:

[Demo Video](https://www.loom.com/share/eda69c8624ee4378aaa3725528ffcdc2?sid=b557e219-23ea-4ca1-825c-e25da69d954e)

---

Feel free to reach me out if have any question.
