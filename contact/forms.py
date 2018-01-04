from django import forms
from django.forms import inlineformset_factory
from django.utils.translation import gettext_lazy as _

from contact.models import Contact, ContactMessage


ContactFormSet = inlineformset_factory(Contact, ContactMessage,
    fields=(
        'first_name',
        'last_name',
        'email',
        'phone',
        'description'
    ),
    extra=1,
)


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone')
        labels = {
            'first_name': _('First name'),
            'last_name': _('Last name'),
            'email': 'Email',
            'phone': _('Phone'),
        }
        localized_fields = '__all__'
