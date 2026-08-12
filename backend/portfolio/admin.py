from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'technology_stack', 'created_at')
    search_fields = ('title', 'technology_stack')
    list_filter = ('created_at',)