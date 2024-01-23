from rest_framework import serializers
from user.models import CustomUserModel
from django.contrib.auth.hashers import make_password


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUserModel
        fields = ["password", "email", "username",
                  "first_name", "last_name", "password"]
