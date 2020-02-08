from rest_framework import serializers
from menu.models import Dish, Cuisine, Category

class CategoryListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['name',]

class CuisineListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['name',]

class DishListSerializer(serializers.HyperlinkedModelSerializer):
    cuisine = CuisineListSerializer()
    category = CategoryListSerializer()
    class Meta:
        model = Dish
        fields = ['id', 'name', 'cuisine', 'category', 'image', 'price', 'weight', 'composition', 'calorie', 'state']

class DishNameListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dish
        fields = ['name',]

