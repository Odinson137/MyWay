# Generated by Django 4.1.2 on 2022-11-03 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0035_place_region_alter_place_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='region',
            field=models.CharField(default='Минск', help_text='Регион местоположения', max_length=20),
        ),
    ]
