#!/bin/bash

cd angular-frontend
ng serve --host 0.0.0.0 &
cd ../django_project
python3 manage.py runserver 0.0.0.0:8000 &
cd ..
ps
