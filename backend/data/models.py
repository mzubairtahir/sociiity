from django.db import models

class City(models.Model):
    """
    Model representing a city.
    """

    name = models.CharField(max_length=50, unique=True)
    province = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f"{self.id} {self.name}"

    class Meta:
        verbose_name = "City"
        verbose_name_plural = "Cities"

class ContentCategory(models.Model):
    """
    Model representing a content category.
    """

    value = models.CharField(max_length=200, unique=True)

    def __str__(self) -> str:
        return self.value
