# Generated by Django 4.1.2 on 2022-12-15 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0050_delete_usersroutess'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsersRoutes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(help_text='Пользователь', max_length=200)),
                ('first_point', models.CharField(help_text='Первая точка', max_length=100)),
                ('routes_points', models.CharField(help_text='Маршрут', max_length=100)),
                ('distance', models.CharField(help_text='Растояние', max_length=30)),
                ('time', models.CharField(help_text='Время', max_length=30)),
                ('currency', models.CharField(help_text='Валюта', max_length=100)),
                ('description', models.CharField(help_text='Описание маршрутов.', max_length=500)),
            ],
            options={
                'verbose_name': 'Пользовательский маршрут',
                'verbose_name_plural': 'Пользовательские маршруты',
                'ordering': ['user'],
            },
        ),
    ]
