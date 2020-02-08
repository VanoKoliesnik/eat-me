from django.urls import path
from . import views


urlpatterns = [
    path('cuisines/', views.CuisineList.as_view(), name='cuisine-list'),
    path('categories/', views.CategoryList.as_view(), name='category-list'),
    path('dishes/', views.DishList.as_view(), name='dish-list'),
]