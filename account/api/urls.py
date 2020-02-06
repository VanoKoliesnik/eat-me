from django.urls import path, include
from . import views


urlpatterns = [
    path('accounts/', views.account_list, name='accounts'),
    path('fast-costumers/', views.fast_costumer_list, name='fast-costumers'),
]