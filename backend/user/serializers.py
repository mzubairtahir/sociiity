from rest_framework import serializers
from .models import CustomUserModel


class UserProfileDetail(serializers.ModelSerializer):
    """
    Serializer for user profile details.
    """

    class Meta:
        model = CustomUserModel
        fields = "__all__"

    def to_representation(self, instance):
        """
        Convert user profile details to a serialized representation.

        Parameters:
            instance (CustomUserModel): The user instance.

        Returns:
            dict: Serialized representation of user profile details.
        """

        request = self.context.get('request')
        user = request.user if request else None

        common = {
            'id': instance.id,
            'username': instance.username,
            "full_name": instance.full_name,
            'city': instance.city.name if instance.city is not None else None,
            'area': instance.area,
            'avatar': instance.get_picture
        }

        if user and user == instance:  # Check if the request user is the owner
            # Return detailed information for the owner

            common.update({
                'email': instance.email
            })

            return common

        else:
            return common
