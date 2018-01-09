from rest_framework import serializers

from contact.models import Contact, ContactMessage





class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'contact',
            'message',
            'sent_at',
        )


class ContactSerializer(serializers.ModelSerializer):
    messages = ContactMessageSerializer(
        source='get_message',
        many=True,
        read_only=True
    )
    class Meta:
        model = Contact
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone',
            'messages',
        )


class FullMessageSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=50)
    message = serializers.CharField(max_length=500)

