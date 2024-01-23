from django.contrib import admin
from .models import City, ContentCategory
# Register your models here.

admin.site.register([City, ContentCategory])
