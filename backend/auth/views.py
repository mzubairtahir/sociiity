from user.models import CustomUserModel
from . import serializer
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.utils.decorators import method_decorator
from notifications.inter_com import create_notification
from auth.utils import GoogleSignin
from user.utils import CreateUserByGauth

# Views for user authentication and related functionality.

class Signup(APIView):
    """
    View for user registration.

    - POST: Register a new user with provided data.
    """

    permission_classes = []
    authentication_classes = []

    def post(self, request):
        """
        Handle POST request for user registration.

        Parameters:
        - request: HTTP request object containing user data.

        Returns:
        - Response: JSON response indicating the status of the registration.
        """
        data = request.data

        user_ser = serializer.CreateUserSerializer(data=data)

        if user_ser.is_valid():
            validated_data = dict(user_ser.validated_data)
            user = CustomUserModel(**validated_data)
            user.set_picture(type="E")
            user.set_password(validated_data.get("password"))
            user.save()

            create_notification(
                user=user, message=f"Salam {user.first_name}! Welcome to Sociiity. Share what's happening in your area with your city. If you see something wrong, speak about it on Sociiity. Let's make a change together and create a connected and transparent community.")

            return Response({"status": "ok"})

        else:
            errors = [str(value[0]) for key, value in user_ser.errors.items()]
            return Response({"status": "INVALID_DATA", "detail": errors[0]}, status=422)


class Signin(APIView):
    """
    View for user login.

    - POST: Authenticate user with provided credentials.
    """

    permission_classes = []
    authentication_classes = []

    def post(self, request):
        """
        Handle POST request for user login.

        Parameters:
        - request: HTTP request object containing user credentials.

        Returns:
        - Response: JSON response indicating the status of the login attempt.
        """
        data = request.data
        email = data.get("email")
        password = data.get("password")
        user = CustomUserModel.objects.filter(email=email)
        if user.exists():
            if user[0].auth_method == "E":
                user = authenticate(email=email, password=password)
                if user is None:
                    return Response({"STATUS": "ERROR", "message": "Invalid password. Check your password and try again"}, status=401)

                login(request, user)
                return Response({"status": "ok", "user": user.id})
            else:
                return Response({"STATUS": "ERROR", "message": "Please use Google Sign-in for authentication"}, status=401)

        return Response({"STATUS": "ERROR", "message": "Invalid email address. Please check it and try again"}, status=401)


class Signout(APIView):
    """
    View for user logout.

    - GET: Logout the currently authenticated user.
    """

    def get(self, request):
        """
        Handle GET request for user logout.

        Parameters:
        - request: HTTP request object.

        Returns:
        - Response: JSON response indicating the status of the logout attempt.
        """
        if request.user.is_anonymous:
            return Response(data={}, status=400)
        else:
            logout(request=request)
            return Response({"status": "ok"})


@api_view(["GET"])
@ensure_csrf_cookie
@authentication_classes([])
@permission_classes([])
def get_csrf(request):
    """
    View for obtaining CSRF token.

    - GET: Retrieve CSRF token.

    Parameters:
    - request: HTTP request object.

    Returns:
    - Response: JSON response containing the CSRF token.
    """
    return Response({"status": "ok"})


class Session(APIView):
    """
    View for managing user sessions.

    - GET: Check and handle user sessions.
    """

    permission_classes = []

    @method_decorator(csrf_exempt)
    def get(self, request):
        """
        Handle GET request for managing user sessions.

        Parameters:
        - request: HTTP request object.

        Returns:
        - Response: JSON response indicating the status of the session.
        """

        if not request.user.is_anonymous:
            login(request=request, user=request.user)
            return Response({"user": request.user.id})
        else:
            logout(request=request)
            return Response({"status": "UNAUTHORIZED"}, status=401)


class GoogleSigninView(APIView):
    """
    View for Google Sign-in authentication.

    - POST: Authenticate user using Google Sign-in.
    """

    permission_classes = []

    def post(self, request):
        """
        Handle POST request for Google Sign-in authentication.

        Parameters:
        - request: HTTP request object containing Google Sign-in token.

        Returns:
        - Response: JSON response indicating the status of the authentication attempt.
        """
        data = request.data
        token_response = data.get("token_response")
        if token_response is None:
            return Response({"STATUS": "ERROR"})
        access_token = token_response.get("access_token")
        if access_token is None:
            return Response({"STATUS": "ERROR"})

        google_sign_in = GoogleSignin(access_token)

        if google_sign_in.is_valid_token():
            user_data = google_sign_in.get_user_data()
            create_user = CreateUserByGauth()
            try:
                user = create_user.create_or_get_user(**user_data)
            except create_user.invalid_data_exception:
                return Response({"STATUS": "ERROR", "message": "An error occurred while creating your account. Please try a different Google Account"})

            login(request=request, user=user)
            return Response({"STATUS": "OK", "user": user.id})
        else:
            return Response({"STATUS": "ERROR", "message": "Invalid token. Try again later"})
