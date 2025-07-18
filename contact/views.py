from django.shortcuts import render 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage 

def home(request):
    return render(request, 'index.html')

@api_view(['POST'])
def contact_api(request):
    name = request.data.get('name')
    email = request.data.get('email')
    subject = request.data.get('subject')
    message = request.data.get('message')

    if not all([name, email, subject, message]):
        return Response({'success': False, 'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        full_message = f"""
        You received a new message from your portfolio contact form:

        Name: {name}
        Email: {email}
        Subject: {subject}
        Message: {message}
        """

        email_msg = EmailMessage(
            subject=subject,
            body=full_message,
            from_email="pratik.raut180@gmail.com",
            to=["pratik.raut180@gmail.com"],
            reply_to=[email]
        )
        email_msg.send()

        return Response({'success': True, 'message': 'Message sent successfully!'})

    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


