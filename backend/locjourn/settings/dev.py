from .base import *



MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user.apps.UserConfig',
    'posts.apps.PostsConfig',
    'rest_framework',
    'search.apps.SearchConfig',
    'data.apps.DataConfig',
    'feed.apps.FeedConfig',
    'corsheaders',
    'storages',
    'notifications.apps.NotificationsConfig',



]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]


DATABASES = {
    'default': {} #give details of local db
}


ALLOWED_HOSTS = []


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # or your frontend development server
]

CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"] 

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)