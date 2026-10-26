from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields = '__all__'
    def get_title(self, obj):
        return {t.language: t.title for t in obj.translations.all()}
    def _get_localized_field(self, obj, field_name):
        request = self.context.get('request')
        lang = request.query_params.get('lang', 'en') if request else 'en'
        
        translations = list(obj.translations.all())
        if not translations:
            return ""
        for t in translations:
            if t.language == lang:
                return getattr(t, field_name)
        for t in translations:
            if t.language == 'en':
                return getattr(t, field_name)
        return getattr(translations[0], field_name)
    def get_description(self, obj):
        return {t.language: t.description for t in obj.translations.all()}