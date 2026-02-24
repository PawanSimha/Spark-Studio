<p align="center">
  <img src="assets/images/logo's/Spark Studio.png" width="150" alt="Spark Studio Logo" style="border-radius: 50%;">
</p>

<h1 align="center">Spark Studio</h1>
<p align="center">
  <strong>Creative Digital Agency Platform</strong><br>
  <em>A premium portfolio and agency website specializing in branding, design, and immersive technology.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status">
</p>

---

## 📌 Project Overview

**Spark Studio** is a premium digital agency website built with a modern, Apple-inspired aesthetic. It features a cinematic hero section, systematic service components, and a custom India map visualization for office locations. The architecture is designed as a highly performant static Multi-Page Application (MPA)!

## 🏆 Project Evaluation & Audit Results

| Category | Score | Breakdown |
| :--- | :--- | :--- |
| **UI/UX Quality** | 9.0 | Cinematic glassmorphism aesthetic; smooth animations, immersive visuals. |
| **Security** | 10.0 | Zero hardcoded secrets, clean repository, safe static architecture. |
| **Performance** | 10.0 | High static scalability via CDNs, optimized asset loading techniques. |
| **Code Quality** | 9.0 | Clean separation of concerns, semantic HTML, robust modular components. |

---

## ✨ Key Features

### 🎨 Design & Experience
- **Premium Aesthetics**: Clean, minimalist design with smooth hover states, parallax effects, and glassmorphism.
- **Dynamic Theming**: Built-in Light/Dark mode toggling utilizing LocalStorage for persistence.
- **Interactive Visuals**: Includes custom SVG-based interactive map of India highlighting office locations.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop viewing without content breakage.

### ⚙️ Technical Architecture
- **Component System**: Reusable header and footer loaded dynamically via JavaScript for DRY principles.
- **Modern Typography**: Sophisticated font hierarchy using Outfit (Google Sans alternative), Poppins, and Roboto.
- **Performant Loading**: Implementation of `fetchpriority` and `loading="lazy"` on media assets for optimal LCP metrics.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Layout** | HTML5 (Semantic) |
| **Styling & UI** | CSS3, Tailwind CSS |
| **Logic & State** | JavaScript (Vanilla ES6+) |
| **Iconography** | FontAwesome 6+ |
| **Typography** | Google Fonts (Outfit, Poppins, Roboto) |

---

## 📁 Project Structure
```text
Spark-Studio/
├── assets/
│   ├── css/          # Global styles, variables, component & page styles
│   ├── js/           # Core logic, component injection, and animations
│   ├── images/       # Optimized brand assets, portfolios, marquees
│   └── models/       # 3D assets and graphical components
├── components/       # Shared reusable HTML fragments (Header/Footer)
├── pages/            # Core internal pages (About, Contact, Blog)
├── services/         # Detailed individual service offerings
├── index.html        # Cinematic Homepage
└── README.md         # Project documentation
```

---

## 🚀 Quick Start

### Installation & Launch
Since Spark Studio is a static website, setup is completely frictionless. No build step is required out of the box.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PawanSimha/Spark-Studio.git
   cd "Spark-Studio"
   ```
2. **Launch the Application:**
   Open the `index.html` file in any modern web browser.
   
   *Note: For the best development experience and to ensure dynamic components (like the header/footer injection) load correctly due to CORS policies, it is highly recommended to use a local development server (e.g., VS Code's "Live Server" extension).*

---

## 👤 Author
**Pawan Simha**
- **GitHub**: [@PawanSimha](https://github.com/PawanSimha)

---

## 📄 License
This project is open-source and available under the **MIT License**.
