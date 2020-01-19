from django.db import models
from django.contrib.auth.models import User

class Account(User):
    phone = models.CharField(max_length=12, blank=True, verbose_name='Phone', unique=True)

    def full_name(self):
        return "{0} {1}".format(self.first_name, self.last_name)

    def __str__(self):
        return self.full_name()