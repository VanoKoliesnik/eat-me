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