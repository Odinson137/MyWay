from distutils.command.upload import upload
from email.policy import default
from django.db import models

from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver
# Create your models here.

filters =(
    ("0", "Достопримечательности Беларуси"),
    ("1", "Красивые места белорусской природы"),
    ("2", "Санатории и парки семейного отдыха"),
    ("3", "Места для кемпинга"),
)


class UsersRoutes(models.Model):
    user = models.CharField(max_length=200, help_text="Пользователь")
    first_point = models.CharField(max_length=100, help_text="Первая точка")
    routes_points = models.CharField(max_length=100, help_text="Маршрут")
    distance = models.CharField(max_length=30, help_text="Растояние")
    time = models.CharField(max_length=30, help_text="Время")
    currency = models.CharField(max_length=100, help_text="Валюта")
    description = models.CharField(max_length=500, help_text='Описание маршрутов.')
    
    def __str__(self):
        return self.user
    
    class Meta:
        ordering = ['user']
        verbose_name = "Пользовательский маршрут"
        verbose_name_plural = "Пользовательские маршруты"

class Routes(models.Model):
    name = models.CharField(max_length=100, help_text="Название", unique=True)
    title = models.CharField(max_length=100, help_text="Послезвание", default="0")
    description = models.CharField(max_length=300, help_text="Описание", default="0")
    points = models.CharField(max_length=30, help_text="Точки маршрута", default="3 5 6 9")
    image = models.ImageField(upload_to='static/images/', help_text="Главная фотка маршрута", default="0") 
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
        verbose_name = "Маршрут"
        verbose_name_plural = "Маршруты"

regions = [
    ('1', 'Минск'),
    ('2', 'Брест'),
    ('3', 'Могилев'),
    ('4', 'Гродно'),
    ('5', 'Гомель'),
    ('6', 'Витебск')
]

class Place(models.Model):
    name = models.CharField(max_length=50, help_text="Название нового места", unique=True)
    opacity = models.BooleanField(help_text='Отображение этого места (ДА или НЕТ)', default=True)
    user = models.CharField(max_length=100, help_text="Пользователь, который добавил месте", default="Luba_Yura")
    filter = models.CharField(max_length=40, choices=filters, default='0')
    description = models.TextField(help_text="Описание места")
    region = models.CharField(max_length=2, help_text="Регион местоположения", choices=regions, default="1")
    coordinates_x = models.FloatField(help_text="Координаты по оси x")
    coordinates_y = models.FloatField(help_text="Координаты по оси y")
    image = models.ImageField(upload_to='static/images/', help_text="Главная фотка места") 
    image1 = models.ImageField(upload_to='static/images/', default="0", help_text="Дополнительная фотография") 
    image2 = models.ImageField(upload_to='static/images/', default="0", help_text="Дополнительная фотография") 
    image3 = models.ImageField(upload_to='static/images/', default="0", help_text="Дополнительная фотография") 
    image4 = models.ImageField(upload_to='static/images/', default="0", help_text="Дополнительная фотография") 
    
    def __str__(self):
        return self.name
    
    def get_query_set(self):
        return super(Place, self).get_query_set().order_by('region') 
    
    class Meta:
        ordering = ['name']
        verbose_name = "Место"
        verbose_name_plural = "Места"
        


@receiver(pre_delete, sender=Place)
def advert_photo_delete(sender, instance, **kwargs):
    instance.image.delete(False)
    instance.image1.delete(False)
    instance.image2.delete(False)
    instance.image3.delete(False)
    instance.image4.delete(False)
    
@receiver(pre_delete, sender=Routes)
def advert_photo_delete(sender, instance, **kwargs):
    instance.image.delete(False)

class Comments(models.Model):
    user = models.CharField(max_length=100, help_text="Пользователь, который добавил коммент")
    comments = models.CharField(max_length=500, help_text="Комментарий", default="0")
    place_id = models.IntegerField(help_text="индекс комментируемого места")
    # data = 
    
    def __str__(self):
        return self.user
    
    class Meta:
        ordering = ['user']
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"