from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'accounts', views.AccountViewSet, basename='accounts')
router.register(r'fast-costumers', views.FastCostumerViewSet, basename='fast-costumer')

urlpatterns = [
    path('', include(router.urls)),
]