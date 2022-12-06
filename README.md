# CIVAM

## Description

A Django website with an Angular frontend serving as a virtual archive and museum showcasing Crow Indian cultural items.
URL: https://civam-mt.org/home

## Table of Contents
- [CIVAM](#civam)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [General Instructions](#general-instructions)
  - [Local Environment Setup](#local-environment-setup)
    - [git](#git)
    - [Angular / Django Local Setup and Deployment](#angular--django-local-setup-and-deployment)
  - [Version Control Strategy](#version-control-strategy)
    - [Updating a Feature Branch](#updating-a-feature-branch)
    - [Commit Strategy](#commit-strategy)
  - [Production Deployment Instructions](#production-deployment-instructions)
  - [Various Data Backup and Restore Procedures](#various-data-backup-and-restore-procedures)
    - [BACKING UP AWS DATABASE CONTENT](#backing-up-aws-database-content)
    - [SETTING UP LOCAL DATABASE WITH CONTENT](#setting-up-local-database-with-content)
  - [Resources](#resources)
    - [Google Map Information and Data Flow](#google-map-information-and-data-flow)
    - [RClone Media Backup](#rclone-media-backup)
    - [Restarting the AWS Server](#restarting-the-aws-server)
    - [CIVAM Google Drive Folder](#civam-google-drive-folder)

## General Instructions
* All python commands should be run in in the `django_project` folder.
* All ng commands should be run in the `angular-frontend` folder.
* You must install all required packages and modules before you can run the site locally.
* This project is designed to work well with Linux or WSL. If you are running MacOS, consider loading an Ubuntu VM or dual-boot to Linux. Nobody has worked on this project using MacOS to our knowledge becuase the setup is tricky.

## Local Environment Setup

### git
* After cloning the repository, edit .git/info/exclude
* Add the following to this file:

```
django_project/project/settings.py 
django_project/dump.json 
django_project/civam/package-lock.json
```

* After setting everything else up, if you run `git status` and see any of the above files, run `git update-index --assume-unchanged [<file> ...]` for each file. 
* These files will be modified for local development, but should not be changed on the server unless absolutely necessary.

### Angular / Django Local Setup and Deployment
See instructions [here](docs/LOCAL_SETUP.md).

## Version Control Strategy

For submitting patches and additions, this project uses the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine from YOUR fork on github. `git clone <url from your fork>` then 
 change into the new directory.
 3. **Set Upstream** do `git remote add upstream <url from upstream fork>`
 4. **Make new branch** for YOUR code submission; do `git checkout -b <whatever you want to name this branch>`
 5. **Commit** changes to your *new* branch,  with descriptive message containing issue number
 6. **Push** your work back up to your fork `git push -u origin <your branch name>`
 7. **On Github** Submit a **Pull request** so that the group can review your changes

NOTE: Be sure to rebase your feature branch on latest changes from "upstream"
before making a pull request!

**All conflicts should be resolved locally, then rebased and pushed to github.**

To sync your `master` branch before starting to code, do:
 1. `git checkout master`
 2. `git fetch --all`
 3. `git pull upstream master`
 4. `git push` - this syncs your fork on github.
 5. Start on #4 above to begin a new contribution.

[Here is a great cheatsheet for git/github.](https://education.github.com/git-cheat-sheet-education.pdf)

[Here is another article that describes this exact workflow, in more detail.](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)

### Updating a Feature Branch

```
git fetch
git checkout <originbranch>
git pull
git checkout <featurebranch>
git rebase <originbranch>
```

* If there are any merge conficts: fix them, add, and commit changes.
* Follow prompts from git.

### Commit Strategy

**Consider: one issue == one commit == one pull request.**

This strategy (atomicity) ensures that changes can be traced back to discussions about them.

Read [this](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html) article to learn about how to rebase your commit history and keep it clean.

Pull requests that do not meet this standard should not be merged.

## Production Deployment Instructions
1. Navigate to `CISC475` directory on server.
2. Stash any modified files on server: `git stash`
3. Pull latest changes from your repo: `git pull`
4. Pop stashed files: `git stash pop`
5. If there are changes in Angular:
    1. `cd  ~/CISC475_D5/angular-frontend`
    2. `ng build --prod`
    3. Then copy generated files: `sudo cp -r /home/ubuntu/CISC475_D5/angular-frontend/dist/angular-frontend/* /var/www/html/`
 1. If there are changes to tables in django:
    1. `cd ~/CISC475_D5/django_project`
    2. Prepare migration files: `python3 manage.py makemigrations`
    3. Migrate table changes to postgres: `python3 manage.py migrate`
    4. Restart apache: `sudo service apache2 restart`

## Various Data Backup and Restore Procedures

### BACKING UP AWS DATABASE CONTENT

[This](docs/AWS_DB_BACKUP_AND_RESTORE.md) document explains how to back up the database content only (no media).

### SETTING UP LOCAL DATABASE WITH CONTENT

[Here](docs/LOCAL_DB_RESTORE.md) is how you can set up your local environment with data from the site.

## Resources

### Admin Site

[This](https://civam-mt.org:8000/admin/) webpage holds the actual content displayed on CIVAM. Credentials are on the google drive.

### Google Map Information and Data Flow

[This](docs/map_info.md) document details the nuances of the Google map that is used in the CIVAM site.

### RClone Media Backup

[This](docs/rclone_instructions.md) document details the RClone media backup procedure.

### Restarting the AWS Server

In case you need it, [here](docs/RESTART_INSTANCE.md) are details about restarting the AWS server.

### CIVAM Google Drive Folder
Website Information Folder: https://drive.google.com/drive/u/1/folders/1kLZumZYjkP4IBg42w1kuQPbsW9XPwnIJ?ths=true
