from django.shortcuts import render
from products.models import Category, Product, SubCategory
from django.views.generic.base import TemplateView


class RegisterView(TemplateView):    
    template_name = 'users/registration.html'


class LoginView(TemplateView):
    template_name = 'users/login.html'


class UpdateUserView(TemplateView):
    template_name ="users/update_user.html"


class DashboardView(TemplateView):
    
    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        sub_categories = SubCategory.objects.all()
        categories = Category.objects.all()
        return render(request, "dashboard.html", {'products': products, 'categories': categories, 'sub_categories': sub_categories})


class UserListView(TemplateView):
    template_name = "users/user_list.html"


class UserCartView(TemplateView):
    template_name = "users/user_cart.html"

class UserPageView(TemplateView):
    template_name = "users/user_page.html"

class UserPayment(TemplateView):
    template_name = "users/user_payment.html"

class OrderStatus(TemplateView):
    template_name = "users/order_status.html"
    