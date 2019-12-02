# CIVAM
## Description
Python Version: 3.6.8

A Django website serving as a virtual archive and museum showcasing Crow Indian cultural items.

## Project Setup
### Install Required Programs for Django: Python and Postgresql
Run `sudo apt-get install python-pip python-dev libpq-dev postgresql postgresql-contrib`

### Postgresql Setup
* `sudo su - postgres`
* `psql`
* `CREATE DATABASE django_db;`
* `CREATE USER django_user WITH PASSWORD 'password';`
* `ALTER ROLE django_user SET client_encoding TO 'utf8';`
* `ALTER ROLE django_user SET default_transaction_isolation TO 'read committed';`
* `ALTER ROLE django_user SET timezone TO 'UTC';`
* `GRANT ALL PRIVILEGES ON DATABASE django_db TO django_user;`
* `\q`
* `exit`

### Python Requirements
* `pip install -r requirements.txt`

### Migrate Models
* `python manage.py makemigrations`
* `python manage.py migrate`

### Create Superuser for Admin Portal
* `python manage.py createsuperuser`;

### Run Project
* `python manage.py runserver`

## Development Instructions
### Reset Civam Migrations: Recreates Postgresql Tables (THIS WILL DELETE ALL CIVAM OBJECTS IN THE DATABASE)
#### Delete all files in civam/migrations/ execpt for __init__.py
* `rm !(__init__.py)`

#### Clean up postgresql database
* `sudo -i -u postgres`
* `psql`
* `\c django_db`
* `DROP TABLE civam_collection, civam_image, civam_item, civam_story, civam_video, civam_collectiongroup;`
* `delete from django_migrations where app='civam';`

#### Migrate
* `python manage.py makemigrations civam`
* `python manage.py migrate civam`


