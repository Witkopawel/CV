from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail # <-- NOWY IMPORT
from django.conf import settings       # <-- NOWY IMPORT

from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

class ContactAPIView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        if not name or not email or not message:
            return Response(
                {"error": "Wszystkie pola są wymagane."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # --- NOWA LOGIKA WYSYŁANIA MAILA ---
        subject = f"PORTFOLIO: Nowa wiadomość od {name}"
        body = f"Od: {name} ({email})\n\nTreść wiadomości:\n{message}"
        subject = f"PORTFOLIO: Nowa wiadomość od {name}"
        body = f"Od: {name} ({email})\n\nTreść wiadomości:\n{message}"

        # DODAJ TĘ LINIJKĘ:
        print(f"TEST POCZTY: Próbuję wysłać na konto: '{settings.EMAIL_HOST_USER}'")
        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.EMAIL_HOST_USER, # Wysyłamy z naszego konta
                recipient_list=[settings.EMAIL_HOST_USER], # Odbieramy na nasze konto
                fail_silently=False,
            )
        except Exception as e:
            print(f"Błąd wysyłania maila: {e}")
            return Response(
                {"error": "Wystąpił błąd serwera pocztowego."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        # -----------------------------------

        return Response(
            {"message": "Wiadomość została pomyślnie wysłana!"}, 
            status=status.HTTP_200_OK
        )