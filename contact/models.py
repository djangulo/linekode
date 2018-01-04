from django.db import models
from django.utils.translation import gettext_lazy as _


class Contact(models.Model):
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    email = models.CharField(max_length=100, blank=False)
    phone = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('contact')
        verbose_name_plural = _('contacts')


class ContactMessage(models.Model):
    contact = models.ForeignKey(
        'contact.Contact',
        on_delete=models.CASCADE,
        blank=False,
        null=True,
        related_name='messages',
        verbose_name=_('messages'),
    )
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('contact message')
        verbose_name_plural = _('contact messages')