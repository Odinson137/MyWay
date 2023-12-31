# Generated by Django 4.1.2 on 2022-10-15 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('siteMap', '0027_delete_place'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField()),
                ('coordinates_x', models.FloatField()),
                ('coordinates_y', models.FloatField()),
                ('image', models.ImageField(upload_to='siteMap/static/images/')),
                ('image1', models.ImageField(upload_to='siteMap/static/images/')),
                ('image2', models.ImageField(upload_to='siteMap/static/images/')),
                ('image3', models.ImageField(upload_to='siteMap/static/images/')),
                ('image4', models.ImageField(upload_to='siteMap/static/images/')),
            ],
        ),
    ]
