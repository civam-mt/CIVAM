"""
WSGI config for project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

sys.path.append('/home/ubuntu/CISC475_D5/django_project')
sys.path.append('/home/ubuntu/CISC475_D5/django_project/project')

application = get_wsgi_application()
