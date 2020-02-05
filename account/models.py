from django.db import models
from django.contrib.auth.models import User

class Account(User):
    phone = models.CharField(max_length=12, blank=True, verbose_name='Номер телефону', unique=True)

    def __str__(self):
        return self.first_name

class FastCostumer(models.Model):
    name = models.CharField(max_length=30, verbose_name="Ім'я", blank=True, null=True)
    surname = models.CharField(max_length=50, verbose_name='Прізвище', blank=True, null=True)
    customerPhone = models.CharField(max_length=12, blank=True, default='', verbose_name='Номер телефону')

    def __str__(self):
        return '{0} {1}'.format(self.name, self.surname)
    
    class Meta:
        verbose_name = 'Тимчасовий покупець'
        verbose_name_plural = 'Тимчасові покупці' 

