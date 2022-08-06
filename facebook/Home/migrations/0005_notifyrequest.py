# Generated by Django 4.0.6 on 2022-08-05 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0004_alter_commentsshares_post'),
    ]

    operations = [
        migrations.CreateModel(
            name='NotifyRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('seen', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_sender_NotifyRequest', to='Home.useraccount')),
                ('user_receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_receiver_NotifyRequest', to='Home.useraccount')),
            ],
        ),
    ]
