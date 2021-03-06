# Generated by Django 3.2.3 on 2021-05-19 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_image',
            field=models.ImageField(blank=True, default='default.png', null=True, upload_to='product/'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='subcategory_img',
            field=models.ImageField(blank=True, default='default.png', null=True, upload_to='category/'),
        ),
    ]
