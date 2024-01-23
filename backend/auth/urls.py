from django.urls import path
from . import views


urlpatterns = [
    path('signup', view=views.Signup.as_view(), name="signup"),
    path('signin', view=views.Signin.as_view(), name="signin"),
    path('google_signin', view=views.GoogleSigninView.as_view(), name="google_signin"),
    path('logout', view=views.Signout.as_view(), name="signout"),
    path('getcsrf', view=views.get_csrf, name="get_csrf"),
    path('session', view=views.Session.as_view(), name="session"),


]
