// En production (Vercel), cette variable sera définie.
// En local, elle n'existe pas, donc on utilise http://localhost:5000
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

