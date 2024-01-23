from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from data.models import City

class CustomUserManager(BaseUserManager):
    """
    Custom manager for the CustomUserModel.
    """

    def create_user(self, email=None, password=None, **extra_fields):
        """
        Create a regular user.

        Parameters:
            email (str): User's email.
            password (str): User's password.
            **extra_fields: Additional fields for the user.

        Returns:
            CustomUserModel: The created user instance.
        """

        extra_fields.setdefault("is_active", True)

        if not email:
            raise ValueError("You must have to provide email")

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        """
        Create a superuser.

        Parameters:
            email (str): User's email.
            password (str): User's password.
            **extra_fields: Additional fields for the user.

        Returns:
            CustomUserModel: The created superuser instance.
        """

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not email:
            raise ValueError("You must have to provide")

        user = self.create_user(email, password, **extra_fields)
        return user

class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model for the application.
    """

    email = models.EmailField(unique=True, blank=False, null=False)
    username = models.CharField(
        max_length=20, blank=False, null=False, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    profile_picture = models.ImageField(
        upload_to="profile_pics/%Y/%m/%d/", blank=True, null=True)

    google_profile_picture = models.CharField(
        max_length=2000, default=None, null=True, blank=True)

    city = models.ForeignKey(
        City, on_delete=models.CASCADE, blank=True, null=True)
    area = models.CharField(max_length=200, blank=True, null=True)

    AUTH_METHOD_CHOICES = [
        ('E', "Email"),
        ('G', "Google")
    ]

    auth_method = models.CharField(max_length=50, default="E")
    is_verified = models.BooleanField(default=False)

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    @property
    def full_name(self):
        """
        Get the user's full name.

        Returns:
            str: The user's full name.
        """

        return f"{self.first_name} {self.last_name}"

    @property
    def get_picture(self):
        """
        Get the user's profile picture.

        Returns:
            str: The URL of the user's profile picture.
        """

        if self.profile_picture:
            return self.profile_picture.url

        return self.google_profile_picture

    def set_picture(self, type: str, value=None):
        """
        Set the user's profile picture.

        Parameters:
            type (str): The type of authentication method ('E' for Email, 'G' for Google).
            value: The value of the profile picture.

        Returns:
            None
        """

        if type == "E":
            if value:
                self.profile_picture = value
            self.profile_picture = "/profile_pics/placeholder.png"
        else:
            self.profile_picture = None
            self.google_profile_picture = value

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
