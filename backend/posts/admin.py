from django.contrib import admin
from .models import Post, Media
# Register your models here.

admin.site.register([Post, Media])



