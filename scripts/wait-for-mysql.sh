#!/bin/sh

echo "Waiting for MySQL to start..."

while ! nc -z mysql 3306; do
  sleep 2
done

echo "MySQL started"
