from rest_framework.viewsets import ModelViewSet
from .models import Chamado
from .serializers import ChamadoSerializer


class ChamadoViewSet(ModelViewSet):
    queryset = Chamado.objects.all()
    serializer_class = ChamadoSerializer


    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user)

