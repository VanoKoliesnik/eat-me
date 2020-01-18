from django.contrib import admin
from .models import Dish, Cuisine, Category, Institution

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    pass

@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    pass

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    pass