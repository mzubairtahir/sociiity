import requests

class GoogleSignin:
    """
    Class for handling Google Sign-in authentication.

    Attributes:
    - userinfo_endpoint (str): Google API endpoint for user information.
    - token (str): Access token obtained from Google Sign-in.

    Methods:
    - __init__(self, token: str): Constructor method to initialize the class instance.
    - is_valid_token(self) -> bool: Check if the provided access token is valid.
    - get_user_data(self) -> dict or None: Get user data if the access token is valid, otherwise return None.
    """

    userinfo_endpoint = 'https://www.googleapis.com/oauth2/v3/userinfo'

    def __init__(self, token: str) -> None:
        """
        Constructor method to initialize the GoogleSignin class instance.

        Parameters:
        - token (str): Access token obtained from Google Sign-in.
        """
        self.token = token
        self.__user_data = None

    def is_valid_token(self) -> bool:
        """
        Check if the provided access token is valid.

        Returns:
        - bool: True if the access token is valid, False otherwise.
        """
        headers = {'Authorization': f'Bearer {self.token}'}

        response = requests.get(self.userinfo_endpoint, headers=headers)

        if response.status_code == 200:
            json_response = response.json()

            self.__user_data = json_response
            return True

        return False

    def get_user_data(self) -> dict or None:
        """
        Get user data if the access token is valid, otherwise return None.

        Returns:
        - dict or None: User data if the access token is valid, None otherwise.
        """
        try:
            return self.__user_data
        except AttributeError:
            return None
