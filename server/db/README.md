**Installation**
=
Bionic 18.04:

**Create** the file `/etc/apt/sources.list.d/pgdg.list` and add a line for the repository ->

```bash
deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main
```
**Import** the repository signing key, and update the package lists ->
```bash
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
```

**Install** it ->
```bash
sudo apt install postgresql-11 pgadmin4
```
**Test** it ->
```bash
sudo su - postgres
pgsql

# Output should be

psql (11.2 (Ubuntu 11.2-1.pgdg18.04+1))
Saisissez « help » pour l'aide.

postgres=# 

```
```bash
pgadmin4

```
