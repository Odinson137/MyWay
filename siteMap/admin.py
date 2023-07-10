from django.contrib import admin

# Register your models here.

from .models import Place, Routes, UsersRoutes, Comments

admin.site.register(Place)
admin.site.register(UsersRoutes)
admin.site.register(Routes)
admin.site.register(Comments)
