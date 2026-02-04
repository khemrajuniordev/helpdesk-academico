from django.db import models
from django.contrib.auth.models import User 

class Status(models.Model):
    nome = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Status'
        verbose_name_plural = 'Status'

    def __str__(self):
        return self.nome
    
    
class Chamado(models.Model):    
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    criado_por = models.ForeignKey(User, on_delete=models.CASCADE)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
    

class HistoricoStatus(models.Model):
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    data_alteracao = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Histórico de Status'
        verbose_name_plural = 'Históricos de Status'

    def __str__(self):
        return f'Chamado: {self.chamado.titulo} - Status: {self.status.nome}'