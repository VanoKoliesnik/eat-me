from django.db import models
from account.models import Account
from menu.models import Dish
from datetime import datetime

class Order(models.Model):
    CASHTOCOURIER = 'cash'
    CASHLESSTOCOURIER = 'cashless'
    ONLINE = 'online'

    PAYMENT_CHOICES = [
        (CASHTOCOURIER, "Оплата готівкова кур'єру"),
        (CASHLESSTOCOURIER, "Оплата безготівкова кур'єру"),
        (ONLINE, 'Оплата онлайн'),
    ]

    fullName = models.ForeignKey(Account, on_delete=models.PROTECT, verbose_name='Замовник')
    paymentMethod = models.CharField(max_length=50, choices=PAYMENT_CHOICES, default=ONLINE, verbose_name='Спосіб оплати')
    orderList = models.ManyToManyField(Dish, verbose_name='Зміст замовлення')
    orderTime = models.DateTimeField(auto_now_add=True, blank=True, null=True, verbose_name='Дата замовлення', editable=False)
    paid = models.BooleanField(default=False, verbose_name='Оплата')

    class Meta:
        verbose_name = 'Замовлення'
        verbose_name_plural = 'Замовлення'

    def __str__(self):
        return str(self.full_name)
