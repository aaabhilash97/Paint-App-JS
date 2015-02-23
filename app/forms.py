from flask.ext.wtf import Form
from wtforms import StringField,BooleanField,PasswordField
from wtforms.validators import DataRequired,InputRequired,Email,EqualTo
from wtforms.fields.html5 import EmailField
class SignupForm(Form):
	username=StringField('username', validators=[DataRequired("please enter username")])
        email=EmailField('email', validators=[InputRequired("Please enter your email address."), Email("Please enter your email address.")])
	password=PasswordField('password',validators=[InputRequired("please enter pass word")])
	rptpassword=PasswordField('rptpassword',validators=[InputRequired("enter input"),EqualTo('password',"not same")])
class LoginForm(Form):
        username=StringField('username', validators=[InputRequired()])
        password=PasswordField('password',validators=[InputRequired()])
	rememberme = BooleanField('rememberme', default=False)
