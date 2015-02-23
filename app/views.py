from flask import render_template,flash,redirect,url_for,request,jsonify
from app import app
from .forms import *
from models import *
import json,sqlite3
@app.route('/',methods=['GET','POST'])
@app.route('/index',methods=['GET','POST'])
def index():
    return render_template("index.html")
@app.route('/savedata',methods=['GET','POST'])
def savedata():
	data=request.form['ol']
	name=request.form['name']

	try:
		c=sqlite3.connect('canvas.db')
		if request.form['update']==1 or request.form['update']=="1":
			c.execute('update canvas set data=(?) where name==(?)',[data,name])
		else:
			c.execute('insert into canvas(name,data)values(?,?)',[name,data])
		c.commit()
	except:
		return jsonify({1:"error"})
	return jsonify({1:"data added"})
@app.route('/loaddata',methods=['GET','POST'])
def loaddata():
	name=request.form['name']
	if name!=None:
		try:
			c=sqlite3.connect('canvas.db')
			data=c.execute('select data from canvas where name==(?)',[name])
			paint=''
			for x in data:
				paint=x[0]
			return jsonify({1:paint})
		except:
			return jsonify({1:"no data with this name"})
	return jsonify({1:"no data with this name"})
@app.route('/suggest',methods=['GET','POST'])
def suggest():
	text=request.form['text']
	try:
              c=sqlite3.connect('canvas.db')
              data=c.execute('select name from canvas')
              paint=''
              for x in data:
		   if text in x[0]:
                   	paint+=x[0]+"  "
	      return jsonify({1:paint})
	except:
              return jsonify({1:"no data with this name"})
        return jsonify({1:"no data with this name"})
