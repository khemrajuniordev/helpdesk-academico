from django.contrib import admin
from .models import Status, Chamado, HistoricoStatus


admin.site.register(Status)
admin.site.register(Chamado)
admin.site.register(HistoricoStatus)