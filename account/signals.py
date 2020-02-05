from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Account
import hashlib

@receiver(post_save, sender=Account)
def hash_password(sender, instance, created, **kwargs):
    if created:
        if len(instance.password) < 32:
            instance.password = hashlib.md5(instance.password.encode()).hexdigest()
            instance.save()