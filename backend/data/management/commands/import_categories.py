
from typing import Any
from django.core.management.base import BaseCommand, CommandParser
from data.models import ContentCategory


class Command(BaseCommand):
    help = "Import categories form text file"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "text_file",  help="Path to text file, containg categories")

    def handle(self, *args: Any, **options: Any) -> str | None:
        file_path = options['text_file']

        with open(file_path, "r") as file:
            lines = file.readlines()

            content_categories = []
            for category in lines:
                content_categories.append(
                    ContentCategory(value=category.strip()))

            ContentCategory.objects.bulk_create(content_categories)
        self.stdout.write(self.style.SUCCESS(
            "Categories imported successfully!"))
