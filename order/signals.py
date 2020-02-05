from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Order
from account.models import FastCostumer


@receiver(post_save, sender=Order)
def create_fast_customer(sender, instance, created, **kwargs):
    if created:
        FastCostumer.objects.create(name=instance.name, surname=instance.surname, customerPhone=instance.customerPhone)