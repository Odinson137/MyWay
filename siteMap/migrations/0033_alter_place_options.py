# Generated by Django 4.1.2 on 2022-11-03 05:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0032_alter_place_options_alter_place_image1_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='place',
            options={'ordering': ['name'], 'verbose_name': 'Место', 'verbose_name_plural': 'Места'},
        ),
    ]
