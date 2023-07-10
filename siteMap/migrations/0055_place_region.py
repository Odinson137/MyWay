# Generated by Django 4.1.2 on 2023-01-08 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0054_remove_place_region'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='region',
            field=models.CharField(choices=[('1', 'Минск'), ('2', 'Брест'), ('3', 'Могилев'), ('4', 'Гродно'), ('5', 'Гомель'), ('6', 'Витебск')], default='1', help_text='Регион местоположения', max_length=2),
        ),
    ]