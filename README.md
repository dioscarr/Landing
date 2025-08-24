# Landing

Vite + React app integrated with Supabase and deployed to GitHub Pages.

## Project Structure

```
.
├── src
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point of the React application
│   ├── assets           # Static assets (images, fonts, stylesheets)
│   └── components       # Reusable React components
├── public
│   └── favicon.svg      # Favicon for the application
├── package.json         # npm configuration file
├── vite.config.js       # Vite configuration settings
├── README.md            # Project documentation
├── .env                 # Local dev env (gitignored)
├── .env.production      # Production env used by CI (committed)
└── index.html           # Main HTML file for the application
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Landing
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000/Landing/`.

Env vars:
- Local dev: put values in `.env`
- CI/Pages: values come from `.env.production` or GitHub Actions Variables

## Usage

- Modify the `src/App.jsx` file to change the main application component.
- Add any static assets to the `src/assets` directory.
- Create reusable components in the `src/components` directory.

## License

This project is licensed under the MIT License.