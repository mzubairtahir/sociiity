from rest_framework.views import APIView
from rest_framework.response import Response
from feed.views import commonFetchingPosts
from posts.inter_com import get_valid_posts_by_query

class GetSearchPostResults(APIView):
    """
    API view to retrieve search results for posts.
    """

    def get(self, request):
        """
        Handles GET requests to retrieve search results for posts.

        Parameters:
            request (Request): The HTTP request.

        Returns:
            Response: Paginated search results serialized as a JSON response.
        """

        q = request.query_params.get("q")
        filter = request.query_params.get("fl")

        all_related_post = get_valid_posts_by_query(text_content__icontains=q)
        if filter is not None:
            all_related_post = all_related_post.filter(city__name=filter)

        paginated_results = commonFetchingPosts(
            query=all_related_post, request=request)

        return Response(paginated_results.data)
