# Generated by Django 4.1.2 on 2023-05-01 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteMap', '0058_delete_comments'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(help_text='Пользователь, который добавил коммент', max_length=100, unique=True)),
                ('comments', models.CharField(default='0', help_text='Комментарий', max_length=500)),
                ('place_id', models.IntegerField(help_text='индекс комментируемого места')),
            ],
            options={
                'verbose_name': 'Комментарий',
                'verbose_name_plural': 'Комментарии',
                'ordering': ['user'],
            },
        ),
    ]
