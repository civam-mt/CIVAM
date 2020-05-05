#!/bin/bash

cd angular-frontend
ng serve &
cd ../django_project
python3 manage.py runserver &
cd ..
ps
