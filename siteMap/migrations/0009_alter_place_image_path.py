# Generated by Django 4.1.2 on 2022-10-11 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0008_alter_place_image_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='image_path',
            field=models.FilePathField(path='siteMap/static/'),
        ),
    ]
