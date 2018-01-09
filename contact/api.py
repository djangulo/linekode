from django.utils.translation import gettext_lazy as _
from rest_framework import parsers, renderers, status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from contact.models import Contact, ContactMessage
from contact.serializers import FullMessageSerializer

FIRST_MESSAGE_RESPONSE = "Your message was sent succesfully!"
RETURNING_MESSAGE_RESPONSE = "Thank you for coming back! Your message was sent succesfully!"

class PostContactMessageAPIView(APIView):
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = 'contact_form'
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = FullMessageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_email = serializer.validated_data['email']
        contact, created = Contact.objects.get_or_create(email=contact_email)
        if created:
            contact.first_name = serializer.validated_data['first_name']
            contact.last_name = serializer.validated_data['last_name']
            contact.phone = serializer.validated_data['phone']
            contact.save()
            msg = ContactMessage.objects.create(
                contact=contact,
                message=serializer.validated_data['message']
            )
            return Response({
                'success': True,
                'response': _(FIRST_MESSAGE_RESPONSE)
            }, status=status.HTTP_200_OK)
        else:
            msg = ContactMessage.objects.create(
                contact=contact,
                message=serializer.validated_data['message']
            )
            return Response({
                'success': True,
                'response': _(RETURNING_MESSAGE_RESPONSE)
            }, status=status.HTTP_200_OK)
        return Response({'success': False},
                    status=status.HTTP_400_BAD_REQUEST)
