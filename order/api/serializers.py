from order.models import Order
from menu.models import Dish
from rest_framework import serializers
from menu.api.serializers import DishListSerializer, DishNameListSerializer

class OrderSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'name', 'surname', 'customerPhone', 'paymentMethod', 'orderTime', 'orderListTextField', 'get_cost', 'orderDetail', 'totalQuantity', 'totalPrice']

