# CIVAM
## Description
Python Version: 3.6.8

A Django website serving as a virtual archive and museum showcasing Crow Indian cultural items.

The Django project is located in the *django_project* folder. This is the folder that all python commands below should be run in.

## Project Setup
### Install Required Programs for Django: Python and Postgresql

Make sure you are in the *django_project* folder.

If needed, run `sudo apt update`

Then run `sudo apt-get install python-pip python-dev libpq-dev postgresql postgresql-contrib`

### Postgresql Setup
* `sudo service postgresql start` 
* `sudo su - postgres` Opens a postgres terminal
* `psql` Opens a postgres database terminal
* `CREATE DATABASE django_db;`
* `CREATE USER django_user WITH PASSWORD 'password';`
* `ALTER ROLE django_user SET client_encoding TO 'utf8';`
* `ALTER ROLE django_user SET default_transaction_isolation TO 'read committed';`
* `ALTER ROLE django_user SET timezone TO 'UTC';`
* `GRANT ALL PRIVILEGES ON DATABASE django_db TO django_user;`
* `\q`
* `exit`

### Python Requirements
* `cd project`
* Run `pip3 install -r requirements.txt`

### Migrate Models
* `cd ..`
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

### Create Superuser for Admin Portal
* `python3 manage.py createsuperuser`;

### Run Project
* `python3 manage.py runserver`
* Navigate to http://127.0.0.1:8000/ to view the site

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
* `\q`
* `exit`

#### Migrate
* `python3 manage.py makemigrations civam`
* `python3 manage.py migrate civam`


