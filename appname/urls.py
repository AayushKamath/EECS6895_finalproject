from django.urls import path
from .views import stockdata, home
from . import views


urlpatterns = [
    path('', home),
    path('stockdata/<str:stockdata>/', views.stockdata, name='stockdata'),
]
