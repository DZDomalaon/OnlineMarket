
from datetime import timedelta
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .models import *
from .serializers import *


class ProductViewSet(viewsets.ViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)    
    parser_classes = (MultiPartParser, FormParser, JSONParser,)

    def get(self, request, *args, **kwargs):
        
        products = Product.objects.all()
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)
    
    def get_on_sale(self, request):
                
        products = Product.objects.filter(is_discounted=True)
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)

    def get_categories(self,request):

        category = SubCategory.objects.all()
        serializer = SubCategorySerializer(category,many=True)
        return Response(serializer.data)

    def under_category(self, request):
        
        subcategory = request.GET.get("category", "")
        products = Product.objects.filter(product_subcategory_id=subcategory)
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):

        # import pdb; pdb.set_trace()
        serializer = AddProductSerializer(data=request.data)
        
        if serializer.is_valid():        
            serializer.save(seller=request.user)
            return Response(serializer.data, status=200)
        else:
            return Response(status=400)

    def put(self, request, *args, **kwargs):
        
        get_id = request.POST.get('product', '')
        product = get_object_or_404(Product, pk=int(get_id))
        serializer = UpdateProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(status.HTTP_400_BAD_REQUEST)

    def get_owned_products(self, request, *args, **kwargs):

        products = Product.objects.filter(seller=request.user)
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def admin_get_owned_products(self, request, *args, **kwargs):
        
        user = request.GET.get('user', '')
        products = Product.objects.filter(seller_id=int(user)).values()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def get_product(self, request):
                
        # import pdb; pdb.set_trace()
        get_id = request.GET.get('product', '')        
        product = get_object_or_404(Product, pk=int(get_id))
        serializer = ProductSerializer(product)

        return Response(serializer.data, status=200) 

    def delete(self, request):
        
        get_id = request.GET.get('product', '')        
        product = get_object_or_404(Product, pk=int(get_id))
        if request.user.is_authenticated:
            if request.user == product.seller:
                product.delete()
                return Response(status.HTTP_200_OK)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_401_UNAUTHORIZED)        
        
    def add_to_cart(self, request):
            
        existing_order = Order.objects.filter(buyer=request.user, is_completed=False).first()
        if existing_order:                        
            order_item = OrderItemAddSerializer(data=request.data)
            if order_item.is_valid():
                product_id = request.POST.get('product', '')
                product = Product.objects.get(id=int(product_id))
                order_item.save(product=product)
                existing_order.order_item.add(order_item.data['id'])
                return Response(order_item.data, status.HTTP_200_OK)
            else:
                return Response(status.HTTP_400_BAD_REQUEST)
        else:
            item_serializer = OrderItemAddSerializer(data=request.data)
            if item_serializer.is_valid():                  
                product_id = request.POST.get('product', '')
                product = Product.objects.get(id=int(product_id))
                item_serializer.save(product=product)
                order_serializer = OrderAddSerializer(data=request.data)
                if order_serializer.is_valid(): 
                    order_item = OrderItem.objects.filter(pk=item_serializer.data['id'])       
                    order_serializer.save(buyer=request.user, order_item=order_item)                                                        

                    data = {
                        'order': order_serializer.data,
                        'item': item_serializer.data,
                    }

                    return Response(data, status.HTTP_201_CREATED)
                else:
                    return Response(status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status.HTTP_400_BAD_REQUEST)        

    def get_ordered_products(self, request):
                
        get_order = get_object_or_404(Order, buyer=request.user, is_completed=False)
        order = OrderSerializer(get_order)
        get_item = OrderItem.objects.filter(order=order.data['id'])
        if get_item:
            item = OrderItemCartSerializer(get_item, many=True)

            data = {
                'order': order.data,
                'item': item.data,
            }
            return Response(data, status.HTTP_200_OK)
        else:
            return Response(status.HTTP_404_NOT_FOUND)

    def remove_item(self, request):
        
        get_item = request.data['order_item']
        if request.user.is_authenticated:           
            OrderItem.objects.get(id=get_item).delete()
            return Response(status.HTTP_202_ACCEPTED)                 
        return Response(status.HTTP_401_UNAUTHORIZED)

    def update_item(self, request):
                
        get_item = request.POST.get('order_item', '')
        item = get_object_or_404(OrderItem, pk=get_item)        
        get_quantity = request.POST.get('quantity', '')
        serializer = UpdateOrderItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save(quantity=get_quantity)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)

    def admin_get_ordered_products(self, request):
                
        user = request.GET.get('user', '')
        get_order = get_object_or_404(Order, buyer=int(user))
        order = OrderSerializer(get_order)
        get_item = OrderItem.objects.filter(order=order.data['id'])
        item = OrderItemCartSerializer(get_item, many=True)
    
        return Response(item.data, status.HTTP_200_OK)

    def product_status(self, request):
        
        get_product = request.GET.get('product', '')
        product = get_object_or_404(Product, pk=get_product)
        product_serializer = ProductSerializer(product)
        get_item = OrderItem.objects.filter(product=product)        
        item = OrderItemCartSerializer(get_item, many=True)    

        data = {
            "item": item.data,
            "product": product_serializer.data
        }    
        return Response(data, status.HTTP_200_OK)

    def add_stock(self, request):
        
        get_product = request.POST.get('product', '')
        product = get_object_or_404(Product, pk=get_product)
        product.quantity = product.quantity + int(request.data['quantity'])
        product.save()
        get_item = OrderItem.objects.filter(product=product)        
        item = OrderItemCartSerializer(get_item, many=True)        
        return Response(item.data, status.HTTP_200_OK)         

    def add_payment(self, request):
                
        get_order = request.POST.get('order', '')
        items = request.POST.getlist('item[]')
        quantity = request.POST.getlist('quantity[]')
        order = Order.objects.get(pk=get_order) 
        order_serializer = OrderPaymentSerializer(order, data=request.data)
        if order_serializer.is_valid():
            order_serializer.save(is_completed = True)
            payment = PaymentSerializer(data=request.data)
            if payment.is_valid():
                payment.save(order=order)
                order_payment = get_object_or_404(OrderPayment,pk=payment.data['id'])                
                if request.data['payment_method'] == "COD":
                    p_method = CODPaymentSerializer(data=request.data)
                    if p_method.is_valid():
                        p_method.save(order_payment=order_payment)   
                else:
                    p_method = CardPaymentSerializer(data=request.data)
                    if p_method.is_valid():
                        p_method.save(order_payment=order_payment)
                        return Response(payment.data, status.HTTP_200_OK)        
                    return Response(status.HTTP_400_BAD_REQUEST)                                
                return Response(payment.data, status.HTTP_200_OK)        
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_400_BAD_REQUEST)

    def order_status(self, request):
        
        get_order = Order.objects.filter(buyer=request.user, is_completed=True)
        order = OrderSerializer(get_order, many=True)        
        return Response({"order":order.data}, status.HTTP_200_OK)     

    def ship_item(self, request):
        
        get_product = request.GET.get("product", "")
        quantity = request.GET.get("quantity", "")
        product = get_object_or_404(Product, pk=int(get_product))
        product.quantity = product.quantity - int(quantity)
        product.save()
        get_item = request.GET.get("item", "")
        order_item = get_object_or_404(OrderItem, pk=int(get_item))
        order_item.is_shipping=True
        order_item.shipping_duration=timedelta(minutes=1)
        order_item.save()
        return Response(status.HTTP_200_OK)    

    def search(self, request):
        
        product = request.POST.get("product", "")
        category = request.POST.get("category", "")
        subcategory = request.POST.get("subcategory", "")

        get_products = Product.objects.filter(product_name__icontains=product, product_category__category__icontains=category, product_subcategory__subcategory__icontains=subcategory)
        if get_products:
            serializer = ProductsSerializer(get_products, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "No items found"}, status.HTTP_404_NOT_FOUND)


            

        