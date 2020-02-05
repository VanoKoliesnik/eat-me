from django.apps import AppConfig


class AccountConfig(AppConfig):
    name = 'account'
    verbose_name = "Аккаунти"

    def ready(self):
        import account.signals