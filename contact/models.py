from django.db import models
from django.utils.translation import gettext_lazy as _


class Contact(models.Model):
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=100, blank=False, null=False, unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        verbose_name = _('contact')
        verbose_name_plural = _('contacts')

    def get_messages(self):
        return self.messages.all()

    def __str__(self):
        return f'{self.first_name} {self.last_name}: {self.email}'


class ContactMessage(models.Model):
    contact = models.ForeignKey(
        'contact.Contact',
        on_delete=models.CASCADE,
        blank=False,
        null=True,
        related_name='messages',
        verbose_name=_('messages'),
    )
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('contact message')
        verbose_name_plural = _('contact messages')
