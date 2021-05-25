
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework import serializers, status, viewsets, permissions
from rest_framework.response import Response
from products.models import Category, Order, OrderItem, Product, SubCategory
from .serializers import AddProductSerializer, CategorySerializer, OrderItemSerializer, OrderSerializer, ProductSerializer, UpdateProductSerializer



class ProductViewSet(viewsets.ViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)    
    

    def get(self, request, *args, **kwargs):

        # import pdb; pdb.set_trace()
        products = Product.objects.all().values()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = AddProductSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():        
            serializer.save(seller=request.user)
            return Response(serializer.data, status=200)
        else:
            return Response(status=400)

    def put(self, request, *args, **kwargs):

        # import pdb; pdb.set_trace()
        get_id = request.POST.get('product', '')
        product = get_object_or_404(Product, pk=int(get_id))

        serializer = UpdateProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(status.HTTP_400_BAD_REQUEST)

    def get_owned_products(self, request, *args, **kwargs):

        products = Product.objects.filter(seller=request.user).values()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def get_product(self, request):
        
        # import pdb; pdb.set_trace()
        get_id = request.GET.get('product', '')
        
        product = get_object_or_404(Product, pk=int(get_id))
        serializer = ProductSerializer(product)

        return Response(serializer.data, status=200) 

    def delete(self, request):

        import pdb; pdb.set_trace()
        get_id = request.GET.get('product', '')        
        product = get_object_or_404(Product, pk=int(get_id))
        if request.user.is_authenticated:
            if request.user == product.seller:
                product.delete()
                return Response(status.HTTP_200_OK)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_401_UNAUTHORIZED)        
        
    def add_to_cart(self, request):
        
        existing = Order.objects.filter(buyer=request.user).count()

        if existing != 0:
            existing_order = Order.objects.get(buyer=request.user)
            order_item = OrderItemSerializer(data=request.data)
            if order_item.is_valid():
                product_id = request.POST.get('product', '')
                product = Product.objects.get(id=int(product_id))
                order_item.save(product=product)
                existing_order.order_item.add(order_item.data['id'])
                return Response(order_item.data, status.HTTP_200_OK)
            else:
                return Response(status.HTTP_400_BAD_REQUEST)
        else:
            item_serializer = OrderItemSerializer(data=request.data)
            if item_serializer.is_valid():                  
                product_id = request.POST.get('product', '')
                product = Product.objects.get(id=int(product_id))
                item_serializer.save(product=product)
                order_serializer = OrderSerializer(data=request.data)
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
        return

    def get_ordered_products(self, request):

        import pdb; pdb.set_trace()
        get_order = get_object_or_404(Order, buyer=request.user)
        order = OrderSerializer(get_order)
        get_item = OrderItem.objects.filter(order=order.data['id'])
        item = OrderItemSerializer(get_item, many=True)

        data = {
            'order': order,
            'item': item,
        }
        return Response(data, status.HTTP_200_OK)
        
            

        