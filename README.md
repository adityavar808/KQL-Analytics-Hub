# Product Dashboard

A responsive and user-friendly dashboard for visualizing product data, built with React and Material-UI.

## Features

*   **Dynamic Data Fetching:** Fetches and displays product data from a configurable API endpoint.
*   **Time-Range Filtering:** Filter data by predefined time ranges (e.g., last hour, last day) or a custom date and time range.
*   **Customizable Columns:** Select which columns to display in the data table.
*   **Pagination:** The data table is paginated for easy navigation of large datasets.
*   **Responsive Design:** The application is designed to work on various screen sizes.
*   **User Feedback:** Provides loading indicators and success/error notifications.

## Built With

*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
*   [Vite](https://vitejs.dev/) - A fast build tool and development server for modern web projects.
*   [Material-UI](https://mui.com/) - A popular React UI framework.
*   [Axios](https://axios-http.com/) - A promise-based HTTP client for the browser and Node.js.
*   [ESLint](https://eslint.org/) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/dashboard-react.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root of the project and add the following environment variable:
    ```
    VITE_API_URL=https://api.example.com
    ```
    Replace `https://api.example.com` with the URL of your API.

## Configuration

The application requires the following environment variable to be set in a `.env` file in the root of the project:

*   `VITE_API_URL`: The base URL for the API from which to fetch product data.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the project files using ESLint to check for code quality and style issues.

### `npm run preview`

Serves the production build locally to preview the application before deploying.
