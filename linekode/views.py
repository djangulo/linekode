from django.views.generic import TemplateView
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


# class HomeView(TemplateView):
#     template_name = 'home.html'


@ensure_csrf_cookie
def home(request):
    return render(request, 'home.html')
