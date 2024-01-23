from .base import *
import os

STATIC_ROOT = BASE_DIR / "static"


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
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
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

ALLOWED_HOSTS = [] #enter allowed hosts


DATABASES = {
    'default': {} #give details of production database
}


CORS_ALLOWED_ORIGINS = []   # add trusted origins to enable cors

CSRF_TRUSTED_ORIGINS = []   # add csrf trusted origins


AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
AWS_DEFAULT_ACL = "public-read"
AWS_LOCATION = ''
AWS_QUERYSTRING_AUTH = False
MEIDA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/media/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_S3_FILE_OVERWRITE = False
