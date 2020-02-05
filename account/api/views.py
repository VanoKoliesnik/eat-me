from account.models import Account, FastCostumer
from rest_framework import viewsets
from .serializers import AccountSerializer, FastCostumerSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class FastCostumerViewSet(viewsets.ModelViewSet):
    queryset = FastCostumer.objects.all()
    serializer_class = FastCostumerSerializer