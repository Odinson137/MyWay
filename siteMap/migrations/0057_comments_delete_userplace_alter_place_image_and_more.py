# Generated by Django 4.1.2 on 2023-05-01 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0056_place_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(help_text='Пользователь, который добавил коммент', max_length=100, unique=True)),
                ('comments', models.CharField(default='0', help_text='Комментарий', max_length=500)),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': 'Комментарии',
                'ordering': ['user'],
            },
        ),
        migrations.DeleteModel(
            name='UserPlace',
        ),
        migrations.AlterField(
            model_name='place',
            name='image',
            field=models.ImageField(help_text='Главная фотка места', upload_to='static/images/'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image1',
            field=models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='static/images/'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image2',
            field=models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='static/images/'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image3',
            field=models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='static/images/'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image4',
            field=models.ImageField(default='0', help_text='Дополнительная фотография', upload_to='static/images/'),
        ),
        migrations.AlterField(
            model_name='routes',
            name='image',
            field=models.ImageField(default='0', help_text='Главная фотка маршрута', upload_to='static/images/'),
        ),
    ]