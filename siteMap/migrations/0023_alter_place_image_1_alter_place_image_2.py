# Generated by Django 4.1.2 on 2022-10-15 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0022_alter_place_coordinates_x_alter_place_coordinates_y_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='image_1',
            field=models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='siteMap/static/images/'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image_2',
            field=models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='siteMap/static/images/'),
        ),
    ]
