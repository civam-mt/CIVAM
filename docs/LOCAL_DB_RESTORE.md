# SETTING UP LOCAL DATABASE WITH CONTENT #

Note: This is for setting up a local Postgresql database on a developers local running CIVAM site instance.
Primarily, this will be used to ensure the local enviroment is inline with what is running on the current CIVAM site.

Terms:
* database (DB)
* primary key (PK)
* foreign key (FK)

1. Pull backup copy script to recreate the DB from current running instance: `scp -i civam-new.pem ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com:<<SRC>> <<DEST>>`  

Example:

```
scp -i civam-new.pem ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com:~/db-backups/DBFullBackups/db_backup_10_24_2021 .
```


This will pull the file "db_backup_10_24_2021" into the current working directory.  

2. Copy to local postgresql directory: `sudo cp <<CWD> <<../var/lib/postgresql>>`  

Example:  

```
sudo cp db_backup_10_24_2021 /var/lib/postgresql
```

3. Restart Postgresql: `sudo service postgresql restart`  
4. Change to postgres user: `sudo -i -u postgres`    
5. Log into database: `psql`    
6. Drop current Django DB (django_db): `DROP DATABASE django_db;` (WARNING: THIS WILL CAUSE DATA LOSS FROM DROPPING THE DB)    
7. Make new Django DB (django_db): `CREATE DATABASE django_db;`
8. Log out of DB: `exit`    
9. Reload db with: `psql <<Db_name>> < <<db_restore_script_file>>`    

Example:  

```
psql django_db < db_backup_10_24_2021   
```

This will open up psql and recreate all data and relationships within the DB (Tables, Indexes, Sequences, PK/FK, etc in the DB).  

10. Exit out of postgres user: `exit`    
11. From `CIVAM/django_project/civam/migrations` run: `rm !(__init__.py)` (Ignore error: 'cannot remove pycache: Is a directory warning')    
12. From `CIVAM/django_project` run to make new data show up on site: `python3 manage.py makemigrations` then run: `python3 manage.py migrate`    
13. Run local instructions to set up site and check if new items are there:


```
sudo service postgresql start 
python3 manage.py runserver
cd ../angular-frontend
ng build
ng serve
```
