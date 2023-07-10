# Generated by Django 4.1.2 on 2022-11-16 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0037_alter_place_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPlace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Название пользовательского нового места', max_length=50, unique=True)),
                ('description', models.TextField(help_text='Описание места')),
                ('region', models.CharField(default='Минск', help_text='Регион местоположения', max_length=20)),
                ('coordinates_x', models.FloatField(help_text='Координаты по оси x')),
                ('coordinates_y', models.FloatField(help_text='Координаты по оси y')),
                ('image', models.ImageField(help_text='Главная фотка места', upload_to='siteMap/static/images/')),
                ('image1', models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='siteMap/static/images/')),
                ('image2', models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='siteMap/static/images/')),
                ('image3', models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='siteMap/static/images/')),
                ('image4', models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='siteMap/static/images/')),
            ],
            options={
                'verbose_name': 'Пользовательское место',
                'verbose_name_plural': 'Пользовательские места',
                'ordering': ['name'],
            },
        ),
    ]
