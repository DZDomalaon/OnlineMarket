# Generated by Django 3.2.3 on 2021-06-08 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0022_auto_20210607_0738'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_item',
            field=models.ManyToManyField(related_name='order', to='products.OrderItem'),
        ),
    ]
