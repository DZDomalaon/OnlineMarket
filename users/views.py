from django.views.generic.base import TemplateView


class RegisterView(TemplateView):    
    template_name = 'users/registration.html'


class LoginView(TemplateView):
    template_name = 'users/login.html'


class DashboardView(TemplateView):
    template_name = "dashboard.html"