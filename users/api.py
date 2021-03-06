from django.shortcuts import get_object_or_404
from .models import CustomUser
from django.contrib.auth import login, logout, authenticate 
from rest_framework import serializers, status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from .serializers import RegistrationSerializer, UserSerializer, UsersSerializer

class UserViewSet(viewsets.ViewSet):
        
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    
    # authentication_classes = [authentication.TokenAuthentication]
    # authentication_classes = [SessionAuthentication, BasicAuthentication]

    # @api_view(('GET',))
    def get(self, request):
        
        # import pdb; pdb.set_trace()
        get_user = request.GET.get('user', '')
        user = get_object_or_404(CustomUser, pk=int(get_user))        
        serializer = UserSerializer(user)        
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
                
        serializer = RegistrationSerializer(data=request.data)                
        if serializer.is_valid():
            serializer.save()        
            return Response({'serializer': serializer.data})
        return Response({'errors': serializer.errors})

    def update_user(self, request):
        
        get_user = request.POST.get('user', '')
        user = get_object_or_404(CustomUser, pk=int(get_user)) 
        serializer = UserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)

    def userlogin(self, request, format=None):

        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)
                        
        if user is not None:
            token = user.auth_token.key
            login(request, user)                

            return Response(status.HTTP_200_OK)
        else:
            return Response({'error': "Incorrect email or password."})

    def userlogout(self, request):
        logout(request)
        return Response(status=200)


    def userlist(self, request):
        
        list = CustomUser.objects.all()
        serializer = UsersSerializer(list, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
