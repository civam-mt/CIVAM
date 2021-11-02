# BACKING UP AWS DATABASE CONTENT

Note: This section of the notes refers to backing up the Postgresql database on for the running CIVAM instance on AWS.
The backup file is created using the command `pg_dump` under the user Postgresql.

Terms:
* database (DB)
* primary key (PK)
* foreign key (FK)
* pem key (PEM): Private key used to remotely connect to the server

## BACKING UP THE DB MANUALLY

1. Connect to the server via ssh: `ssh -i <<PEM Location>> ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com`  

Example:

```
ssh -i CISC475_PEMS/civam-new.pem ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com
```

2. Restart Postgresql: `sudo service postgresql restart`  
3. Change to postgres user: `sudo -i -u postgres`    
4. Dump the current database into a .sql file: `pg_dump <<db_name>> > <<db_backup_file>>`  
5. Exit out of postgres user `exit`  
6. Copy the file to backup storage: `sudo cp /var/lib/postgresql/<<db_backup_file>> /home/ubuntu/db-backups/DBFullBackups`  

## BACKING UP THE DB VIA SCRIPT

1. Connect to the server via ssh: `ssh -i <<PEM Location>> ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com`  

Example:

```
ssh -i CISC475_PEMS/civam-new.pem ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com
```

2. Change location to utils: `cd /home/ubuntu/CISC475_D5/utils`  
3. Run script: `./backupDBScript.sh`  
4. Change location to check for file creation: `cd /home/ubuntu/db-backups/DBFullBackups`  
5. Check last created file to ensure it was generated - check for todays date: `ls -At | head -n 1`  

# RESTORING AWS DATABASE CONTENT

Note: This section of the notes refers to restoring Postgresql database on for the running CIVAM instance on AWS.
THIS WILL CAUSE DATA LOSS!!!!! ENSURE THE BACKUP FILE IS VALID BEFORE FOLLOWING COMMANDS BELOW!

Terms:
* database (DB)
* primary key (PK)
* foreign key (FK)

1. Connect to the server via ssh: `ssh -i <<PEM Location>> ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com`  

Example:

```
ssh -i CISC475_PEMS/civam-new.pem ubuntu@ec2-18-117-86-189.us-east-2.compute.amazonaws.com
```

2. Restart Postgresql: `sudo service postgresql restart`  
3. Change to postgres user: `sudo -i -u postgres`    
4. Log into database: `psql`    
5. Drop current Django DB (django_db): `DROP DATABASE django_db;` (WARNING: THIS WILL CAUSE DATA LOSS FROM DROPPING THE DB)    
6. Make new Django DB (django_db): `CREATE DATABASE django_db;`    
7. Log out of DB: `exit`
8. Reload db with: `psql <<Db_name>> < <<db_restore_script_file>>`    

Example:  

```
psql django_db < db_backup_10_24_2021   
```

This will open up psql and recreate all data and relationships within the DB (Tables, Indexes, Sequences, PK/FK, etc in the DB).  

9. Exit out of postgres user: `exit`

NOTE:The commands below propagate changes made to your models (adding a field, deleting a model, etc.)
into your database schema, from the state of the backup you are restoring.  
    
10. From `CIVAM/django_project/civam/migrations` run: `rm !(__init__.py)` (Ignore error: 'cannot remove pycache: Is a directory')    
11. From `CIVAM/django_project` run to make new data show up on site: `python3 manage.py makemigrations` then run: `python3 manage.py migrate`    

NOTE: After these commands are run the
civam site should be rebuilt to ensure changes are deployed and effective.


