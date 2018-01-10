from django.views.generic import TemplateView
from django.shortcuts import render
from django.utils.translation import gettext_lazy as _
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def home(request):
    return render(request, 'home.html')
