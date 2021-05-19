from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser
from django.contrib.auth import login, logout, authenticate 
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, renderer_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from .serializers import RegistrationSerializer, UserSerializer

class UserViewSet(viewsets.ViewSet):
        
    queryset = CustomUser.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = (permissions.AllowAny,)
    
    # authentication_classes = [authentication.TokenAuthentication]
    # authentication_classes = [SessionAuthentication, BasicAuthentication]

    # @api_view(('GET',))
    # def get(request, **kwargs):
        
    #     user = CustomUser.objects.get(pk=kwargs.get('pk'))
        
    #     serializer = RegistrationSerializer()

    #     context = {
    #         'user': str(request.user),            
    #         'auth': str(request.auth),    
    #         'serializer': serializer,
    #     }
    #     return Response(context)
    def post(self, request, *args, **kwargs):
        
        serializer = RegistrationSerializer(data=request.data)        
        
        # import pdb; pdb.set_trace()
        if serializer.is_valid():
            serializer.save()        
        return Response({'serializer': serializer.data})

    def userlogin(self, request, format=None):

        data = request.data

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)
        token = user.auth_token.key

        import pdb; pdb.set_trace()
        if user is not None:
            login(request, user)                

            return Response({'token': token}, status=200)
        else:
            return Response(status=404)