from django.urls import path
from .views import PostListView

urlpatterns = [
    path('browse', view=PostListView.as_view(), name="get_posts"),
]
