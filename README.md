# 📘 User App — React + TypeScript + Vite + AntD

**A clean and simple application for working with users and comments using the JSONPlaceholder API.** 
**You can view a list of users, open a detailed profile, and add comments from three different places in the app.**

---

## 🚀 Getting Started

### 1️⃣ Install dependencies:
```bash
npm install
```

### 2️⃣ Run development server:
```bash
npm run dev
```

### 3️⃣ Build for production:
```bash
npm run build
```

### 4️⃣ Preview production build:
```bash
npm run preview
```

---

## 🧰 Technologies Used

### 🎨 Frontend

* #### React
* #### TypeScript
* #### Vite
* #### Redux Toolkit
* #### React Router v6
* #### Ant Design v5
* #### SCSS Modules
* #### Axios
* #### i18next (react-i18next)

### 🌐 API

* #### **JSONPlaceholder** (`/users`, `/comments`, `POST /comments`)

---

## 🏛 Project Architecture Overview

### 🟦 Redux Toolkit
#### The project uses two main slices:
| Slice         | Responsibility                                       |
|---------------|--------------------------------------------------------|
| `usersSlice`   | Fetching and storing users list                       |
| `commentsSlice` | Loading comments for a specific user and adding new ones |

#### New comments are:

* sent via POST to API
* stored locally inside added[]
* merged with server comments during loadCommentsByUser

### 🧭 Routing (React Router v6)
| Route          | Description                                      |
|-----------|--------------------------------------------------------|
| `/users` | Users list page                     |
| `/users/:id` | User detail page |

### 💬 Adding Comments (Modal)
#### A comment can be added from three places:

1. **UsersPage** — top button (user must be selected manually)
2. **UserList** — button in each user row (user pre-filled)
3. **UserDetailPage** — header button (user pre-filled)

---

## 📌 Notes

### This project is ideal for demonstrating:

* #### Modern React Architecture
* #### State Management with Redux Toolkit
* #### Modular SCSS styling
* #### API Integration
* #### Simple commenting Workflow
* #### Internationalized UI (EN/CZ)



