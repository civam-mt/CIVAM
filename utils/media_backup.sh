#!/bin/bash

## What each command will do

## copy: will copy files from the server and put them within the remote storage. Skips over any files that are already present on the remote storage.

## update: Skips any files that are on the remote storage that have a modified time that is newer than the file on the server.

## verbose: Just prints every file that gets transferred and its information.

## transfers: Sets the number of files to copy in parallel

## checkers: How many checkers. Checkers will monitor the transfers that are in progress.

## contimeout: Set a time if the conections timesout. rclone will try to reconnect once the time is up.

## timeout: If a transfer becomes idle for the amount of time set. It will be disconnected.

## retries: If there are this amount of errors. Entire action will be restarted.

## tpslimit: Limit the transactions per second by this number. Limit of reclone is 10. We would use this if transactions are causing a problem. (This can be added in the future)

## low-level-retries: Will retry to repeat one failing operations. The number set is how many retries will be performed.

## stats: provides stats of files that are transfered. Will set frequency of update of the statistics to one second in our case.

## All rclone commands can be found in within rclone documentation: https://rclone.org/docs/


## SCRIPT FOR MEDIA BACKUP
/usr/bin/rclone copy --update --verbose --transfers=40 --checkers=40 --contimeout=60s --timeout=300s --retries=3 --low-level-retries=10 --stats=1s "/home/ubuntu/CISC475_D5/django_project/media" "media-backup-google-drive:media-backup"
