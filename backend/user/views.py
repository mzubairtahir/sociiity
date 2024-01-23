from . import operationserializers
from .serializers import UserProfileDetail
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import CustomUserModel
from utils.delete_s3_obj import delete_object
from feed.views import commonFetchingPosts
from notifications.inter_com import create_notification
from posts.inter_com import get_valid_posts_by_query
from locjourn.settings.base import DEBUG

# Create your views here.


class GetProfileData(APIView):
    """
    API view to retrieve user profile data.
    """

    def get(self, request):
        """
        Handles GET requests to retrieve user profile data.

        Parameters:
            request (Request): The HTTP request.

        Returns:
            Response: User profile data serialized as a JSON response.
        """

        user = CustomUserModel.objects.filter(username=request.user.username)

        if user.exists():
            userdata = UserProfileDetail(
                user.first(), context={"request": request})

            return Response(userdata.data)

        else:
            response = Response()
            response.status_code = 404
            return response


class Edit(APIView):
    """
    API view to handle user profile edits.
    """

    def commit_detail(self, request, data, operation):
        """
        Commits user profile details based on the specified operation.

        Parameters:
            request (Request): The HTTP request.
            data (dict): The user profile details.
            operation (str): The type of operation to perform.

        Returns:
            None
        """

        user = request.user

        if operation == "avatar":
            user.set_picture(type="E", value=data.get("profile_picture"))

        showing_city_notificatin_flag = False
        if operation == "ca":
            if user.city is None:
                showing_city_notificatin_flag = True

        for key, value in dict(data).items():
            setattr(user, key, value)

        user.save()

        if showing_city_notificatin_flag:
            city = user.city
            if city is not None:
                create_notification(
                    user=user, message=f"See something wrong in {city.name}? Don't keep quiet. Sociiity is your way to speak up about important problems, from pothole on the road to any kind of wrongdoing. Let's work together to make {city.name} a better place!")

    def post(self, request):
        """
        Handles POST requests to edit user profile details.

        Parameters:
            request (Request): The HTTP request.

        Returns:
            Response: JSON response indicating the status of the operation.
        """

        data = request.data

        op_type = data.get("type")
        detail = data.get("detail")

        if op_type == "name":
            ser = operationserializers.ChangeName(data=detail)

        elif op_type == "avatar":
            if request.user.profile_picture is not None:
                key = request.user.profile_picture.name
                if DEBUG:
                    delete_object(instance_file_name=key)
            ser = operationserializers.ChangeAvatar(data={
                "profile_picture": data.get("profile_picture")
            })
        elif op_type == "ca":
            ser = operationserializers.ChangeCityAndArea(data=detail)

        elif op_type == "gender":
            ser = operationserializers.ChangeGender(data=detail)

        else:
            response = Response({"detail": "Invalid operation"})
            response.status_code = 400
            return response

        if ser.is_valid():
            self.commit_detail(
                request=request, data=ser.validated_data, operation=op_type)
            return Response({"status": "ok"})
        else:
            response = Response(
                {"status": "error", "message": "Invalid data"})
            response.status_code = 400
            return response


class GetUserPosts(APIView):
    """
    API view to retrieve posts associated with a user.
    """

    def get(self, request):
        """
        Handles GET requests to retrieve user posts.

        Parameters:
            request (Request): The HTTP request.

        Returns:
            Response: User posts serialized as a JSON response.
        """

        query = get_valid_posts_by_query(user=request.user.id).all()

        return commonFetchingPosts(query=query, request=request)
