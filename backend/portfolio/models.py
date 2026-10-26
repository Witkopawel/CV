from django.db import models

class Project(models.Model):
    CATEGORY = {
        "None" : "None",
        "Games": "Games",
        "Web": "Website",
        "VR": "VR",
    }
    category = models.CharField(max_length=10, choices=CATEGORY, default="None")
    technology_stack = models.CharField(max_length=200, verbose_name="Technologie")
    github_url = models.URLField(blank=True, null=True, verbose_name="Link do GitHuba")
    image = models.ImageField(upload_to='projects/', blank=True, null=True, verbose_name="Zdjęcie")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        first_translation = self.translations.first()
        return first_translation.title if first_translation else f"Projekt #{self.id}"
    
    class Meta:
        verbose_name = "Projekt"
        verbose_name_plural = "Projekty"

class ProjectTranslation(models.Model):
    # W Django słownik choices to: "wartość_w_bazie": "Wyświetlana Nazwa"
    LANGUAGE = {
        "pl": "Polski",
        "en": "English",
        "es": "Español",
        "ru": "Русский",
    }
    
    project = models.ForeignKey(Project, related_name='translations', on_delete=models.CASCADE)
    language = models.CharField(max_length=10, choices=LANGUAGE, default="en", verbose_name="Język")
    title = models.CharField(max_length=200, verbose_name="Tytuł")
    description = models.TextField(verbose_name="Opis")

    class Meta:
        unique_together = ('project', 'language')
        verbose_name = "Tłumaczenie projektu"
        verbose_name_plural = "Tłumaczenia"