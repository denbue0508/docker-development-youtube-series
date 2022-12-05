# Parcels PH microservices API

This project directory is responsible for parcels service of GCASH

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
node version > 8.13
npm
yarn
mongodb
```

### Installing

How to?

```
IMPORTANT
0. install pre requisite
1. run mongodb instance by running mongod --dbpath <location of your db> 
2. create database *heatmap*
3. Create a file inside src directory name .env with .env.example properties which you've setup on your local
4. create a file inside *src/config* named firebase.json and copy service account keys from firebase (you can get it to the lmi devs)
5. in the root directory run the command *yarn install*
6. when success, run *yarn dev*
```

### Break down into end to end tests

Explain what these tests test and why

```
WIP
```

## Deployment

deployment will be in pipeline which configuration found in bitbucket config file


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

