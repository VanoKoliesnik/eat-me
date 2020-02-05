from account.models import Account, FastCostumer
from rest_framework import serializers


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'phone', 'username', 'email', 'password']


class FastCostumerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FastCostumer
        fields = ['name', 'surname', 'customerPhone']
