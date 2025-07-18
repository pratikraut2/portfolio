from django.urls import path
from .views import home, contact_api 

urlpatterns = [
    path('', home, name='home'),
    path('api/contact/', contact_api, name='contact_api'),
]
