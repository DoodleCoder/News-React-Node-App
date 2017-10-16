# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-12 18:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('KMS', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='avotes',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='comment',
            name='cvotes',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='qvotes',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]