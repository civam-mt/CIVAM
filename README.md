# CIVAM
## Description
* Django Version: 2.2.6
* Python Version: 3.6.8
* Angular Version: 9.1.3

A Django website with an Angular frontend serving as a virtual archive and museum showcasing Crow Indian cultural items.

### General Instructions
* All python commands should be run in in the *django_project* folder.
* All ng commands should be run in the *angular-frontend* folder. Individual site components are within */src/app/*
* You must install all required packages and modules before you can run the site locally.

# Local Git Setup
* After cloning the repository, edit .git/info/exclude
* Add the following 
```django_project/civam/migrations/ 
django_project/project/settings.py 
django_project/dump.json 
django_project/civam/package-lock.json
```
* After setting everything else up, if you run `git status` and see any of the above files, run `git update-index --assume-unchanged [<file> ...]` for each file. 
* These files will be modified for local development, but should not be changed on the server unless absolutely necessary. 

# To Run Site Locally
* `cd django_project`
* `sudo service postgresql start` 
* `python3 manage.py runserver`
* `cd ../angular-frontend`
* `ng build`
* `ng serve`
* Backend: http://127.0.0.1:8000/admin
* Frontend: http://127.0.0.1:4200/

## Deployment Instructions
* Might need to run `npm rebuild` if deploying on a different OS than currently compiled node_modules
* `ng build --prod`
* `ng add @jefiozie/ngx-aws-deploy`
* TODO: Karl fill in whatever you need to


## Backend Project Setup
### Install Required Programs for Django: Python and Postgresql
* `cd django_project`
* `sudo apt update`
* `sudo apt-get install python3-pip python-dev libpq-dev postgresql postgresql-contrib`

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
* `pip3 install -r requirements.txt`

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
* `cd angular-frontend`
* Install NodeJS
   * For Ubuntu or WSL https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/ 
* Put npm PATH in manually: `usr/bin/npm`
   * Option 1: Add the alias to your .bash_profile
   * Option 2: Put it in your Environment Variables under System Properties
* `sudo npm install -g @angular/cli`
* (Run the npm install commands from here: https://angular.io/cli)
* `cd angular-frontend`
* `npm install`
* `npm install jwt-decode --save`

### Build project
* `ng build`
* `ng serve --host 0.0.0.0`
* Navigate to http://127.0.0.1:4200/ to view the frontend site

## Backend Development & Cleaning Instructions
### Reset Civam Migrations: Recreates Postgresql Tables (THIS WILL DELETE ALL CIVAM OBJECTS IN THE DATABASE)
#### Delete all files in civam/migrations/ execpt for __init__.py
* `cd django_project/civam/migrations`
* Make SURE you are in the right directory before running the command below
* `rm !(__init__.py)`

#### Clean up postgresql database
* `sudo service postgresql start`
* `sudo -i -u postgres`
* `psql`
* `\c django_db`
* `select 'drop table if exists "' || tablename || '" cascade;' from pg_tables where tablename like 'civam%';`
* Copy queries resturned from above command, paste, and run
* `delete from django_migrations where app='civam';`
* `\q`
* `exit`

#### Migrate
* `cd ../..`
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

## General Advice
* Always run postgresql service before migrating or running django
* Any errors that mention port5432 or errors in python installation directories are likely caused by postgresql service not being run
* If you get this warning: “Your global Angular CLI version (#.#.#) is greater than your local version (#.#.#). The local Angular CLI version is used” then run: `npm install --save-dev @angular/cli@latest`
* If you have problems with migrations locally, follow the Backend Dev & Cleaning Instructions

## Running on the AWS Server
* Log in, then `cd CISC475_D5`
* Run `git stash` to make sure that you can pull any new changes
* Run `git pull` to make sure that all the new changes are stored
* Go into the angular folder with `cd angular-frontend`
* Run `ng build --prod` to get the updated angular files
* Run `sudo cp -r /home/ubuntu/CISC475_D5/angular-frontend/dist/angular-frontend/* /var/www/html/` to move the updated angular files into the frontend html folder
* Run `ps auxw | grep runserver` to see any instances of the django server running
* If there are any threads running the process `/home/ubuntu/CISC475_D5/civam-env/bin/python3 /home/ubuntu/CISC475_D5/django_project/manage.py runserver 0.0.0.0:8000` then take their thread number and `run sudo kill 1234` (replace 1234 with the thread number)
* Go back to the CISC475_D5 folder and run `source civam-env/bin/activate` so that you’ll be able to run the django commands correctly
* Once you have done this, press esc and `:wq` to save your changes, `cd ../` to go back to the main django folder
* Run `python3 manage.py makemigrations` and `python3 manage.py migrate`. If these don’t work you make have to follow the steps to reset the postgres tables (THIS WILL DELETE ALL ITEMS SO ONLY DO IT IF YOU’VE CHECKED EVERYTHING ELSE)
* Run `python3 manage.py runserver 0.0.0.0:8000` to make sure the server runs
* Go to civam-mt.org/home to make sure that collections are loading, and once you’ve confirmed that go into the instance in aws and reboot it, which will allow you to keep the django server running in the background continuously
* Give aws a few minutes to reboot, and if it isn’t working after that, make sure to clear your cache before checking for any further problems
