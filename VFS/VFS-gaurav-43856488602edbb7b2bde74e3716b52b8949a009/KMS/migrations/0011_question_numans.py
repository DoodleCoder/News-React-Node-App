# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-09-21 17:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('KMS', '0010_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='numAns',
            field=models.IntegerField(default=0),
        ),
    ]
