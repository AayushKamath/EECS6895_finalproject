from django.urls import path
from .views import stockdata, home, predict
from . import views


urlpatterns = [
    path('', home),
    path('stockdata/<str:stockdata>/', views.stockdata, name='stockdata'),
    path('predict', views.predict, name='predict')
]
