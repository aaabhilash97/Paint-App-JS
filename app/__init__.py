from flask import Flask
from flask.ext.login import LoginManager
import sqlite3
c=sqlite3.connect('canvas.db')
try:
        c.execute("CREATE TABLE canvas(id INTEGER PRIMARY KEY,name TEXT,data TEXT,UNIQUE (name))")

        c.commit()
except:
        None
app=Flask(__name__)
app.config.from_object('config')
from app import views,models
