# CIVAM

### Postgresql Install
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


