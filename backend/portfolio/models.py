from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tytuł projektu")
    description = models.TextField(verbose_name="Opis")
    technology_stack = models.CharField(max_length=200, verbose_name="Technologie")
    github_url = models.URLField(blank=True, null=True, verbose_name="Link do GitHuba")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Projekt"
        verbose_name_plural = "Projekty"