#!/usr/bin/python3
"""Starts a Flask web application.
"""

from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)


@app.route('/', strict_slashes=False)
def home():
    return ("Hello HBNB!")


@app.route('/hbnb', strict_slashes=False)
def hbnb():
    return ("HBNB")


@app.route('/c/<text>', strict_slashes=False)
def c_text(text):
    replacedText = text.replace('_', ' ')
    return f"C {replacedText}"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
