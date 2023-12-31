# Generated by Django 4.1.2 on 2022-12-04 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0044_users_itinerary'),
    ]

    operations = [
        migrations.CreateModel(
            name='Routes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Название', max_length=50, unique=True)),
                ('description', models.CharField(help_text='Описание', max_length=300)),
                ('points', models.CharField(help_text='Точки маршрута', max_length=30)),
                ('image', models.ImageField(help_text='Главная фотка маршрута', upload_to='siteMap/static/images/')),
            ],
            options={
                'verbose_name': 'Маршрут',
                'verbose_name_plural': 'Маршруты',
                'ordering': ['name'],
            },
        ),
    ]
