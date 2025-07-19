from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail, EmailMessage
from decouple import config

def home(request):
    return render(request, 'index.html')

@api_view(['POST'])
def contact_api(request):
    name = request.data.get('name')
    email = request.data.get('email')
    subject = request.data.get('subject')
    message = request.data.get('message')

    if not all([name, email, subject, message]):
        return Response({'success': False, 'error': 'All fields are required.'}, status=400)

    body = f"From: {name} <{email}>\n\nSubject: {subject}\n\nMessage:\n{message}"
    
    mail = EmailMessage(
        subject=subject,
        body=body,
        from_email=config('EMAIL_HOST_USER'),
        to=[config('EMAIL_RECEIVER')],
        reply_to=[email]
    )
    try:
        mail.send()
        return Response({'success': True, 'message': 'Email sent!'})
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=500)