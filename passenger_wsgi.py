import sys, os 
cwd = os.getcwd() 
sys.path.append(cwd) 
sys.path.append(cwd + '/Luba_project') 
os.environ['DJANGO_SETTINGS_MODULE'] = "Luba_project.settings" 
from django.core.wsgi import get_wsgi_application 
application = get_wsgi_application()