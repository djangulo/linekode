from django.views.generic import FormView


class HomeView(TemplateView):
    template_name = 'home.html'
