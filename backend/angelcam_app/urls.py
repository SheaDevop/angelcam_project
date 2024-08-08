from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login_view'),
    path('cameras/', views.camera_list_view, name='camera_list'),
]