# 🏋️ Fitness Tracker Web Application

A modern, responsive fitness tracking platform where users can log workouts, apply as trainers, and manage training schedules. This full-stack web app supports user roles (admin, trainer, member), personalized dashboards, and secure authentication.

---

## 🌐 Live Website

🔗 [https://your-fitness-tracker.vercel.app](https://your-fitness-tracker.vercel.app)

---

## 👤 Admin Demo Credentials

- **Username:** `admin@fitness.com`
- **Password:** `admin123`

> You can change these dummy credentials later.

---

## 🚀 Project Features (🔟 Bullet Points)

- 🔐 Firebase authentication with email/password login
- 🧑‍💼 Role-based dashboards: Admin, Trainer, Member
- 📝 Users can apply to become a trainer (pending approval)
- 📅 Trainers can set availability (days and time slots)
- 📋 Members can book training sessions with trainers
- 📈 Workout tracking with sets, reps, weights, and notes
- 💬 Members can leave reviews for trainers
- 🛠 Admin dashboard to manage users and approve trainers
- 📱 Fully responsive UI using Tailwind CSS & DaisyUI
- 🗄️ MongoDB & Express backend with secure APIs (JWT)

---

## 🧪 Dummy Data (for development)

### 🧑 Dummy Trainer
```json
{
  "name": "Hasan Trainer",
  "email": "trainer@fitness.com",
  "skills": ["Cardio", "Weightlifting"],
  "availableDays": ["Sun", "Tue", "Thu"],
  "timeSlots": ["10AM-12PM", "4PM-6PM"],
  "status": "approved",
  "image": "https://via.placeholder.com/150"
}

## Member 
{
  "name": "Fatema Member",
  "email": "member@fitness.com",
  "role": "member",
  "image": "https://via.placeholder.com/150"
}


{
  "userId": "member_user_id",
  "date": "2025-07-11",
  "exercises": [
    {
      "name": "Squats",
      "sets": 3,
      "reps": 10,
      "weight": 80
    },
    {
      "name": "Bench Press",
      "sets": 3,
      "reps": 8,
      "weight": 60
    }
  ],
  "notes": "Felt strong today!"
}
git clone https://github.com/your-username/fitness-tracker.git
cd fitness-tracker
npm install
npm run dev
