from order.models import Order
from rest_framework import serializers
from menu.api.serializers import DishListSerializer, DishNameListSerializer

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    orderList = DishListSerializer(many=True)
    order_list = DishNameListSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'name', 'surname', 'customerPhone', 'paymentMethod', 'orderTime', 'orderList', 'get_cost', 'order_list', 'orderDetail', 'totalQuantity', 'totalPrice']


