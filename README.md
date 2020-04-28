# CIVAM
## Description
* Python Version: 3.6.8
* Django Version: ???
* Angular Version: 9.1.3

A Django website with an Angular frontend serving as a virtual archive and museum showcasing Crow Indian cultural items.

The Django side is located in the *django_project* folder. This is the folder that all python commands below should be run in.
The Angular side is located in the *angular-frontend* folder.

## Backend Project Setup
### Install Required Programs for Django: Python and Postgresql
If needed, run `sudo apt update`

Then run `sudo apt-get install python-pip python-dev libpq-dev postgresql postgresql-contrib`

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
* `cd projects`
* Run `pip3 install -r requirements.txt`

### Migrate Models
* `cd ..`
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

### Create Superuser for Admin Portal
* `python3 manage.py createsuperuser`

### Run Project
* `python3 manage.py runserver`
* Navigate to http://127.0.0.1:8000/ to view the admin portal


## Frontend Project Setup
### Install NodeJS (npm) and ng
* Install NodeJS
   * For Ubuntu or WSL https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/ 
* Put npm PATH in manually: `usr/bin/npm`
   * Option 1: Add the alias to your .bash_profile
   * Option 2: Put it in your Environment Variables under System Properties
* Run the npm install commands from here: https://angular.io/cli 
* `cd angular-frontend`
* `npm install`
* `npm install jwt-decode --save`

### Angular config
* If you get this warning: “Your global Angular CLI version (#.#.#) is greater than your local version (#.#.#). The local Angular CLI version is used” then run: `npm install --save-dev @angular/cli@latest`

###
* `ng serve`
* Navigate to http://127.0.0.1:4200/ to view the frontend site

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


