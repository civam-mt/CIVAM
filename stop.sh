#!/bin/bash

node_pid=$(ps | pgrep node);
django_pid=$(ps -ef | pgrep python3);
postgresql_status=$(service postgresql status | grep "Active: inactive");

if [ ${#postgresql_status} == 0 ];
then
    if [ $EUID != 0 ];
    then
	echo "Postgresql is running, to shutdown requires superuser access."
	sudo "$0" "$@"
	exit "$?";
    fi
    echo "Stopping postgresql...";
    service postgresql stop;
    echo "Stopping nodejs...";
    pkill node;
    echo "Stopping django...";
    pkill python3;
    echo "";
    echo "Shutdown Complete.";
fi


