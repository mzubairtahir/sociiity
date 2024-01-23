from notifications.models import Notification

def create_notification(user, message):
    """
    Will create a notification for user.
    Parameters:
    - user: Object of a CustomUserModel
    - message: string of notification body
    """

    Notification(user=user, message = message).save()