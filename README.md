# CIVAM
## Description
* Python Version: 3.6.8
* Django Version: ???
* Angular Version: 9.1.3

A Django website with an Angular frontend serving as a virtual archive and museum showcasing Crow Indian cultural items.

The Django side is located in the *django_project* folder. This is the folder that all python commands below should be run in.

The Angular side is located in the *angular-frontend* folder. Individual site components are within */src/app/*

Setup instructions are below. You must install all required packages and modules before you can run the site

## Running site locally
* `sudo service postgresql start` 
* In *django_project* folder: `python3 manage.py runserver`
* In *angular-frontend*: `ng build` then `ng serve`
* Backend: http://127.0.0.1:8000/admin
* Frontend: http://127.0.0.1:4200/

## Deployment Instructions
* Might need to run `npm rebuild` if deploying on a different OS than currently compiled node_modules
* `ng build --prod`
* `ng add @jefiozie/ngx-aws-deploy`
* TODO: Karl fill in whatever you need to


## Backend Project Setup
### Install Required Programs for Django: Python and Postgresql

Make sure you are in the *django_project* folder.

If needed, run `sudo apt update`

Then run `sudo apt-get install python-pip3 python-dev libpq-dev postgresql postgresql-contrib`

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

## Allow Outside Hosts
* `vim settings.py`
* Find ALLOWED_HOSTS and fill it in with all the urls that the site will be referenced as (IP address, url, etc.)
* Put this line at the bottom: `STATIC_ROOT = os.path.join('~/CISC475_D5/django_project', 'static/')`
* Click esc and :wq to exit

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
### Install NodeJS (npm) and Angular (ng) dependencies
* Run these commands in the main directory (one level above django_project)
* Install NodeJS
   * For Ubuntu or WSL https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/ 
* Put npm PATH in manually: `usr/bin/npm`
   * Option 1: Add the alias to your .bash_profile
   * Option 2: Put it in your Environment Variables under System Properties
* Run `sudo npm install -g @angular/cli`
* (Run the npm install commands from here: https://angular.io/cli)
* `cd angular-frontend`
* `npm install`
* `npm install jwt-decode --save`

### Angular config
* If you get this warning: “Your global Angular CLI version (#.#.#) is greater than your local version (#.#.#). The local Angular CLI version is used” then run: `npm install --save-dev @angular/cli@latest`

### Build project
* `ng build`
* `ng serve --host 0.0.0.0`
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


