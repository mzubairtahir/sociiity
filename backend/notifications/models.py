from django.db import models
from django.utils import timezone
from user.models import CustomUserModel

# Create your models here.


class Notification(models.Model):
    
    message = models.TextField(max_length = 500)
    user = models.ForeignKey(CustomUserModel, on_delete = models.CASCADE)
    time = models.DateTimeField(default = timezone.now )
    seen = models.BooleanField(default = False)
    

    

