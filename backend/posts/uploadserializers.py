# uploadserializers.py

from rest_framework import serializers
from data.models import City
from user.models import CustomUserModel
from moviepy.editor import VideoFileClip
from data.models import ContentCategory
import os


class UploadSerializer(serializers.Serializer):
    """
    Serializer for uploading posts.
    """

    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    text_content = serializers.CharField(max_length=2000, allow_blank=True)
    files = serializers.ListField(
        allow_empty=False, max_length=3, min_length=1)
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUserModel.objects.all())
    category = serializers.PrimaryKeyRelatedField(
        queryset=ContentCategory.objects.all())

    def validate_files(self, list_of_files):
        """
        Validate the uploaded files.

        Parameters:
            list_of_files (list): List of uploaded files.

        Returns:
            list: The validated list of files.

        Raises:
            serializers.ValidationError: If there are validation errors.
        """

        def get_video_duration(file):
            try:
                video_clip = VideoFileClip(file.temporary_file_path())
                duration = video_clip.duration
                return duration
            except Exception as e:
                return None
            pass

        allowed_extensions = ['.jpg', '.jpeg', '.png', '.mp4']
        file_size = 100

        if len(list_of_files) > 3:
            raise serializers.ValidationError("You can post only three files")
        else:

            for i in list_of_files:
                _, extension = os.path.splitext(i.name)
                if extension not in allowed_extensions:
                    raise serializers.ValidationError(
                        "Some media formats are not supported")
                if i.size > (file_size * 1024 * 1024):
                    raise serializers.ValidationError(
                        f"File size should be less than {file_size} MB")

                if extension == ".mp4":
                    duration = get_video_duration(i)
                    if duration and duration > 600:
                        raise serializers.ValidationError(
                            "Video length is too large")

            return list_of_files
