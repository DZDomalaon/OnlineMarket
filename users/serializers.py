from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name',)

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','first_name', 'last_name','is_seller', 'email')

class RegistrationSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)    
    is_seller = serializers.BooleanField(default=False)
        
    class Meta:
        model = CustomUser

        fields = ('first_name','last_name', 'email', 'password', 'password2', 'is_seller')
        extra_kwargs = {
            'password': {'write_only': True},
        }     

    def validate_email(self, email):
        existing = CustomUser.objects.filter(email=email)
        if existing:
            raise serializers.ValidationError("Email is already taken.")
        return email

    def create(self, validated_data):
        user = CustomUser.objects.create(            
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_seller=validated_data['is_seller'],
            password2 = validated_data['password2'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    