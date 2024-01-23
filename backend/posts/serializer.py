from rest_framework import serializers
from .models import Post, Media
from user.models import CustomUserModel
from django.utils import timezone
from datetime import timedelta
from data.models import City, ContentCategory

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializer for CustomUserModel.
    """

    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        """
        Get the full name of the user.

        Parameters:
            obj (CustomUserModel): The user object.

        Returns:
            str: The full name of the user.
        """
        return f"{obj.first_name} {obj.last_name}"

    def to_representation(self, instance):
        """
        Convert the user instance to a serialized representation.

        Parameters:
            instance (CustomUserModel): The user instance.

        Returns:
            dict: The serialized representation of the user.
        """

        base = {
            "id": instance.id,
            "full_name": instance.full_name,
            "profile_picture": instance.get_picture
        }

        return base

    class Meta:
        model = CustomUserModel
        fields = ('id', 'full_name',  'profile_picture')

class MediaSerializer(serializers.ModelSerializer):
    """
    Serializer for Media model.
    """

    class Meta:
        model = Media
        fields = ('id', 'file')

class CitySerializer(serializers.ModelSerializer):
    """
    Serializer for City model.
    """

    class Meta:
        model = City
        fields = ("name",)

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for ContentCategory model.
    """

    class Meta:
        model = ContentCategory
        fields = ("value",)

class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for Post model.
    """

    user = CustomUserSerializer()
    media = MediaSerializer(many=True, read_only=True, source="media_set")
    likes = serializers.SerializerMethodField()
    likedOrNot = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    dislikedOrNot = serializers.SerializerMethodField()
    city = CitySerializer()
    category = CategorySerializer()

    def get_likes(self, obj):
        """
        Get the count of likes for a post.

        Parameters:
            obj (Post): The post instance.

        Returns:
            int: The count of likes for the post.
        """
        return obj.likes.count()

    def get_dislikes(self, obj):
        """
        Get the count of dislikes for a post.

        Parameters:
            obj (Post): The post instance.

        Returns:
            int: The count of dislikes for the post.
        """
        return obj.dislikes.count()

    def get_likedOrNot(self, object):
        """
        Check if the user has liked the post.

        Parameters:
            object (Post): The post instance.

        Returns:
            bool: True if the user has liked the post, False otherwise.
        """
        user = self.context.get("user")

        if object.likes.filter(id=user).exists():
            return True
        else:
            return False

    def get_dislikedOrNot(self, object):
        """
        Check if the user has disliked the post.

        Parameters:
            object (Post): The post instance.

        Returns:
            bool: True if the user has disliked the post, False otherwise.
        """
        user = self.context.get("user")

        if object.dislikes.filter(id=user).exists():
            return True
        else:
            return False

    def get_time(self, obj):
        """
        Calculate the time difference since the post was created.

        Parameters:
            obj (Post): The post instance.

        Returns:
            str: The time difference since the post was created.
        """
        obj_time = obj.date_created
        ct = timezone.now()
        difference = (ct-obj_time)

        if difference < timedelta(minutes=1):
            return f"{difference.seconds} s ago"
        elif difference < timedelta(hours=1):
            return f"{difference.seconds // 60} min ago"
        elif difference < timedelta(days=1):
            return f"{difference.seconds // 3600} hours ago"
        elif difference < timedelta(days=30):
            return f"{difference.days} days ago"
        elif difference < timedelta(days=365):
            return f"{difference.days // 30} month ago"
        else:
            return f"{difference.days // 365} years ago"

    class Meta:
        model = Post
        fields = ('id', 'user', 'text_content',
                  'time', 'likes', 'likedOrNot', 'media', 'city', 'dislikedOrNot', 'dislikes', "category")
