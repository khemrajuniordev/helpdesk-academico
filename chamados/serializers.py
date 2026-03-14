from rest_framework import serializers
from .models import Chamado, Status, HistoricoStatus


class ChamadoSerializer(serializers.ModelSerializer):
    status_nome = serializers.CharField(source='status.nome', read_only=True)

    class Meta:
        model = Chamado
        fields = [
            'id',
            'titulo',
            'descricao',
            'status',
            'status_nome',
            'criado_por',
            'data_criacao',
            'data_atualizacao',
        ]


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = [
            'id',
            'nome',
        ]


class HistoricoStatusSerializer(serializers.ModelSerializer):
    status_nome = serializers.CharField(source='status.nome', read_only=True)

    class Meta:
        model = HistoricoStatus
        fields = [
            'id',
            'chamado',
            'status',
            'status_nome',
            'data_alteracao',
        ]
