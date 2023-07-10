"""Luba_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from siteMap import views
 
from django.conf import settings
from django.conf.urls.static import static

 
urlpatterns = [
    # path('', views.index, name='home'),
    path('', views.main, name='Main'),
    path('frame_images', views.frame_images, name='frame_images'),
    path('Places', views.places, name='Places'),
    path('Places/<int:id>', views.place, name='Places'),
    path('Map', views.map, name='Map'),
    path('Routes', views.routes, name='Routes'),
    path('Registration', views.RegisterUser.as_view(), name='Registration'),
    path('Registration/', views.RegisterUser.as_view(), name='Registration'),
    path('login', views.LoginUser.as_view(), name='login'),
    path('login/', views.LoginUser.as_view(), name='login'),
    path('logout', views.logout_user, name='logout'),
    # path('__debug__/', include('debug_toolbar.urls')),
    path('Account', views.account, name='Account'),
    path('Account/', views.account, name='Account'),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

