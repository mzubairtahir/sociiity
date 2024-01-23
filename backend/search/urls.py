from django.urls import path
from . import views


urlpatterns = [
    path('posts', view=views.GetSearchPostResults.as_view(), name="get_search_posts"),

]