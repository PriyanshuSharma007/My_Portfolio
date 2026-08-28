/**
 * Frontend Configuration File
 * API_BASE_URL specifies the destination server for database queries.
 * - In local development: loads value from frontend/.env (defaults to http://localhost:5000).
 * - In Vercel production: loads value configured in Vercel settings -> Environment Variables.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
