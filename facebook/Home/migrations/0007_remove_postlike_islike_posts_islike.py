# Generated by Django 4.0.6 on 2022-07-24 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0006_remove_posts_like_postlike_islike'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postlike',
            name='islike',
        ),
        migrations.AddField(
            model_name='posts',
            name='islike',
            field=models.BooleanField(default=False),
        ),
    ]