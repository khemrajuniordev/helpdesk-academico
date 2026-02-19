from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ChamadoViewSet


router = DefaultRouter()
router.register(r'chamados', ChamadoViewSet, basename='chamado')

urlpatterns = [
    path('', include(router.urls)), 
]

