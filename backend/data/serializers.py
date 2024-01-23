from .models import  City, ContentCategory
from rest_framework import serializers



class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentCategory
        fields = ["id", "value"]




class GetCities(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["name","id"]