from rest_framework.views import APIView
from posts.serializer import PostSerializer
from utils.pagination import Paginator
from posts.inter_com import get_valid_posts_by_query

def commonFetchingPosts(query, request):
    """
    Common function to fetch and paginate posts.

    Parameters:
        query (QuerySet): The queryset for fetching posts.
        request (HttpRequest): The HTTP request.

    Returns:
        Response: The paginated response containing posts.
    """

    pagination_class = Paginator(size=10)
    resulted_pages = pagination_class.paginate_queryset(query, request)
    serializer = PostSerializer(resulted_pages, many=True, context={"user": request.user.id})

    return pagination_class.get_paginated_response(serializer.data)

class PostListView(APIView):
    """
    API view for retrieving posts.
    """

    def get(self, request):
        """
        Handle GET request to retrieve posts.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The paginated response containing posts.
        """

        posts_from_cities = get_valid_posts_by_query(city=request.user.city).order_by("-date_created")
        return commonFetchingPosts(query=posts_from_cities, request=request)
