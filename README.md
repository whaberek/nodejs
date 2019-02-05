# Test

## Install tools

- Install VirtualBox or other virtual machine,
- Install Vagrant,
- Install plugin for Vagrant `vagrant plugin install vagrant-hostsupdater`.

## Run

- Go to vagrant folder,
- Run `vagrant up` in console for creates and configures guest machines,
- `vagrant ssh` to run virtual machine with access to a shell,
- `cd /var/www/api` and then `yarn develop` for use development,
- Now You can edit file with using your favorite IDE in local system.

## Make starting data for database

- Go to vagrant folder
- Run `vagrant provision` tu run ansible process with make new database
