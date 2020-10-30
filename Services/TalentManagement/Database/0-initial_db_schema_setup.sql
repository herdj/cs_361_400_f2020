CREATE DATABASE SHARP_CRAYONS_PROD; -- One time run for all schema in the database

CREATE SCHEMA TAL; -- Schema for the Talent Management Service

CREATE USER TALENT_WEB_API_USER WITH LOGIN PASSWORD 'talent_123'; -- Service account username/password

GRANT USAGE ON SCHEMA TAL TO TALENT_WEB_API_USER; -- Allocate perms for service account