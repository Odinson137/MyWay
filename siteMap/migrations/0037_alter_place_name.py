# Generated by Django 4.1.2 on 2022-11-03 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0036_alter_place_region'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='name',
            field=models.CharField(help_text='Название нового места', max_length=50, unique=True),
        ),
    ]
