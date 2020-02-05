from django.db import models
from menu.models import Dish
from datetime import datetime


class Order(models.Model):

    class Meta:
        verbose_name = 'Замовлення'
        verbose_name_plural = 'Замовлення'
    
    CASHTOCOURIER = 'cash'
    CASHLESSTOCOURIER = 'cashless'
    ONLINE = 'online'

    PAYMENT_CHOICES = [
        (CASHTOCOURIER, "Оплата готівкова кур'єру"),
        (CASHLESSTOCOURIER, "Оплата безготівкова кур'єру"),
        (ONLINE, 'Оплата онлайн'),
    ]

    name = models.CharField(max_length=30, verbose_name="Ім'я", blank=True, null=True)
    surname = models.CharField(max_length=50, verbose_name='Прізвище', blank=True, null=True)
    customerPhone = models.CharField(max_length=12, blank=True, default='', verbose_name='Номер телефону')
    paymentMethod = models.CharField(max_length=50, choices=PAYMENT_CHOICES, default=ONLINE, verbose_name='Спосіб оплати', blank=True)
    orderList = models.ManyToManyField(Dish, verbose_name='Зміст замовлення', blank=True)
    orderTime = models.DateTimeField(auto_now_add=True, blank=True, null=True, verbose_name='Дата замовлення')
    
    def order_list(self):
        dishesList = []
        selfDishes= self.orderList.all()
        for dish in selfDishes:
            dishesList.append(dish)

        return dishesList
    order_list.short_description = 'Список страв' 

    def get_cost(self):
        cost = self.orderList.all()
        totalCost = 0
        for i in cost:
            totalCost += i.price

        return totalCost 
    get_cost.short_description = 'Сума'    
    
    paid = models.BooleanField(default=False, verbose_name='Оплата')

    def __str__(self):
        return '{0} {1}'.format(self.name, self.surname)
    



