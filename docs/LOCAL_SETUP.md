# Local Installation and Local Deployment
## Intro
The idea is to set this project up in a VM so that we have 
consistent build environments and simple instructions to get everything up 
and running for anyone. I've included version numbers where I think they 
may be helpful in the future.

Note that [General Setup](#General-Setup), [Front-End Specific Setup](#Front-End-Specific-Setup), and [Back-end Specific Setup](#Back-End-Specific-Setup) sections should be completed sequentially, and only should only have to be done once. Then, you can reference the [Local Deployment](#Local-Deployment) section whenever you need to deploy the site locally.

**DO NOT BLINDLY RUN THESE COMMANDS - IF YOU DON'T KNOW WHAT SOMETHING DOES, GOOGLE IT**

## General Setup
**Steps 4-7 are for installing VBox guest additions and are optional. This will give you access to quality of life changes such as full-screen display, host-to-guest copy paste, and more.**
1. download virtualbox for your OS
2. install xubuntu (20.04.3) (this will be a torrent file, you can download these types of files in a client such as qBittorrent)
3. open virtualbox and create a new virtual machine, using the downloaded file as the ISO image  
4. in the virtualbox window, select Devices -> Insert Guest Additions CD Image
5. open the virtual machine's file explorer, and select the CD "VBox_GAs"
6. find the VBoxLinuxAdditions.run file, right click it, and select "Open Terminal Here"
7. `sudo VBoxLinuxAdditions.run`
8. `sudo reboot`
9. install dependencies:
    ```bash
    sudo apt install git curl python3-pip python-dev libpq-dev postgresql postgresql-contrib
    ```
10. install latest version of nodejs and npm:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

## Front-End Specific Setup
1. install npm: `sudo npm install -g npm@latest`
2. install angular-cli: `sudo npm install -g @angular/cli`
3. install nvm version manager: `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`
4. Open a new terminal, you must do this in order to proceed.
5. install project version: `nvm install 12.20` - this can be verified with `ng --version`
6. set up a directory and clone your fork of the repo
7. cd into `CIVAM/angular-frontend`
8. install all dependencies: `npm install --legacy-peer-deps`
9. few more: `npm install jwt-decode ngx-audio-player --save`
10. `npm install jwt-decode ng2-pdf-viewer@^7.0.0 --save`


## Back-End Specific Setup
1. cd into `django_project`
2. start postgresql service and switch user to `postgres`, then open postgres terminal (`psql`): 
    ```bash
    sudo service postgresql start && sudo su - postgres
    psql
    ```

3. run in `psql` terminal:
    ```psql
     CREATE DATABASE django_db;
     CREATE USER django_user WITH PASSWORD 'password';
     ALTER ROLE django_user SET client_encoding TO 'utf8';
     ALTER ROLE django_user SET default_transaction_isolation TO 'read     committed';
     ALTER ROLE django_user SET timezone TO 'UTC';
     GRANT ALL PRIVILEGES ON DATABASE django_db TO django_user;
     \c django_db
     CREATE EXTENSION pg_trgm;
     SET pg_trgm.similarity_threshold = .2;
     \q
    ```

4.  run `exit` to logoff as user `postgres`

5. Install python dependencies:
    ```bash
    cd project
    pip3 install -r requirements.txt
    ```
6. Modify `settings.py` **for local development only**:
Change (uncomment) the following lines:
    ```py
    # UNCOMMENT FOLLOWING 2 LINES FOR LOCAL DEVELOPMENT ONLY!!!!
    #ALLOWED_HOSTS = ['198.211.99.20', 'localhost:8000', '127.0.0.1',     'civam-mt.org','localhost:4200', "*"]
    #STATIC_ROOT = os.path.join('~/CIVAM/django_project', 'static/')
    ```

    to

    ```py
    # UNCOMMENT FOLLOWING 2 LINES FOR LOCAL DEVELOPMENT ONLY!!!!
    ALLOWED_HOSTS = ['198.211.99.20', 'localhost:8000', '127.0.0.1', 'civam-mt.    org','localhost:4200', "*"]
    STATIC_ROOT = os.path.join('~/CIVAM/django_project', 'static/')')
    ```
    
    Then comment out:
    ```
    STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
    ```

7. Migrate django models to postgres database - read more at https://docs.djangoproject.com/en/3.2/topics/migrations/ . No really, go read about this so that you understand it, then come back and run:

    ```bash
    cd django_project
    python3 manage.py makemigrations
    python3 manage.py migrate
    ```

## Local Deployment

From `CIVAM/django_project`, run:

```bash
 sudo service postgresql start 
 python3 manage.py runserver
 cd ../angular-frontend
 ng build
 ng serve
```
* Backend link: http://127.0.0.1:8000/admin
* Frontend link: http://127.0.0.1:4200/
* If you encounter errors where your locally served website does not update as changes are made in the code (without re-serving), run `ng serve --poll=2000` during the steps above

#### Notes from legacy README regarding local deployment, **take with a grain of salt**: 
* An easier way to load the frontend and backend site locally is to run `./run.sh` in the CISC475_D5 directory. It will take care of everything for you.
* When running the front and backend of the project locally with a copy of the database, the collection images will show up as black squares. Don't fear though as this is normal. The URL for the images changes since you will be running on localhost. If you want to see how things react with actual images, you can go to the django admin site http://127.0.0.1:8000/admin and create your own user and add some test collection data.

---------------------------------
### General notes from legacy README, **take with a grain of salt**:
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

