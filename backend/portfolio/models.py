from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tytuł projektu")
    CATEGORY = {
        "None" : "None",
        "Games": "Games",
        "Web": "Website",
        "VR": "VR",
    }
    category = models.CharField(max_length=10, choices=CATEGORY, default = "None")
    description = models.TextField(verbose_name="Opis")
    technology_stack = models.CharField(max_length=200, verbose_name="Technologie")
    github_url = models.URLField(blank=True, null=True, verbose_name="Link do GitHuba")
    image = models.ImageField(upload_to='projects/', blank=True, null=True, verbose_name="Zdjęcie")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Projekt"
        verbose_name_plural = "Projekty"