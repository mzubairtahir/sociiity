from .models import Post
from django.db.models import Q


def get_valid_posts_by_query(**kwargs):
    """You can pass any argument in it that you want to pass in filter method"""
    query1 = Q(**kwargs)

    return Post.objects.filter(query1)