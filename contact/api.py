import json
import urllib

from django.conf import settings
from django.utils.translation import gettext_lazy as _

from rest_framework import parsers, renderers, status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from contact.models import Contact, ContactMessage
from contact.serializers import FullMessageSerializer

FIRST_MESSAGE_RESPONSE = _("Your message was sent succesfully!")
RETURNING_MESSAGE_RESPONSE = _("Thank you for coming back! Your message was sent succesfully!")
FAILED_CAPTCHA_RESPONSE = _("Invalid reCAPTCHA. Please try again.")


def validate_captcha_response(response):
    url = 'https://www.google.com/recaptcha/api/siteverify'
    values = {
        'secret': settings.GOOGLE_RECAPTCHA_PRIVATE_KEY,
        'response': response
    }
    data = urllib.parse.urlencode(values).encode()
    req = urllib.request.Request(url, data=data)
    res = urllib.request.urlopen(req)
    result = json.loads(res.read().decode())

    if result['success']:
        return True
    return None

class PostContactMessageAPIView(APIView):
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = 'contact_form'
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = FullMessageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        ##### THIS IS HACKY, FIXX THIS ASAP
        request.data['g_recaptcha_response'] = request.data.pop('g-recaptcha-response')
        ### END OF HACKYNESS
        serializer.is_valid(raise_exception=True)
        contact_email = serializer.validated_data['email']
        captcha = validate_captcha_response(
            serializer.validated_data['g_recaptcha_response'])
        contact, created = Contact.objects.get_or_create(email=contact_email)
        if captcha is None:
            return Response({
                'success': False,
                'response': FAILED_CAPTCHA_RESPONSE
            }, status=status.HTTP_428_PRECONDITION_REQUIRED)
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
                'response': FIRST_MESSAGE_RESPONSE
            }, status=status.HTTP_200_OK)
        else:
            msg = ContactMessage.objects.create(
                contact=contact,
                message=serializer.validated_data['message']
            )
            return Response({
                'success': True,
                'response': RETURNING_MESSAGE_RESPONSE
            }, status=status.HTTP_200_OK)
        return Response({'success': False},
                    status=status.HTTP_400_BAD_REQUEST)
