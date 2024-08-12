# Simple Express Node.js Project

# Group #1

# Lisa, Kyle and Steve

## Overview

This project is a simple web application built with Node.js and the Express framework. It includes three pages:

1. **Home**: The landing page of the application.
2. **Login**: A page where users can create an account or log in.
3. **Search**: A page where users can perform searches (authentication required).

The application also keeps a log of all search activities.

## Features

- **Home Page**: A welcoming page with basic information about the application.
- **Login Page**: Allows users to create a new account or log in with existing credentials.
- **Search Page**: Requires users to be logged in to access. It logs all search queries performed.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/steve-sharpe/deb_fs_sprint_2024
   cd https://github.com/steve-sharpe/deb_fs_sprint_2024
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the application:

   ```bash
   npm index
   ```

2. Open your web browser and go to `http://localhost:3000`.

## Usage

1. **Home Page**: Navigate to `/` to view the home page.

2. **About**:
   - Navigate to the about page.
3. **Search Page**:
   - Navigate to `/search` to use the search functionality.
   - You must be logged in to access this page.
   - Searches are logged and can be reviewed.

## Logging

Searches performed on the Search Page are recorded in a log in a directory named `logs/` located in the root directory of the project.

## Project Structure

- `index.js` - Main application file where Express server is configured.
- `routes/` - Directory containing route definitions.
  - `index.js` - Routes for the home page.
  - `auth.js` - Routes for the login page.
  - `search.js` - Routes for the search page.
- `views/` - Directory containing view templates.
  - `home.ejs` - Template for the home page.
  - `login.ejs` - Template for the login page.
  - `search.ejs` - Template for the search page.
  - `register.ejs` - Template for the register page.
  - `qabout.ejs` - Template for the about page.
- `public/` - Directory for static files like CSS and JavaScript.
- `logs/` - File where search queries are logged.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request with your proposed changes. Ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact [steve.sharpe (at) keyin.com](mailto:steve.sharpe@keyin.com).

---

Thank you for using this Simple Express Node.js Project! We hope you find it useful.
