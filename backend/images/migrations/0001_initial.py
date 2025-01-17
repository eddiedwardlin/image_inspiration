# Generated by Django 5.1.5 on 2025-01-17 13:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageQuery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('query', models.CharField(max_length=100)),
                ('likes', models.JSONField(blank=True, default=list)),
                ('dislikes', models.JSONField(blank=True, default=list)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_image', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]