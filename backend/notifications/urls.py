from django.urls import path
from .views import GetNotifications, MarkItemAsSeen, GetSummaryNotifications

urlpatterns = [
    path('get', view=GetNotifications.as_view(), name="get_notifications"),
    path('markAsSeen', view=MarkItemAsSeen.as_view(), name="get_notifications"),
    path('summary', view=GetSummaryNotifications.as_view(), name="get_notifications_summary"),


]
