from django.apps import AppConfig


class OrderConfig(AppConfig):
    name = 'order'
    verbose_name = 'Замовлення'

    def ready(self):
        import order.signals