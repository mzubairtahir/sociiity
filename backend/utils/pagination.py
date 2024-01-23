"""
This module contains a pagination class to paginate our database results.
"""

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class Paginator(PageNumberPagination):
    """
    Custom pagination class for paginating database results.
    """

    last_page_strings = ('last',)

    def __init__(self, size: int, max_page_size=1000, query_parameter="q", next_link_placeholder="page") -> None:
        """
        Constructor method to initialize the Paginator class instance.

        Parameters:
        - size (int): Number of results per page.
        - max_page_size (int): Maximum number of pages.
        - query_parameter (str): Query parameter.
        - next_link_placeholder (str): Placeholder for the 'next' link in the response.
        """
        self.page_size = size
        self.page_size_query_param = query_parameter
        self.max_page_size = max_page_size
        self.next_link_placeholder = next_link_placeholder

    def get_next_link(self):
        """
        Get the link to the next page if it exists.

        Returns:
        - str or None: Next page link or None if there is no next page.
        """
        if self.page.has_next():
            return self.request.path + f'?{self.next_link_placeholder}={self.page.next_page_number()}'
        else:
            return None

    def get_paginated_response(self, data):
        """
        Get the paginated response containing links and paginated data.

        Parameters:
        - data: Paginated data to be included in the response.

        Returns:
        - Response: Paginated response containing links and paginated data.
        """
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'results': data
        })
