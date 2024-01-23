from utils.pagination import Paginator
from .models import Notification
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import NotificationSerializer

class GetNotifications(APIView):
    """
    API view for retrieving user notifications.
    """

    def get(self, request):
        """
        Handle GET request to retrieve user notifications.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The paginated response containing user notifications.
        """

        user = request.user
        notifications = Notification.objects.filter(user=user.id).order_by("-time")
        paginator = Paginator(size=10)

        paginated_queryset = paginator.paginate_queryset(queryset=notifications, request=request)
        serializer = NotificationSerializer(paginated_queryset, many=True)

        paginated_response = paginator.get_paginated_response(data=serializer.data)

        return paginated_response

class MarkItemAsSeen(APIView):
    """
    API view for marking notifications as seen.
    """

    def post(self, request):
        """
        Handle POST request to mark all user notifications as seen.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The response indicating success.
        """
        all_user_notifications = Notification.objects.filter(user=request.user).all()
        all_user_notifications.update(seen=True)

        return Response()

class GetSummaryNotifications(APIView):
    """
    API view for retrieving a summary of unseen notifications.
    """

    def get(self, request):
        """
        Handle GET request to retrieve the summary of unseen notifications.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The response indicating whether there are unseen notifications and their count.
        """
        all_user_notifications = Notification.objects.filter(user=request.user, seen=False).count()
        if all_user_notifications == 0:
            return Response({"HAS": False})

        return Response({"HAS": True, "SUMMARY": all_user_notifications})
