"""
Utilities related to user app
"""

from user.models import CustomUserModel
import random
from notifications.inter_com import create_notification
import string


class InvalidUserData(Exception):
    """
    Exception class for invalid user data.
    """

    def __init__(self, *args: object) -> None:
        super().__init__(*args)


class CreateUserByGauth:
    """
    Utility class for creating users using Google authentication.
    """

    invalid_data_exception = InvalidUserData

    def generate_strong_password(self, length=12):
        """
        Generate a strong password with a specified length.

        Parameters:
            length (int): Length of the password.

        Returns:
            str: Generated strong password.
        """

        # Define character sets for different types of characters
        lowercase_letters = string.ascii_lowercase
        uppercase_letters = string.ascii_uppercase
        digits = string.digits
        special_characters = string.punctuation

        # Combine character sets
        all_characters = lowercase_letters + \
            uppercase_letters + digits + special_characters

        # Ensure at least one character from each set
        password = [
            random.choice(lowercase_letters),
            random.choice(uppercase_letters),
            random.choice(digits),
            random.choice(special_characters),
        ]

        # Fill the rest of the password with random characters
        remaining_length = length - len(password)
        password.extend(random.choice(all_characters)
                        for _ in range(remaining_length))

        # Shuffle the characters to make the password more random
        random.shuffle(password)

        # Convert the list of characters to a string
        password_str = ''.join(password)

        return password_str

    def generate_unique_username(self, full_name):
        """
        Generate a unique username based on the user's full name.

        Parameters:
            full_name (str): The user's full name.

        Returns:
            str: Generated unique username.
        """

        # Generate a base username using the first letter of the first name and the last name
        base_username = full_name.lower().replace(" ", "")

        # Check if the base username already exists
        username = base_username
        suffix = 1
        while CustomUserModel.objects.filter(username=username).exists():
            username = base_username + str(suffix)
            suffix += 1

        return username

    def create_using_gauth(self, **user_data):
        """
        Create a user using Google authentication data.

        Parameters:
            **user_data: User data obtained from Google authentication.

        Returns:
            CustomUserModel: The created user instance.
        """

        email = user_data.get("email")
        first_name = user_data.get("given_name")
        last_name = user_data.get("family_name")
        profile_picture = user_data.get("picture")
        is_verified = user_data.get("email_verified")  # bool
        full_name = user_data.get("name")  # bool

        if not (email and full_name and first_name and profile_picture and is_verified):
            raise self.invalid_data_exception("Invalid data for user creation")

        user_details = {
            "username": self.generate_unique_username(full_name=full_name),
            "email": email,
            "first_name": first_name,
            "last_name": last_name or "",
            "is_verified": is_verified,
            "auth_method": "G"
        }

        new_user = CustomUserModel(**user_details)
        new_user.set_picture(type="G", value=profile_picture)
        new_user.set_password(self.generate_strong_password())
        new_user.save()
        create_notification(
            user=new_user, message=f"Salam {new_user.first_name}! Welcome to Sociiity. Share what's happening in your area with your city. If you see something wrong, speak about it on Sociiity. Let's make a change together and create a connected and transparent community.")

        return new_user

    def create_or_get_user(self, **user_data):
        """
        Create or retrieve a user based on the provided data.

        Parameters:
            **user_data: User data.

        Returns:
            CustomUserModel: The created or retrieved user instance.
        """

        email = user_data.get("email")
        if email is None:
            raise self.invalid_data_exception("Invalid data for user creation")

        user = CustomUserModel.objects.filter(email=email)
        if user.exists():
            user = user.first()
            if user.is_verified is False:
                user.is_verified = user_data.get("email_verified")
                user.save()

            return user

        else:
            return self.create_using_gauth(**user_data)
