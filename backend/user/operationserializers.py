import os
from rest_framework import serializers
from data.models import City

class ChangeName(serializers.Serializer):
    """
    Serializer for changing user's first and last names.
    """

    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)

class ChangeAvatar(serializers.Serializer):
    """
    Serializer for changing user's profile picture.
    """

    def validate_profile_picture(self, image):
        """
        Validate the profile picture format.

        Parameters:
            image: The profile picture image.

        Returns:
            image: The validated profile picture image.

        Raises:
            serializers.ValidationError: If the image format is not supported.
        """

        image_formats = ['.jpeg', '.jpg', '.png']
        _, extension = os.path.splitext(image.name)
        if extension in image_formats:
            return image

        raise serializers.ValidationError("Image format is not supported")

    profile_picture = serializers.ImageField()

class ChangeCityAndArea(serializers.Serializer):
    """
    Serializer for changing user's city and area.
    """

    area = serializers.CharField()
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
