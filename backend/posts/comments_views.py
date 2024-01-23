from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import CustomUserModel
from . import models

class Dislike(APIView):
    """
    API view for handling post dislikes.
    """

    def post(self, request):
        """
        Handle POST request for dislikes.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The response indicating the success or failure of the dislike action.
        """

        data = request.data
        post = data.get("post")
        action = data.get("action")

        if action == "dislike" or action == "undislike":
            pass
        else:
            return Response({"status": "error"})

        user_object = CustomUserModel.objects.filter(id=request.user.id)

        if user_object.exists():
            user_object = user_object.first()
        else:
            return Response({"status": "error", "message": "user is not present"})

        post = models.Post.objects.filter(id=post)

        if post.exists():
            post = post.first()

            if action == "dislike":
                post.likes.remove(user_object)
                post.dislikes.add(user_object)
            else:
                post.dislikes.remove(user_object)

            post.save()

            return Response({"status": "success"})
        else:
            return Response({"status": "fail", "message": "Post not found"})

class Likes(APIView):
    """
    API view for handling post likes.
    """

    def post(self, request):
        """
        Handle POST request for likes.

        Parameters:
            request (HttpRequest): The HTTP request.

        Returns:
            Response: The response indicating the success or failure of the like action.
        """

        data = request.data
        post = data.get("post")
        action = data.get("action")

        if action == "like" or action == "unlike":
            pass
        else:
            return Response({"status": "error"})

        user_object = CustomUserModel.objects.filter(id=request.user.id)

        if user_object.exists():
            user_object = user_object.first()
        else:
            return Response({"status": "error", "message": "user is not present"})

        post = models.Post.objects.filter(id=post)

        if post.exists():
            post = post.first()

            if action == "like":
                post.dislikes.remove(user_object)
                post.likes.add(user_object)
            else:
                post.likes.remove(user_object)

            post.save()

            return Response({"status": "success"})
        else:
            return Response({"status": "fail", "message": "Post not found"})
