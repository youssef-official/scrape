# Scrape Server (Node.js + Playwright)

A simple Node.js server that uses Playwright to scrape websites and return their HTML content.

## Features
- Built with **Express.js**.
- Uses **Playwright (Chromium)** for rendering.
- Basic URL validation and security.
- CORS enabled.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd scrape
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Usage:
   Open your browser or use curl:
   `http://localhost:3000/scrape/https://example.com`
