# 🌐 Pratik Raut's Developer Portfolio

A personal developer portfolio website showcasing my skills, featured projects, and a working contact form powered by Django backend.

## 🔗 Live Demo

> [View My Portfolio](https://portfolio-i5o0.onrender.com)

---

## 📌 Features

* Beautifully responsive UI with modern design.
* Typing animation in hero section.
* Scroll-based animations for content appearance.
* Smooth navigation and active link highlighting.
* Interactive contact form with backend email handling (Django + SMTP).
* Projects linked to GitHub repositories.
* Resume download (with Google Drive access request).

---

## 🛠️ Tech Stack

### Frontend:

* HTML5
* CSS3
* JavaScript (Vanilla)
* Font Awesome
* Google Fonts

### Backend:

* Python 3
* Django 5.x
* Django REST Framework

### Others:

* Google Drive (for Resume hosting)
* SMTP (Gmail with App Password)

---

## 🧠 Projects Showcased

* 🎷 **Spotify Clone** – UI Clone of Spotify with responsive player.
* 🎮 **YouTube Video Summarizer** – NLP app that summarizes YouTube content.
* 🌾 **Smart Agriculture with ML** – Crop and disease prediction using ML.
* 📟 **Online Bill Generator** – Dynamic bill creation and PDF export.
* 💒 **Notes App (Django CRUD)** – Django-powered app for note management.

---

## 📂 Folder Structure

```
portfolio/
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   └── index.html
├── contact/
│   ├── views.py
│   ├── urls.py
├── portfolio/
│   ├── settings.py
│   └── urls.py
└── manage.py
```

---

## 📧 Contact Form Setup

* Contact form uses Django backend to send email directly from visitor to owner.
* Uses SMTP (Gmail) with App Password for secure sending.
* Visitor’s actual email is set as `reply_to` so you can reply directly.

### Django Email Settings:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
```

> ⚠️ Replace with your own Gmail + App Password
> ✅ Enable "Allow less secure apps" or create App Password via Google Security

---

## 🎟️ Getting Started Locally

```bash
git clone https://github.com/pratikraut2/portfolio.git
cd portfolio
python -m venv venv
source venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py runserver
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* Font Awesome Icons
* Google Fonts
* Django & DRF
* FormSubmit (initial testing)

---

## 💬 Want to connect?

Feel free to reach out via the contact form or connect on [LinkedIn](https://linkedin.com/in/pratikraut02).
