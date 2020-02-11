from django.urls import path, include
from . import views


urlpatterns = [
    path('account/<int:id>', views.GetAccount.as_view()),
    path('accounts/', views.AccountList.as_view(), name='accounts'),
    path('fast-costumers/', views.FastCostumerList.as_view(), name='fast-costumers'),
]