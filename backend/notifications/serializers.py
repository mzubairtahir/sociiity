from .models import Notification
from rest_framework.serializers import ModelSerializer



class NotificationSerializer(ModelSerializer):

    class Meta:
        model = Notification

        fields = ["message", "time", "seen"]