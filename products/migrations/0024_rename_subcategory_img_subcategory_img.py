# Generated by Django 3.2.3 on 2021-06-08 01:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0023_alter_order_order_item'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subcategory',
            old_name='subcategory_img',
            new_name='img',
        ),
    ]
