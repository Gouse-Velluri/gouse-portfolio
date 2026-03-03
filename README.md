# Gouse Velluri — Portfolio
## Django Full Stack Portfolio with Certificate Upload

---

## 🚀 Quick Start (3 steps)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Setup database
python manage.py makemigrations portfolio
python manage.py migrate

# 3. Create admin user
python manage.py createsuperuser

# 4. Run server
python manage.py runserver
```

Visit: http://127.0.0.1:8000
Demo: https://gouse-portfolio-wzpj.onrender.com

---

## 📤 Upload Certificates

1. Go to: http://127.0.0.1:8000/admin/
2. Login with your superuser credentials
3. Click **Certificates → Add Certificate**
4. Fill in: Title, Issuer, Date
5. Upload **PDF** (certificate_file) AND/OR **Image preview** (certificate_image)
6. Click Save

Certificates appear on the portfolio with **View**, **Download**, and **Verify** buttons.

---

## 🗂️ Project Structure

```
portfolio_final/
├── manage.py
├── requirements.txt
├── portfolio/
│   ├── models.py       ← Project, Certificate, ContactMessage
│   ├── views.py        ← home, contact views
│   ├── admin.py        ← Admin panel config
│   ├── urls.py
│   ├── templates/portfolio/
│   │   ├── base.html   ← Sidebar layout
│   │   └── home.html   ← All 8 pages
│   └── static/
│       ├── css/style.css
│       ├── js/main.js
│       └── images/     ← Put resume.pdf here
├── gouse_portfolio/
│   ├── settings.py
│   └── urls.py
```

---

## 📁 Add Your Resume PDF

Place your resume at:
```
portfolio/static/images/resume.pdf
```

---

## 🌍 Deploy on Render

1. Push to GitHub
2. Connect repo to Render
3. Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
4. Start command: `gunicorn gouse_portfolio.wsgi`
5. Add env vars: `SECRET_KEY`, `DEBUG=False`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`
