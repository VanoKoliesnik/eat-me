from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('menu.api.urls')),
    path('api/', include('order.api.urls')),
    path('api/', include('account.api.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
