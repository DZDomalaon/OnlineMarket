
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.serializers import Serializer
from products.models import Category, Product, SubCategory
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from .serializers import AddProductSerializer, CategorySerializer, ProductSerializer, UpdateProductSerializer



class ProductViewSet(viewsets.ViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        products = Product.objects.all().values()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        serializer = AddProductSerializer(data=request.data, context={'request': request})

        # import pdb; pdb.set_trace()
        if serializer.is_valid():        
            serializer.save(seller=request.user)
            return Response(serializer.data, status=200)
        else:
            return Response(status=400)

    def put(self, request, *args, **kwargs):

        import pdb; pdb.set_trace()
        product = get_object_or_404(Product, pk=kwargs.get('pk'))

        serializer = UpdateProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response({'error': 'Cannot Update'},status=400)


    # def categories(self, request, *args, **kwargs):

    #     categories = Category.objects.all().values()
    #     sub_categories = SubCategory.objects.all().values()        

    #     return Response({'categories': categories,'sub_categories': sub_categories})
   
