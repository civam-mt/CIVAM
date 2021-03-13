#!/bin/bash

while getopts a:f:b:h:s flag
do
    case "${flag}" in
	a) address=${OPTARG};;
	f) portFront=${OPTARG};;
	b) portBack=${OPTARG};;
	h) help=${OPTARG};;
	s) status=${OPTARG};;
    esac
done

if [ ${#address} == 0 ];
then
    address="0.0.0.0"
fi

if [ ${#portFront} == 0 ];
then
    portFront="4200"
fi

if [ ${#portBack} == 0 ];
then
    portBack="8000"
fi

if [ ${#help} == 0 ];
then
    help="noticed"
fi

if [ ${#status} == 0 ];
then
    status="dev"
fi

echo "Starting CIVAM in $(pwd)";

postgresql_status=$(service postgresql status | grep "Active: inactive");
if [ ${#postgresql_status} != 0 ];
then
    if [ $EUID != 0 ];
    then
	echo "Postgresql is not running, requires superuser access."
	sudo "$0" "$@"
	exit "$?";
    fi
    echo "Attempting to start the postgresql...";
    service postgresql start;
    postgresql_status=$(service postgresql status | grep "Active: inactive");
    if [ ${#postgresql_status} == 0 ];
    then
	echo "Postgresql has sucessfully started!";
	exec bash "$0" "$@";
    else
	echo "Failed to start postgresql!  See error below, or at 'sudo service postgresql status'";
	echo $(service postgresql status);
    fi
else
    echo "Service postgresql is running";
    echo "Attempting to start front-end";
    cd angular-frontend;
    ng serve --host $address &
    echo "Started Frontend";
    cd ../django_project;
    python3 manage.py runserver $address:$portBack &
    echo "Started Backend";
    cd ..;
    ps;
fi
