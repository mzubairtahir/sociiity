from django.db import models
from data.models import City
from user.models import CustomUserModel
from django.utils import timezone
from data.models import ContentCategory

class Post(models.Model):
    """
    Model for representing user posts.
    """

    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    text_content = models.TextField(max_length=2000)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(
        CustomUserModel, related_name="liked_post", blank=True)
    dislikes = models.ManyToManyField(
        CustomUserModel, related_name="unliked_post", blank=True)
    category = models.ForeignKey(ContentCategory, on_delete=models.SET_DEFAULT, default=None, blank=False, null=True)

    def __str__(self) -> str:
        """
        Get a string representation of the post.

        Returns:
            str: The string representation of the post.
        """
        return str(self.id)

    class Meta:
        ordering = ["-date_created"]

class Media(models.Model):
    """
    Model for representing media files associated with a post.
    """

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(
        upload_to="content/%Y/%m/%d/", blank=False, null=False, max_length=1000)

    def __str__(self) -> str:
        """
        Get a string representation of the media file.

        Returns:
            str: The string representation of the media file.
        """
        return str(self.post.id)
