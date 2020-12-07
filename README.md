# CIVAM
## Description
* Django Version: 2.2.6
* Python Version: 3.6.8
* Angular Version: 10.2.0

A Django website with an Angular frontend serving as a virtual archive and museum showcasing Crow Indian cultural items.

### General Instructions
* All python commands should be run in in the *django_project* folder.
* All ng commands should be run in the *angular-frontend* folder. Individual site components are within */src/app/*
* You must install all required packages and modules before you can run the site locally.
* This project is designed to work well with Linux or WSL. If you are running MacOS, consider loading an Ubuntu VM or dual-boot to Linux. Nobody has worked on this project using MacOS to our knowledge becuase the setup is tricky.
* VSCode is a great editor to use for the project!

---

# Starting Place For Working on the Project - Initial Steps
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
* `\c django_db`
* `CREATE EXTENSION pg_trgm;`
* `SET pg_trgm.similarity_threshold = .2;`
* `\q`
* `exit`

### Python Requirements
* `cd project`
* `pip3 install -r requirements.txt`
* Some people may have trouble installing Pillow from `requirements.txt`. Try this command instead: `sudo apt install libjpeg8-dev zlib1g-dev`

## Allow Outside Hosts
* `vim settings.py`
* Find ALLOWED_HOSTS and fill it in with all the urls that the site will be referenced as (IP address, url, etc.)
* Click esc and :wq to exit
* Our group found that adding `'*'` to ALLOWED_HOSTS was necessary to run in development mode locally (do not add this on the server code)

### Migrate Models
* `cd ..`
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

### Create Superuser for Admin Portal
* `python3 manage.py createsuperuser`

### Run Project
* `python3 manage.py runserver`
* Navigate to http://127.0.0.1:8000/ to view the admin portal

---

## Frontend Project Setup
### Install NodeJS (npm) and Angular (ng) dependencies
* `cd angular-frontend`
* Install NodeJS
   * For Ubuntu or WSL https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/ 
* Put npm PATH in manually: `usr/bin/npm`
   * Option 1: Add the alias to your .bash_profile
   * Option 2: Put it in your Environment Variables under System Properties
* `sudo npm install -g @angular/cli`
* (Here is the Angular docs for reference: https://angular.io/cli)
* `cd angular-frontend`
* `npm install`
* `npm install jwt-decode --save`

### Build project
* `ng build`
* `ng serve --host 0.0.0.0`
* Navigate to http://127.0.0.1:4200/ to view the frontend site

# To Run Site Locally
* `cd django_project`
* `sudo service postgresql start` 
* `python3 manage.py runserver`
* `cd ../angular-frontend`
* `ng build`
* `ng serve`
* Backend: http://127.0.0.1:8000/admin
* Frontend: http://127.0.0.1:4200/
* If you encounter errors where your locally served website does not update as changes are made in the code (without re-serving), run `ng serve --poll=2000` during the steps above
* An easier way to load the frontend and backend site locally is to run `./run.sh` in the CISC475_D5 directory. It will take care of everything for you.

---

## Resources
From the CIVAM Google Drive Folder (get access from Cindy Ott)
* Website Information Folder: https://drive.google.com/drive/u/1/folders/1kLZumZYjkP4IBg42w1kuQPbsW9XPwnIJ?ths=true

From our team

---

## Some Helpful Git Commands
### Rebasing Instructions
* Be sure to add and commmit all changes to your branch.
* Do the following where originbranch is the branch you want to rebase onto and featurebranch is the branch with your changes.
```
git fetch
git checkout <originbranch>
git pull
git checkout <featurebranch>
git rebase <originbranch>
```
* If there are any merge conficts: fix them, add, and commit changes.
* Then run the following
```
git rebase --continue
```
* Repeat this with any other merge conflicts keeping in mind that this is applying each one of your commits to the originbranch one at a time. 
* When finished with all merge conflicts push your changes (Make sure you are on your feature branch).
```
git push
```
### To get a deleted file back
* First find the last commit that edited that file and note the first few characters in the hash.
```
git log -- <filename>
```
* Then checkout that file from one commit before the last change (your deletion).
```
git checkout <deletion commit hash>~1 -- <filename>
```
### To revert changes to a file
* First find the commit you wish to revert to and note the first few characters in the hash.
* The following will get commits that edited the file.
```
git log -- <filename>
```
* Then checkout from the commit with the version of the file you want.
```
git checkout <desired version commit hash> <filename>
```

---

# Backend Development & Cleaning Instructions
## Reset Civam Migrations: Recreates Postgresql Tables (THIS WILL DELETE ALL CIVAM OBJECTS IN THE DATABASE)
### Delete all files in civam/migrations/ execpt for __init__.py
* `cd django_project/civam/migrations`
* Make SURE you are in the right directory before running the command below
* `rm !(__init__.py)`

####Clean up postgresql database
* `sudo service postgresql start`
* `sudo -i -u postgres`
* `psql`
* `\c django_db`
* `select 'drop table if exists "' || tablename || '" cascade;' from pg_tables where tablename like 'civam%';`
* Copy queries resturned from above command, paste, and run
* `delete from django_migrations where app='civam';`
* `\q`
* `exit`

### Migrate
* `cd ../..`
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`

### General Advice
* Always run postgresql service before migrating or running django
* Any errors that mention port5432 or errors in python installation directories are likely caused by postgresql service not being run
* If you get this warning: “Your global Angular CLI version (#.#.#) is greater than your local version (#.#.#). The local Angular CLI version is used” then run: `npm install --save-dev @angular/cli@latest`
* If you have problems with migrations locally, follow the Backend Dev & Cleaning Instructions
* To stop the frontend's process, run `ps -ef | grep "ng serve"`, find the PID of the process, and run `kill <PID>`.
* To stop the backend's process, run `ps auxw | grep runserver`, find the PID of the process, and run `kill <PID>`.
* The following migration files are not needed for local development and need to be deleted in order to run the site locally:
```
django_project/civam/migrations/0006_auto_20200528_1202.py
django_project/civam/migrations/0007_collection_dates.py 
```

---

## Deployment Instructions and Running on the AWS Server

**NOTE: Our group recorded videos of our deployment process on the AWS server. Check out the videos in the CIVAM Google Drive before attempting. Link: https://drive.google.com/drive/u/1/folders/1kLZumZYjkP4IBg42w1kuQPbsW9XPwnIJ?ths=true.**

* During your first deployment, point the project to your copy of the repository and remove ours.
* Log in, then `cd CISC475_D5`
* Make a copy of the database and store in `db_backups` folder on the server. Follow the instructions in the video linked above.
* Run `git stash` to make sure that you can pull any new changes
* Run `git pull` to make sure that all the new changes are stored
* Run `git stash pop` to get back uncommited files during normal operations of the website (from `civam-env`)
* Go into the angular folder with `cd angular-frontend`
* Run `ng build --prod` to get the updated angular files
* Run `sudo cp -r /home/ubuntu/CISC475_D5/angular-frontend/dist/angular-frontend/* /var/www/html/` to move the updated angular files into the frontend html folder
* Run `ps auxw | grep runserver` to see any instances of the django server running
* If there are any threads running the process `/home/ubuntu/CISC475_D5/civam-env/bin/python3 /home/ubuntu/CISC475_D5/django_project/manage.py runserver 0.0.0.0:8000` then take their thread number and `run sudo kill 1234` (replace 1234 with the thread number)
* Go back to the CISC475_D5 folder and run `source civam-env/bin/activate` so that you’ll be able to run the django commands correctly
* Run `python3 manage.py makemigrations` and `python3 manage.py migrate`. If these don’t work you make have to follow the steps to reset the postgres tables (THIS WILL DELETE ALL ITEMS SO ONLY DO IT IF YOU’VE CHECKED EVERYTHING ELSE)
* Run `python3 manage.py runserver 0.0.0.0:8000` to make sure the server runs. Keep this running when you close the terminal.
* Go to civam-mt.org/home to make sure that collections are loading, and once you’ve confirmed that go into the instance in aws and reboot it, which will allow you to keep the django server running in the background continuously
* Give aws a few minutes to reboot, and if it isn’t working after that, make sure to clear your cache before checking for any further problems

---
# TODO: Tasks Cindy Would Like Done on Website (for a future group)
* Feature Requests: https://docs.google.com/document/d/1X3J5giA5EF_k_V2p0yzFEicePp5NafyklIJ6-EjWne0/edit 
* Be sure to meet with Cindy and discuss requirements before starting
