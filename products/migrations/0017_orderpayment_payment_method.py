# Generated by Django 3.2.3 on 2021-05-27 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0016_alter_product_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderpayment',
            name='payment_method',
            field=models.CharField(default='COD', max_length=20),
            preserve_default=False,
        ),
    ]
