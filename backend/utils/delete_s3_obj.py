"""
This module contains functionality to delete our aws s3 objects.
"""

import boto3
from locjourn.settings.production import AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY


def delete_object(instance_file_name):
    session = boto3.Session(aws_access_key_id=AWS_ACCESS_KEY_ID,
                            aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    key = instance_file_name

    s3 = session.resource("s3")

    s3.meta.client.delete_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=key)