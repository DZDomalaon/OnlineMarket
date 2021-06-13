
from datetime import timedelta
from rest_framework import status, viewsets, permissions
from rest_framework import response
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import *
from .serializers import *
from .permissions import *


class ProductViewSet(viewsets.ViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)    

    def get_product(self, request):
        
        # import pdb; pdb.set_trace()
        get_id = request.GET.get('product', '')        
        product = Product.objects.get(pk=int(get_id))
        serializer = ProductSerializer(product)
        return Response(serializer.data, status.HTTP_200_OK) 

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

    def search(self, request):
        
        product = request.POST.get("product", "")
        category = request.POST.get("category", "")
        subcategory = request.POST.get("subcategory", "")

        get_products = Product.objects.filter(product_name__icontains=product, product_category__name__icontains=category, product_subcategory__name__icontains=subcategory)
        if get_products:
            serializer = ProductsSerializer(get_products, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "No items found"}, status.HTTP_404_NOT_FOUND)


class ProductForAuthUserViewSet(viewsets.ViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)    
    parser_classes = (MultiPartParser,)
    
    def post(self, request):
           
        serializer = AddProductSerializer(data=request.data)        
        if serializer.is_valid():        
            serializer.save(seller=request.user)
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
                
        get_id = request.POST.get('product', '')
        product = Product.objects.get(pk=int(get_id))

        serializer = UpdateProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        
        get_id = request.GET.get('product', '')        
        product = Product.objects.get(pk=int(get_id))
        if request.user == product.seller:
            product.delete()
            return Response(status.HTTP_202_ACCEPTED)
        return Response(status.HTTP_400_BAD_REQUEST)           


