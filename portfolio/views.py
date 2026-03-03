from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.http import JsonResponse
from django.contrib import messages as django_messages
from .models import Project, Certificate, ContactMessage


def home(request):
    projects     = Project.objects.all()
    certificates = Certificate.objects.all()
    return render(request, 'portfolio/home.html', {
        'projects':     projects,
        'certificates': certificates,
    })


def contact(request):
    if request.method == 'POST':
        name    = request.POST.get('name', '').strip()
        email   = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', 'Portfolio Contact').strip()
        msg     = request.POST.get('message', '').strip()

        if name and email and msg:
            # Save to DB
            ContactMessage.objects.create(
                name=name, email=email, subject=subject, message=msg
            )
            # Send email
            try:
                send_mail(
                    subject=f'[Portfolio] {subject} — {name}',
                    message=f'From: {name} <{email}>\n\n{msg}',
                    from_email=email,
                    recipient_list=['vellurigouse620@gmail.com'],
                    fail_silently=True,
                )
            except Exception:
                pass

            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'status': 'ok'})

    return redirect('home')
