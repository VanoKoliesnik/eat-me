from django.contrib import admin
from .models import Dish, Cuisine, Category, Institution

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Загальна інформація', {
            'fields': ('name', 'image', 'price', 'cuisine', 'category', 'composition')
        }),
        ('Додаткова інформація', {
            'fields': [('weight', 'calorie')]
        }),
        ('Стан', {
            'fields': ['state']
        }),
    )
    list_display = ['name', 'price', 'state', 'cuisine', 'category', 'weight']

@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_display_links = ['name']
    search_fields = ['name']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_display_links = ['name']
    search_fields = ['name']

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Загальна інформація', {
            'fields': ('name', 'image', 'phone', 'position', 'about')
        }),
        ('Кухня та меню', {
            'fields': [('cuisine', 'menu')]
        }),
        ('Час роботи', {
            'fields': [('timeFrom', 'timeBefore')]
        }),
    )
    list_display = ['id', 'name', 'phone', 'position', 'timeFrom', 'timeBefore']
    list_display_links = ['id', 'name', 'phone', 'position', 'timeFrom', 'timeBefore']
    search_fields = ['id', 'name', 'phone', 'position', 'about']
    list_filter = ['cuisine']