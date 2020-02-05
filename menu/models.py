from django.db import models

class Cuisine(models.Model):
    name = models.CharField(max_length=30, blank=True, null='True', verbose_name='Назва')

    class Meta:
        verbose_name = 'Кухня'
        verbose_name_plural='Кухні'

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=30, blank=True, null=True, verbose_name='Назва')

    class Meta:
        verbose_name = 'Категорія'
        verbose_name_plural='Категорії'

    def __str__(self):
        return self.name


class Dish(models.Model):
    AVAILABLE = 'available'
    ENDS = 'ends'
    ABSENT = 'absent'

    STATE_CHOICES = [
        (AVAILABLE, 'В наявності'),
        (ENDS, 'Закінчується'),
        (ABSENT, 'Відсутня'),
    ]

    name = models.CharField(max_length=150, blank=True, null=True, verbose_name='Назва')
    cuisine = models.ForeignKey(Cuisine, on_delete=models.PROTECT, verbose_name='Кухня' , blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='Категорія', blank=True, null=True)
    image = models.ImageField(upload_to='foodImages', verbose_name='Зображення', null=True, blank=True)
    price = models.FloatField(default=0, verbose_name='Ціна', null=True, blank=True)
    weight = models.FloatField(default=0, verbose_name='Вага', null=True, blank=True)
    composition = models.TextField(verbose_name='Склад', blank=True, null=True)
    calorie = models.FloatField(default=0, verbose_name='Калорії', null=True, blank=True)
    state = models.CharField(max_length=302, choices=STATE_CHOICES, default=AVAILABLE, verbose_name='Стан', null=True, blank=True)

    class Meta:
        verbose_name = 'Страв'
        verbose_name_plural = 'Страви'

    def __str__(self):
        return self.name

class Institution(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True, verbose_name='Назва')
    phone = models.CharField(max_length=12, blank=True, verbose_name='Мобільний телефон', unique=True)
    image = models.ImageField(upload_to='institutionImages', verbose_name='Зображення', null=True, blank=True)
    cuisine = models.ManyToManyField(Cuisine, verbose_name='Кухня', blank=True)
    menu = models.ManyToManyField(Dish, verbose_name='Меню', blank=True)
    about = models.TextField(verbose_name='Про заклад', blank=True, null=True)
    timeFrom = models.TimeField(verbose_name='Від', blank=True, null=True)
    timeBefore = models.TimeField(verbose_name='До', blank=True, null=True)
    position = models.CharField(max_length=100, verbose_name='Адреса', blank=True, null=True)


    class Meta:
        verbose_name = 'Заклад'
        verbose_name_plural = 'Заклади'

    def __str__(self):
        return self.name