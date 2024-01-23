from django.urls import path
from . import views


urlpatterns = [
    path('complete_city', view=views.CompleteCity.as_view(),
         name="complete_city_value"),
    path('get_categories', view=views.GetCategories.as_view(), name="get_categories"),
]
