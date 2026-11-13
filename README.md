# EduTrack — Student Workspace

A responsive student dashboard for tracking class attendance, organizing coursework and building focused study habits. Built with **HTML, CSS and vanilla JavaScript** — no framework, package manager or build step required.
 - **link**: https://edutrakk.netlify.app/
## Features

- **Dashboard:** attendance snapshot, task progress, upcoming tasks and study streak.
- **Attendance tracker:** create subjects, record Present / Absent / Cancelled classes, review recent entries and monitor the 75% attendance target. Marking a class again on the same day updates that day's entry instead of double-counting it.
- **Study planner:** create Study, Assignment, Exam and Personal tasks; set due dates and priorities; search, filter, complete and delete tasks.
- **Focus timer:** 25-minute Pomodoro-style timer with pause, resume and reset.
- **Reports:** subject-wise attendance table, attendance and task charts, and print-to-PDF export.
- **Account screens:** sign up, log in, log out and reset a demo password.
- **Personalization:** editable display name, light/dark theme and reset controls.
- **Responsive design:** desktop, tablet and mobile layouts.
- **Privacy-friendly local storage:** each demo account has its own workspace data in the current browser.

## Run locally

Use a local web server so the browser's Web Crypto API is available for the demo password hashing.

1. Download or clone this repository.
2. Open a terminal in the project folder.
3. Run:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000` in your browser.
5. Select **Create a free account**, register with an email and a password of at least 8 characters, and start using EduTrack.

You can also use the VS Code **Live Server** extension and open the local URL it provides.

## Publish with GitHub Pages

1. Create a public GitHub repository (for example, `edutrack`).
2. Upload the **contents** of this folder to the repository root. Keep `css/`, `js/` and `assets/` in their current locations.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish. Open the generated URL and create an account.

## Demo authentication — important limitation

The login and signup flow is implemented entirely in the browser so the project can be hosted as a static GitHub Pages site without a backend. Passwords are hashed with the browser's Web Crypto API before being stored, and a simple session is kept in `localStorage`.

**This is not production-grade authentication.** Browser storage can be inspected or changed by the device owner; password reset does not send an email or verify identity; accounts and data do not sync across browsers or devices. Do not use real, reused or sensitive passwords. For a real deployment, replace the demo auth module with a trusted authentication provider and server-side authorization (for example, Firebase Authentication or Supabase Auth).

## Data storage

EduTrack stores accounts, sessions and workspace data in the current browser's `localStorage`. Clearing site data removes the saved information. The app does not currently have cloud backup or cross-device synchronization. Chart.js is loaded from a CDN for the reports page; Google Fonts are also loaded online.

## Project structure

```text
EduTrack/
├── index.html              # Main student workspace (protected by demo session)
├── login.html              # Log-in screen
├── signup.html             # Account creation screen
├── forgot-password.html    # Local demo password reset
├── css/
│   └── style.css
├── js/
│   ├── app.js              # Dashboard, attendance, planner, reports and timer
│   ├── auth.js             # Demo sign-up, login and password reset
│   └── auth-guard.js       # Redirects signed-out visitors to login
├── assets/
│   └── logo.svg
├── .gitignore
├── LICENSE
└── README.md
```

## Tech stack

- HTML5
- CSS3 (custom properties, responsive layouts)
- Vanilla JavaScript (ES6+)
- Browser `localStorage` and Web Crypto API
- Chart.js 4 (loaded from jsDelivr CDN)
- Google Fonts (DM Sans and Plus Jakarta Sans)

## License

MIT. See [LICENSE](LICENSE).
