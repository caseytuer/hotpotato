import os
import json
import random
from pathlib import Path
from fractions import Fraction
from app.models import Recipe, RecipeDirection, RecipeIngredient, db


def open_file(file_name):
    with open(file_name, "r") as read_file:
        return json.load(read_file)


def save_file(json_data, file_name):
    with open(file_name, "w") as write_file:
        json.dump(json_data, write_file, indent=4)


def seed_from_json():
    NUM_OF_USERS = 14

    # TODO fix os.getcwd(): only grabs root level of project
    recipes_file_name = Path(
        os.getcwd(), "app", "seeds", "assets", "recipes.json")
    print(os.getcwd(), recipes_file_name)
    json_data = open_file(recipes_file_name)

    added = set()
    # keep track of current row, since there are repeats
    ROW_OFFSETS = 0
    ROW_START = 1

    for idx in range(len(json_data['results'])):
        recipe = json_data['results'][idx]
        recipe_id = idx + 1 + ROW_OFFSETS + ROW_START

        if recipe['title'] in added:
            ROW_OFFSETS -= 1

        # "cuisines": [
        #     "Chinese",
        #     "Asian"
        # ],

        # check if recipe is already added
        if not recipe['title'] in added:
            added.add(recipe['title'])

            # Recipe
            db.session.add(Recipe(
                thumbnail_url=recipe['image'],
                name=recipe['title'],
                user_id=random.randint(1, NUM_OF_USERS),


            ))

            # RecipeDirection
            if len(recipe['analyzedInstructions']) > 0:
                for step in recipe['analyzedInstructions'][0]['steps']:
                    db.session.add(RecipeDirection(
                        steps=step['number'],
                        directions=step['step'],
                        recipe_id=recipe_id,
                    ))

            # RecipeIngredient
            if 'extendedIngredients' in recipe:
                for ingredient in recipe['extendedIngredients']:
                    db.session.add(RecipeIngredient(
                        ingredient=ingredient['name'],
                        measurement=str(
                            Fraction(ingredient['amount'])) + ' ' + ingredient['unit'],
                        recipe_id=recipe_id,
                    ))

        db.session.commit()


def undo_seed_from_json():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE recipe_ingredients RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE recipe_directions RESTART IDENTITY CASCADE;')
    db.session.commit()


def length_of_step():
    recipes_file_name = Path(os.getcwd(), "recipe_japanese.json")
    print(os.getcwd(), recipes_file_name)
    json_data = open_file(recipes_file_name)

    print(len(json_data['results']))
    for idx in range(len(json_data['results'])):
        recipe = json_data['results'][idx]
        recipe_id = idx + 1

        thumbnail_url = recipe['image']
        print('thumbnail_length', len(thumbnail_url))

        if 'analyzedInstructions' in recipe:
            for step in recipe['analyzedInstructions'][0]['steps']:
                print('directions', step['step'])
                print('length: ', len(step['step']))

        # RecipeIngredient
        if 'extendedIngredients' in recipe:
            for ingredient in recipe['extendedIngredients']:
                measurement = str(
                    Fraction(ingredient['amount'])) + ' ' + ingredient['unit']
                print('measurement', measurement)
                print('length: ', len(measurement))


if __name__ == "__main__":
    seed_from_json()
    # length_of_step()
