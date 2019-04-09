# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Umbrella(models.Model):
	fold = models.CharField(default='3 FOLD AUTOMATIC',max_length=1000)
	pattern = models.CharField(max_length=1000)
	color = models.CharField(default='GRAY',max_length=1000)
	description = models.CharField(default='Three Fold Automatic Umbrella with Superior Nylon Fabric, Best Quality Frame and Matching Handle.',max_length=1000)
	pic1 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	pic2 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	pic3 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	pic4 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	def __str__(self):
		return " " + self.fold + " " + self.pattern + " " + self.color

class Koko(models.Model):
	fold = models.CharField(default='2 FOLD AUTOMATIC',max_length=1000)
	pattern = models.CharField(max_length=1000)
	color = models.CharField(default='GRAY',max_length=1000)
	description = models.CharField(default='Two Fold Automatic Umbrella with Superior Nylon Fabric, Best Quality Frame and Matching Handle.',max_length=1000)
	pic1 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	pic2 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	pic3 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	pic4 = models.ImageField(upload_to='', default='', max_length=1000, blank=True)
	def __str__(self):
		return " " + self.fold + " " + self.pattern + " " + self.color