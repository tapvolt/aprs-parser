#!/usr/bin/env bash

cd /opt
sudo yum -y install git

git clone https://github.com/tapvolt/aprs-parser.git code

cd code

sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo

curl --location https://rpm.nodesource.com/setup_6.x > /home/ec2-user/node_install.sh


sudo bash /home/ec2-user/node_install.sh

node --version


# install yarn
sudo yum install -y yarn
yarn --version


sudo yum install -y mysql
