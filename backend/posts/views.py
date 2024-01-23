from rest_framework.response import Response
from .uploadserializers import UploadSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Post, Media
from .serializer import PostSerializer


class UploadPost(APIView):
    """
    API view for uploading posts.
    """

    def post(self, request):
        """
        Handles POST requests to upload a new post.

        Parameters:
            request (Request): The HTTP request.

        Returns:
            Response: JSON response indicating the status of the post upload.
        """

        data = (request.data)
        content = data.get("content")
        city = data.get("city")
        category = data.get("category")
        media = data.getlist("media")

        if len(media) == 0 or media is None or content is None or category is None:
            return Response("Incomplete post", status=400)

        post_data = {
            "user": request.user.id,
            "category": int(category),
            "city": city,
            "files": media,
            "text_content": content
        }

        post_ser = UploadSerializer(data=post_data)

        if post_ser.is_valid():

            serialized_data = post_ser.validated_data
            data = {
                "user": request.user,
                "city": serialized_data.get("city"),
                "text_content": serialized_data.get("text_content"),
                "category": serialized_data.get("category")
            }
            post = Post(**data)
            post.save()

            for media_file in serialized_data.get("files"):
                media = Media(post=post, file=media_file)
                media.save()

            return Response({"status": "ok"})
        else:
            return Response({"status": "error"}, 400)


@api_view(["POST"])
def delete_post(request):
    """
    API view to delete a post.

    Parameters:
        request (Request): The HTTP request.

    Returns:
        Response: JSON response indicating the status of the post deletion.
    """

    data = request.data.get("postid")

    if type(data) == int:

        post = Post.objects.filter(id=data)
        if post.exists():

            if request.user == post.first().user:

                post.first().delete()

                return Response({
                    "status": "ok"
                })

            else:
                return Response("Baby, You can't do this", status=400)

        else:
            response = Response({
                "status": "failed"
            })
            response.status_code = 400
            return response

    else:
        response = Response({
            "status": "invalid data"
        })
        response.status_code = 400

        return response


class PostView(APIView):
    """
    API view to retrieve post details.
    """

    permission_classes = []

    def get(self, request):
        """
        Handles GET requests to retrieve post details.

        Parameters:
            request (Request): The HTTP request.

        Returns:
            Response: JSON response containing post details.
        """

        post_id = request.query_params.get("i")
        post = Post.objects.filter(id=post_id)
        if (post.exists()):

            post_data = PostSerializer(post[0])

            return Response({"STATUS": "FOUND", "DATA": post_data.data})

        else:

            return Response({"STATUS": "NOT_FOUND"})
