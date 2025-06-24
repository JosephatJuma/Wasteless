# ♻️ WasteLess — Build in Public

**WasteLess** is a mobile-first platform that helps people **give away items they no longer need** to those who do. From food and clothes to books and tools — you can share them with someone nearby, quickly and safely.

Built as part of a **30-day Build In Public challenge** by [Joseph Sots](https://github.com/JosephatJuma), this project invites both developers and non-tech folks to contribute ideas, test features, and follow progress in real-time.

---

## 🛠 Tech Stack

| Layer       | Tool                     |
|-------------|--------------------------|
| Frontend    | [React Native (Expo)](https://expo.dev) |
| Backend     | [Spring Boot](https://spring.io/projects/spring-boot) + [Docker](https://www.docker.com/) |
| Auth & Storage | [Supabase](https://supabase.com) |
| Database    | PostgreSQL               |
| API Docs    | Swagger / OpenAPI        |

---

## ✨ Key Features

- ✅ Sign up and log in with Supabase
- 📦 Post items with photo, description, and location
- 📍 See available items near you
- 🤝 Request items from others
- 👤 View your posted and requested items
- ⚠️ Report suspicious listings
- 🔐 Safety-first design with verified accounts

---

## 🧱 Folder Structure

```bash
.
├── backend/         # Spring Boot + Docker backend API
├── frontend/        # React Native (Expo) mobile app
├── .github/         # GitHub workflows (CI/CD coming soon)
├── README.md
└── ...

```
## Getting Started
### 📦 Backend (Spring Boot + Docker)
cd backend/
./mvnw clean package
docker build -t wasteless-backend .
docker run -p 8080:8080 wasteless-backend

### Frontend (React Native with Expo)
cd frontend/
npm install
npx expo start

### API Docs
Once backend is running:
http://localhost:8080/swagger-ui.html

##📅 Build Timeline

| Week | Focus                         |
| ---- | ----------------------------- |
| 1    | Setup + Auth + Item APIs      |
| 2    | UI + Item Posting/Requests    |
| 3    | Geolocation + Safety + Polish |
| 4    | Testing + Feedback + Launch   |

Follow weekly updates on TikTok, X, Instagram, Whatsaap, YouTube or LinkedIn

## Built With Purpose

    “Whatever you do, work at it with all your heart, as working for the Lord…” — Colossians 3:23
    This app is built not just to solve a problem, but to reflect love, generosity, and purpose.
    It’s not just code — it’s community. It’s mission. It’s faith in action. 

