# yourapp/management/commands/import_data.py
import csv
from django.core.management.base import BaseCommand
from data.models import City  # Import your model

class Command(BaseCommand):
    help = 'Import cities from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']

        with open(csv_file_path, 'r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header row

            for row in reader:
                City.objects.create(
                    province=row[0],
                    name=row[1],
                    # Map other fields accordingly
                )

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
