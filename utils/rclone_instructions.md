# Instructions for Setting up Rclone

## Check if rclone is installed on server

* Check if rclone is installed: `rclone config`
* If rclone is installed proceed to section: [Using rclone config To Set Up a Connection](#Using-rclone-config-to-Set-Up-a-Connection)
* Otherwise, proceed with instructions below.
* Install rclone using: `curl https://rclone.org/install.sh | sudo bash`

### What Rclone Config Does
* `rclone config` is a feature that will allow a developer to connnect to many different types of remotes to save data, media, etc. 
  In this instance, we will be using a Google Drive.

* Rclone syncs a directory tree from one storage system to another.
* Source and destination paths are specified by the name you gave the storage system in the config file then the sub path, e.g. `drive:myfolder` to look at "myfolder" in Google drive. This is done within the base script `media_backup.sh`, e.g. **media-backup-google-drive:media-backup**

## Using rclone config to Set Up a Connection 

* Once installed use the command `rclone config` this will give you options to edit existing remotes, create new, delete remotes, rename, etc.

## Creating a New Rclone Remote

1. Type in `rclone config`

2. An example of what will show:
    ``` 
    Current remotes:

    Name                 Type
    ====                 ====
    google-drive-udel    drive
    media-backup-google-drive drive

    e) Edit existing remote
    n) New remote
    d) Delete remote
    r) Rename remote
    c) Copy remote
    s) Set configuration password
    q) Quit config
    e/n/d/r/c/s/q> 
    ```
3. Choose option `n` for creating a new remote

4. `name>` will appear and enter the name of the remote.

5. After this, a list of different storage types will appear. Choose `Google Drive "drive"`

6. `client_id>` will appear press enter to use the default internal key.

7. `client_secret>` will appear press enter to use the default.

8. After this an option to choose a scope will appear. It would look like this: 
    ```
    Scope that rclone should use when requesting access from drive.
    Enter a string value. Press Enter for the default ("").
    Choose a number from below, or type in your own value
    1 / Full access all files, excluding Application Data Folder.
      \ "drive"
    2  / Read-only access to file metadata and file contents.
      \ "drive.readonly"
      / Access to files created by rclone only.
    3 | These are visible in the drive website.
      | File authorization is revoked when the user deauthorizes the app.
   \ "drive.file"
   / Allows read and write access to the Application Data folder.
    4  | This is not visible in the drive website.
        \ "drive.appfolder"
        /  Allows read-only access to file metadata but
    5 | does not allow any access to read or download file content.
      \ "drive.metadata.readonly" 
      ```
    * Use option 1.

9. Option `root_folder_id>` press enter to use the default option.

10. Option `service_account_file` press enter to use the default option.

11. Option `Edit advanced config` press enter.

12. Option `auto config` enter `yes` if you are testing this locally and `no` if you are using a headless machine (SSH on server).

13. Choosing the option `yes` will result in: 

    ```
    2021/11/10 18:14:39 NOTICE: If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth?state=IIUN9vgMEN3FvWjdpTSkow

    2021/11/10 18:14:39 NOTICE: Log in and authorize rclone for access

    2021/11/10 18:14:39 NOTICE: Waiting for code...
    ```
      This will open a browser and you will choose the Google account you wish to use.

14. Choosing the option `no` will result in:

    ```
    Option config_verification_code.
    Verification code
    Go to this URL, authenticate then paste the code here.
    https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=202264815644.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&state=GusipGp9P8xmabEmW7EPFg
    Enter a string value. Press Enter for the default ("").
    config_verification_code> 
    ```
    This is similar to **13** above. However, this will not pop out a browser. Instead, you will need to go to the link rclone provides, copy the code given, and paste it into terminal for verification.

15. Option `Shared Drive` enter `no`.

16. Now okay your new remote. Store Credentials in: [Future Google Accounts](#Future-Google-Accounts)

## Credentials for Google Account

* Store future Google account credentials in: [Future Google Accounts](#Future-Google-Accounts)
* Current Account: `CIVAMMEDIABACKUP@gmail.com` Current Password: `fBHF3EN6iFMRH54`

## Future Google Accounts

* Place credentials here: 
