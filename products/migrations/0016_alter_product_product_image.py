# Generated by Django 3.2.3 on 2021-05-26 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_alter_product_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_image',
            field=models.ImageField(default='product/default.png', upload_to='product/'),
        ),
    ]