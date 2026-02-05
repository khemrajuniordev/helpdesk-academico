from django.db import models
from django.contrib.auth.models import User 

class Status(models.Model):
    nome = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Status'
        verbose_name_plural = 'Status'

    def __str__(self):
        return self.nome
    
    
class Chamado(models.Model):    
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    status = models.ForeignKey(Status, on_delete=models.PROTECT, related_name='chamados')
    criado_por = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='chamados_criados', null=True, blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Chamado'
        verbose_name_plural = 'Chamados'
        ordering = ['-data_criacao']

    def __str__(self):
        return self.titulo
    

class HistoricoStatus(models.Model):
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE, related_name='historico')
    status = models.ForeignKey(Status, on_delete=models.PROTECT)
    data_alteracao = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Histórico de Status'
        verbose_name_plural = 'Históricos de Status'
        ordering = ['-data_alteracao']

    def __str__(self):
        return f'Chamado: {self.chamado.titulo} - Status: {self.status.nome}'