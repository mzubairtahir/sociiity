from django.urls import path
from . import views


urlpatterns = [
    path('detail', view=views.GetProfileData.as_view(), name="profile_detail"),
    path('edit', view=views.Edit.as_view(), name="profile_editing"),
    path('posts', view=views.GetUserPosts.as_view(), name="users_posts")

]