class AuthSellerViewSet(viewsets.ViewSet):
    
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)        

    def get_owned_products(self, request):
     
        products = Product.objects.filter(seller=request.user)
        serializer = self.serializer_class(products, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def product_status(self, request):
                
        get_product = request.GET.get('product', '')
        product = Product.objects.get(pk=get_product)        
        product_serializer = self.serializer_class(product)
        get_item = OrderItem.objects.filter(product=product)        
        item = OrderStatusSerializer(get_item, many=True)    
        data = {
            "item": item.data,
            "product": product_serializer.data
        }    
        return Response(data, status.HTTP_200_OK)
       
    def add_stock(self, request):
                
        get_product = request.POST.get('product', '')
        product = Product.objects.get(pk=get_product)
        product.quantity = product.quantity + int(request.data['quantity'])
        product.save()
        # get_item = OrderItem.objects.get(product=product)     
        # item = OrderItemCartSerializer(get_item)        
        return Response(status.HTTP_200_OK) 

    def ship_item(self, request):
        
        get_product = request.GET.get("product", "")
        quantity = request.GET.get("quantity", "")
        product = Product.objects.get(pk=int(get_product))
        product.quantity = product.quantity - int(quantity)
        product.save()
        get_item = request.GET.get("item", "")
        order_item = OrderItem.objects.get(pk=int(get_item))
        order_item.is_shipping=True
        order_item.shipping_duration=timedelta(minutes=1)
        order_item.save()
        return Response(status.HTTP_200_OK)  

    def create_order(self, request):
        
        get_items = request.POST.getlist("item[]", "")
        get_quantity = request.POST.getlist("quantity[]", "")
        
        for item in get_items:
            product = Product.objects.get(pk=item)
            if product.is_available == False:
                return Response(status.HTTP_400_BAD_REQUEST)

        get_cart = request.POST.get("cart", "")
        cart = Cart.objects.get(id=int(get_cart))
        cart.cart_item.clear()
        # order = Order(buyer=request.user, ) 
        order_serializer = AddOrderSerializer(data=request.data)
        if order_serializer.is_valid():
            order_serializer.save(buyer=request.user, is_completed=False)
            order = Order.objects.get(pk=order_serializer.data['id'])
            counter = 0
            for item in get_items:
                product = Product.objects.get(pk=item)
                product.quantity = product.quantity - int(get_quantity[counter])
                product.save()
                order_item = OrderItem(product=product, quantity=int(get_quantity[counter]))
                order_item.save()
                order.order_item.add(order_item)
                counter += 1
            return Response(status.HTTP_201_CREATED)
        return Response(status.HTTP_400_BAD_REQUEST)
    

class CartViewSet(viewsets.ViewSet):
    
    serializer_class = OrderAddSerializer
    permission_classes = (permissions.AllowAny,)
    
    def add_to_cart(self, request):
                                    
        # import pdb; pdb.set_trace()                                    
        existing_cart = Cart.objects.filter(buyer=request.user, is_checkedout=False).first()
        if existing_cart:
            product_id = request.POST.get('product', '')
            product = Product.objects.get(id=int(product_id))

            try:
                existing_item = CartItem.objects.get(product=product, cart=existing_cart)
            except CartItem.DoesNotExist:
                existing_item = None

            if existing_item:
                if product.quantity > existing_item.quantity + int(request.POST.get('quantity')):
                    item = UpdateCartItemSerializer(existing_item, data=request.data)
                    if item.is_valid():                    
                        quantity = item.validated_data.get('quantity') + existing_item.quantity
                        item.save(quantity=quantity)
                        return Response(status.HTTP_200_OK)
                    return Response(status.HTTP_400_BAD_REQUEST)
                return Response({"error":"You have "+str(existing_item.quantity)+" "+product.product_name+" in your cart"},status.HTTP_400_BAD_REQUEST)
            else:
                cart_item = CartItemAddSerializer(data=request.data)
                if cart_item.is_valid():                
                    cart_item.save(product=product)
                    existing_cart.cart_item.add(cart_item.data['id'])
                    return Response(cart_item.data, status.HTTP_200_OK)
                return Response(status.HTTP_400_BAD_REQUEST)
        else:
            cart_item = CartItemAddSerializer(data=request.data)
            if cart_item.is_valid():                  
                product_id = request.POST.get('product', '')
                product = Product.objects.get(id=int(product_id))
                cart_item.save(product=product)
                cart_serializer = CartAddSerializer(data=request.data)
                if cart_serializer.is_valid(): 
                    cart_item = CartItem.objects.filter(pk=cart_item.data['id'])
                    cart_serializer.save(buyer=request.user, cart_item=cart_item)                
                    return Response(status.HTTP_201_CREATED)
                return Response(status.HTTP_400_BAD_REQUEST)
            return Response(status.HTTP_400_BAD_REQUEST)

    def remove_item(self, request):
        
        get_item = request.data['cart_item']        
        CartItem.objects.get(id=get_item).delete()
        return Response(status.HTTP_202_ACCEPTED)                         

    def update_item(self, request):
                                 
        get_item = request.POST.get('cart_item', '')
        item = CartItem.objects.get(pk=get_item)        
        product = Product.objects.get(pk=item.product.pk)        
        get_quantity = request.POST.get('quantity', '')
        if int(get_quantity) <= product.quantity:
            serializer = UpdateCartItemSerializer(item, data=request.data)
            if serializer.is_valid():
                serializer.save(quantity=get_quantity)
                return Response(serializer.data, status.HTTP_200_OK)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response({"error":"Quantity must be less than or equal to available item"},status.HTTP_400_BAD_REQUEST)

    def item_count(self, request):
        
        count = CartItem.objects.filter(cart__buyer=request.user, cart__is_checkedout=False).count()
        return Response({"count":count}, status.HTTP_200_OK)


class AdminUserViewSet(viewsets.ViewSet):

    queryset = Order.objects.all()
    serializer_class = OrderAddSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def admin_get_ordered_products(self, request):
                
        user = request.GET.get('user', '')
        get_cart = Cart.objects.get(buyer=int(user))
        cart = CartSerializer(get_cart)
        # get_item = CartItem.objects.filter(cart=cart.data['id'])
        # item = OrderItemCartSerializer(get_item, many=True)
        return Response(cart.data, status.HTTP_200_OK)
               
    def admin_get_owned_products(self, request, *args, **kwargs):
        
        user = request.GET.get('user', '')
        products = Product.objects.filter(seller_id=int(user))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def admin_get_user_orders(self, request):

        user = request.GET.get('user', '')
        orders = Order.objects.filter(buyer=int(user), is_completed=True)
        serializer = OrderSerializer(orders, many=True)
        return Response({"order":serializer.data}, status.HTTP_200_OK)


class PaymentViewSet(viewsets.ViewSet):

    serializer_class = OrderPaymentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def add_payment(self, request):
                
        # import pdb; pdb.set_trace()
        # get_order = request.POST.get('order', '')
        # items = request.POST.getlist('item[]')
        # quantity = request.POST.getlist('quantity[]')
        order = Order.objects.filter(buyer=request.user, is_completed=False).last()
        order_serializer = self.serializer_class(order, data=request.data)
        if order_serializer.is_valid():
            order_serializer.save(is_completed = True)
            payment = PaymentSerializer(data=request.data)
            if payment.is_valid():
                payment.save(order=order)
                order_payment = OrderPayment.objects.get(pk=payment.data['id'])     
                if request.data['payment_method'] == "COD":
                    p_method = CODPaymentSerializer(data=request.data)
                    if p_method.is_valid():
                        p_method.save(order_payment=order_payment)
                        return Response(payment.data, status.HTTP_200_OK)
                    return Response(status.HTTP_400_BAD_REQUEST)
                else:
                    p_method = CardPaymentSerializer(data=request.data)
                    if p_method.is_valid():
                        p_method.save(order_payment=order_payment)
                        return Response(payment.data, status.HTTP_200_OK)
                    return Response(status.HTTP_400_BAD_REQUEST)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_400_BAD_REQUEST)


class AuthBuyerViewSet(viewsets.ViewSet):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_ordered_products(self, request):
                
        get_cart = Cart.objects.get(buyer=request.user, is_checkedout=False)
        cart = CartSerializer(get_cart)
        get_item = CartItem.objects.filter(cart=cart.data['id'])
        if get_item:
            item = ItemCartSerializer(get_item, many=True)
            data = {
                'cart': cart.data,
                'item': item.data,
            }
            return Response(data, status.HTTP_200_OK)        
        return Response(status.HTTP_404_NOT_FOUND)

    def order_status(self, request):
        
        get_order = Order.objects.filter(buyer=request.user, is_completed=True)
        order = OrderSerializer(get_order, many=True)
        return Response({"order":order.data}, status.HTTP_200_OK)