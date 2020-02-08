from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order
from menu.models import Dish, Cuisine, Category
from .serializers import CuisineListSerializer, CategoryListSerializer, DishListSerializer

class CuisineList(APIView):

    def get(self, request, format=None):
        cuisines = Cuisine.objects.all()
        serializer = CuisineListSerializer(cuisines, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CuisineListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryList(APIView):

    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategoryListSerializer(categories, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CategoryListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DishList(APIView):

    def get(self, request, format=None):
        dishes = Dish.objects.all()
        serializer = DishListSerializer(dishes, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DishListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)