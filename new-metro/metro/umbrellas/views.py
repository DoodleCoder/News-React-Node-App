# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
import random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from smtplib import SMTPException

# Create your views here.

def index(request):
	umbs = Umbrella.objects.order_by('?')
	b = 'e'
	context = {
		'umbs': umbs[:6],
		'b': b, 
	}

	return render(request,'index.html', context)

def base(request):
	return render(request, 'base.html')

def elephant(request):
	ele_umb = Umbrella.objects.order_by('?')
	for i in ele_umb:
		i.fold = i.fold.replace('AUTOMATIC','')
		if '2' in i.fold:
			i.dataclass='2FA'
		else:
			i.dataclass='3FA'
	brand = 'Elephant'
	b = 'e'
	context = {
		'items': ele_umb,
		'brand': brand,
		'b': b
	}	
	print(context)
	return render(request, 'brand.html', context)

def koko(request):
	koko_umb = Koko.objects.order_by('?')
	# for i in koko_umb:
	# 	i.fold = i.fold.replace('AUTOMATIC','')
	# 	if '2' in i.fold:
	# 		i.dataclass='2FA'
	# 	else:
	# 		i.dataclass='3FA'
	brand = 'Koko'
	b = 'k'
	context = {
		'items': koko_umb,
		'b': b,
		'brand': brand,
	}	
	return render(request, 'brand.html', context)

def product(request, product_id):
	b = product_id[-1]
	product_id = int(product_id[:-1])
	if b == 'e':
		product = Umbrella.objects.get(id=product_id)
		related = []
		same_pattern = Umbrella.objects.filter(fold__icontains=product.fold,pattern__icontains=product.pattern)
		same_color = Umbrella.objects.filter(fold=product.color)
		brand = 'Elephant'
		for i in same_pattern:
			related.append(i)
		for i in same_color:
			if i not in related:
				related.append(i)
		related.remove(product)
		print(related)
		context = {
			'product': product,
			'brand': brand,
			'related': related[:3],
		}
	else:
		product = Koko.objects.get(id=product_id)
		brand = 'KoKo'
		related = []
		same_pattern = Umbrella.objects.filter(fold__icontains=product.fold,pattern__icontains=product.pattern)
		same_color = Umbrella.objects.filter(fold=product.color)

		for i in same_pattern:
			related.append(i)
		for i in same_color:
			if i not in related:
				related.append(i)
		related.remove(product)
		print(related)
		context = {
			'brand': brand,
			'product': product,
			'related': related[:3],
		}
	return render(request, 'product.html', context)

def contact(request):
	if request.method == 'POST':
		name = request.POST['name']
		subject = request.POST['subject']
		fromaddr = request.POST['email']
		body = request.POST['body']
		toaddr = 'metroumbrella@gmail.com'
		msg = MIMEMultipart()
		msg['From'] = fromaddr
		msg['To'] = toaddr
		msg['Subject'] = subject
		body = body + " - from " + fromaddr
		msg.attach(MIMEText(body, 'plain'))
		server = smtplib.SMTP('smtp.gmail.com', 587)
		server.ehlo()
		server.starttls()
		server.ehlo()
		server.login("metroumbrellaserver@gmail.com", "KuGaAsBh")
		text = msg.as_string()
		server.sendmail(fromaddr, toaddr, text)
		server.quit()

		
	return render(request, 'contact.html')

def brochure(request):
	with open('brochure.pdf', 'rb') as pdf:
		response = HttpResponse(pdf.read(), content_type='application/pdf')
		# response['Content-Disposition'] = 'inline;filename=some_file.pdf'
		return response

from django.db.models import Q

def search(request):
	if request.method == 'POST':
		q = request.POST['s']
		q_fold = Q()
		q_pattern = Q()
		q_color = Q()
		ele_fold = []		
		ele_pattern = []		
		ele_color = []
		koko_fold = []		
		koko_pattern = []		
		koko_color = []
		q_color = q_color | Q(color__contains=q)		
		q_fold = q_fold | Q(fold__contains=q)		
		q_pattern = q_pattern | Q(pattern__contains=q)	

		ele = Umbrella.objects.filter(q_color | q_pattern | q_fold)
		koko = Koko.objects.filter(q_color | q_pattern | q_fold)

		context = {
		'q':q,
		'koko': koko,
		'ele': ele,
		}

		print(context)

	return render(request, 'search.html',context)
