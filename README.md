# HirePipe

HirePipe is a single-page candidate hiring pipeline tracker built with React, Vite, Tailwind CSS, and Zustand. It includes a lightweight webhook server for pushing candidate data into the pipeline via API.

## Requirements

- Node.js (v18 or higher recommended)
- npm

## Setup & Installation

1. Clone or navigate to the project directory:
   ```bash
   cd HirePipe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the full application, start both the frontend development server and the webhook server in separate terminal windows.

### 1. Start the Webhook Server
```bash
npm run server
```
The server runs on `http://localhost:3001`. It receives webhook POST requests and broadcasts them over WebSockets to connected frontend clients.

### 2. Start the Frontend Application
```bash
npm run dev
```
Open the local URL output in your terminal (typically `http://localhost:5173`).

---

## Features & Usage

### Pipeline Management
- **Add Candidates**: Click **Add candidate** in the top navigation bar or push candidates via the webhook API.
- **Stage Progression**: Candidates move through sequential stages (`Applied` → `Interview` → `Test` → `Offer` → `Accepted`). Click **Pass** to move a candidate forward or **Fail** to move them directly to `Rejected`.
- **Rejection Tracking**: When a candidate fails a stage, their card notes where rejection occurred (e.g., *Failed at: Test*).
- **Search & Filter**: Search candidates by name, email, or role, or use the dropdown to filter by stage.
- **Candidate Modal**: Click any card to edit candidate info, add interviewer notes, set star ratings (1–5), inspect stage transition history, or delete a candidate.
- **Persistence**: All state is persisted in `localStorage`.

### Webhook API Integration

You can push candidate payloads directly to `http://localhost:3001/webhook`. Candidates will automatically appear in the `Applied` stage in real-time.

### Production Test

Use the live Render backend to test production webhook delivery:

- Backend URL: `https://hirepipe.onrender.com`
- Webhook endpoint: `https://hirepipe.onrender.com/webhook`

Example payload:
```json
{
  "name": "Alex Morgan",
  "email": "alex.morgan@example.com",
  "role": "Frontend Developer",
  "notes": "Sourced via GitHub Pages test"
}
```

Example request:
```bash
curl -X POST https://hirepipe.onrender.com/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Morgan",
    "email": "alex.morgan@example.com",
    "role": "Frontend Developer",
    "notes": "Sourced via GitHub Pages test"
  }'
```

#### Single Candidate Request
```bash
curl -X POST http://localhost:3001/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Morgan",
    "email": "alex.m@example.com",
    "role": "Frontend Developer",
    "notes": "Sourced via GitHub"
  }'
```

#### Multiple Candidates Request
```bash
curl -X POST http://localhost:3001/webhook \
  -H "Content-Type: application/json" \
  -d '[
    { "name": "Sam Taylor", "email": "sam@example.com", "role": "DevOps Engineer" },
    { "name": "Jordan Lee", "email": "jordan@example.com", "role": "QA Analyst" }
  ]'
```

#### Windows PowerShell Example
```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3001/webhook" `
  -ContentType "application/json" `
  -Body '{"name": "Alex Morgan", "email": "alex.m@example.com", "role": "Frontend Developer"}'
```

---

## Available Scripts

- `npm run dev` — Starts Vite development server
- `npm run server` — Starts Express + WebSocket server
- `npm run build` — Builds production bundle in `dist/`
- `npm run preview` — Previews production build locally
