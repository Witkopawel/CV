from django.contrib import admin
from .models import Project, ProjectTranslation

class ProjectTranslationInline(admin.StackedInline):
    model = ProjectTranslation
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectTranslationInline]
    list_display = ('id', 'category', 'technology_stack')