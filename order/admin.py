from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Замовник', {
            'fields': [('name', 'surname'), 'customerPhone']
        }),
        ('Інформація про замовлення', {
            'fields': ['paymentMethod', 'orderList', 'totalPrice', 'totalQuantity', 'orderDetail']
        }),
        ('Статус оплати', {
            'fields': ['paid']
        }),
    )

    list_display = ['id', 'name', 'surname',
                    'customerPhone', 'get_cost', 'order_list', 'paid']
    list_display_links = ['name', 'surname', 'customerPhone', 'paid']
    search_fields = ['name', 'surname', 'customePhone']
    list_filter = ['paid', 'orderList']
