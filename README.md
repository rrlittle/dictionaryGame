# Server

getting setup

the requirements.txt file contains all the python dependencies.
run

```
python3 -m venv venv
pip install -r requirements.txt
```

that should create a local virtual environment and install the requirements
you can then run the server application with

```
python main.py
python test.py # in order to run the tests. they may be broken atm
```

# Client

This is a react web app.
to install the dependencies run

```
npm i
```

that will inspect `package.json` and install all the required dependencies

once dependencies are installed you can run the client using

```
npm run client # to just run the client
npm run api # to just run the server (once the python dependecies have been installed)
npm start # to run both the client and the server at once
```

# Webscraper

once you have the python deps installed you may run `python scrapeWords.py` to collect all the words from phrontistry.info and store them in server/words.json

# Building

before deploying to heroku you should build the javascript into static assets and store them in the build directory.

```
npm run build # this will also trigger the webscraper
```
