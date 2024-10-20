# WordWise Frontend

This is the frontend for the WordWise application, a language learning platform.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (preferably the latest LTS version)
- npm (usually comes with Node.js)

## Setup Guide

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   This command will start the Vite development server and watch for changes in your Tailwind CSS input file.

4. Open your browser and navigate to `http://localhost:5173` (or the URL provided in the console) to view the application.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with hot-reloading and Tailwind CSS watching.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally preview the production build.

## Project Structure

- `src/`: Contains the source code for the application
  - `components/`: Reusable components
  - `pages/`: Individual page components
  - `styles/`: CSS files, including Tailwind CSS input file
- `public/`: Static assets that will be served directly

## Technologies Used

- [Vite](https://vitejs.dev/): Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework

## Contributing

Please read the main project's CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's LICENSE.md file for details.
