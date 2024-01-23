from django.urls import path
from .views import  UploadPost, delete_post, PostView
from .comments_views import Likes, Dislike

urlpatterns = [
    path('makepost', view=UploadPost.as_view(), name="make_posts"),
    path('delete', view=delete_post, name="delete_posts"),
    path('like', view=Likes.as_view(), name="like_unlike"),
    path('dislike', view=Dislike.as_view(), name="dislike_undislike"),
    path('postview', view=PostView.as_view(), name="post_view"),

]
