#!/usr/bin/python3
"""Starts a Flask web application.
"""
from models import storage
from models import *
from flask import Flask, render_template
import uuid

app = Flask(__name__)


@app.route("/100-hbnb/", strict_slashes=False)
def hbnb():
    """Displays the main HBnB filters HTML page."""
    states = storage.all("State")
    amenities = storage.all("Amenity")
    places = storage.all("Place")
    cache_id = (str(uuid.uuid4()))
    return render_template("100-hbnb.html",
                           states=states, amenities=amenities, places=places, cache_id=cache_id)


@app.teardown_appcontext
def teardown(exc):
    """Remove the current SQLAlchemy session."""
    storage.close()

port = 5000
host = '0.0.0.0'
if __name__ == "__main__":
    app.run(host=host, port=port)
