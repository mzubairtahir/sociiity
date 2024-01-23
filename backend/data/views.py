from rest_framework.response import Response
from .serializers import GetCities, CategoriesSerializer
from .models import City, ContentCategory
from rest_framework.views import APIView

class GetCategories(APIView):
    """
    API view for retrieving content categories.
    """

    def get(self, request):
        """
        Handle GET request to retrieve content categories.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The response containing serialized content categories.
        """

        all_categories = ContentCategory.objects.all()
        serialized = CategoriesSerializer(all_categories, many=True)

        return Response({"STATUS": "OK", "DATA": serialized.data})

class CompleteCity(APIView):
    """
    API view for retrieving cities based on query.
    """

    def get(self, request):
        """
        Handle GET request to retrieve cities based on query.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The response containing serialized city data.
        """

        q = request.query_params.get("value")
        related_data = City.objects.filter(name__istartswith=q)

        if related_data.exists():
            ser_data = GetCities(related_data, many=True)
            return Response({"data": ser_data.data})
        else:
            return Response({"data": []})
