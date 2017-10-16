# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-09-22 17:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('KMS', '0016_profile_profilepic'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='numAns',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile',
            name='numQues',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profilePic',
            field=models.ImageField(default='KMS/static/images/demo/avatar.png', upload_to='KMS/static/images/demo/'),
        ),
    ]
