from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired
# from app.models import Recipe


class RecipeCreateForm(FlaskForm):
    thumbnail_url = StringField(validators=[DataRequired()])
    user_id = IntegerField(validators=[DataRequired()])
    name = StringField(validators=[DataRequired()])


class RecipeDirectionsCreateForm(FlaskForm):
    directions = StringField(validators=[DataRequired()])
    steps = IntegerField(validators=[DataRequired()])
    recipe_id = IntegerField(validators=[DataRequired()])


class RecipeDirectionsUpdateForm(FlaskForm):
    id = IntegerField(validators=[DataRequired()])
    directions = StringField(validators=[DataRequired()])
    recipe_id = IntegerField(validators=[DataRequired()])
    steps = IntegerField(validators=[DataRequired()])


class RecipeIngredientsCreateForm(FlaskForm):
    ingredient = StringField(validators=[DataRequired()])
    measurement = StringField()
    recipe_id = IntegerField(validators=[DataRequired()])

    
class RecipeIngredientsUpdateForm(FlaskForm):
    id = IntegerField(validators=[DataRequired()])
    ingredient = StringField(validators=[DataRequired()])
    measurement = StringField()
    recipe_id = IntegerField(validators=[DataRequired()])


class RecipePhotosCreateForm(FlaskForm):
    video_url = StringField()
    img_url = StringField(validators=[DataRequired()])
    recipe_id = IntegerField(validators=[DataRequired()])
  
