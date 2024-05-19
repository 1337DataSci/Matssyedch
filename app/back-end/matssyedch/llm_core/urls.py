# myproject/urls.py
from django.contrib import admin
from django.urls import path
from .views import chatbot_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/', chatbot_view, name='chatbot'),
]
