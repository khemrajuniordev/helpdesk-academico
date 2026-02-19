from rest_framework.viewsets import ModelViewSet
from .models import Chamado
from .serializers import ChamadoSerializer, HistoricoStatusSerializer, StatusSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status as http_status
from .models import Status, HistoricoStatus
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class ChamadoViewSet(ModelViewSet):
    serializer_class = ChamadoSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Chamado.objects.all()
        
        return Chamado.objects.filter(usuario=user)


    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


    def get_permissions(self):
        if self.action in ['atualizar_status']:
            return [IsAdminUser()]
        
        if self.request.method == 'DELETE':
            return [IsAdminUser()]
        
        return [IsAuthenticated()]


    @action(detail=True, methods=['patch'])
    def atualizar_status(self, request, pk=None):
        chamado = self.get_object()

        status_id = request.data.get('status')

        if not status_id:
            return Response({'error': 'O campo "status" é obrigatório.'}, status=http_status.HTTP_400_BAD_REQUEST)
        
        try:
            status_novo = Status.objects.get(id=status_id)

        except Status.DoesNotExist:
            return Response({'error': 'Status não encontrado.'}, status=http_status.HTTP_404_NOT_FOUND)
        

        if chamado.status.nome != "ATIVO":
            return Response({'error': 'Somente chamados com status "ATIVO" podem ser atualizados.'}, status=http_status.HTTP_400_BAD_REQUEST)
            print("ta passando")
        
        chamado.status = status_novo
        chamado.save()

        HistoricoStatus.objects.create(chamado=chamado, status=status_novo)

        return Response({'message': 'Status atualizado com sucesso.'}, status=http_status.HTTP_200_OK)  
    

    @action(detail=True, methods=['get'])
    def historico(self, request, pk=None):
        chamado = self.get_object()
        historicos = HistoricoStatus.objects.filter(chamado=chamado).order_by('-data_alteracao')

        serializer = HistoricoStatusSerializer(historicos, many=True)
        return Response(serializer.data, status=http_status.HTTP_200_OK)
    

    
    
    



       

