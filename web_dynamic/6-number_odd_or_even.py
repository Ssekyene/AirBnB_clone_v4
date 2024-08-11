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
    replaced = text.replace('_', ' ')
    return f"C {replaced}"


@app.route('/python/', defaults={'text': 'is_cool'}, strict_slashes=False)
@app.route('/python/<text>')
def python_text(text):
    # Replace underscores with spaces in the text
    replaced = text.replace('_', ' ')
    return f"Python {replaced}"


@app.route('/number/<int:n>', strict_slashes=False)
def number_n(n):
    return f"{n} is a number"


@app.route('/number_template/<int:n>', strict_slashes=False)
def number_template(n):
    return render_template('5-number.html', number=n)


@app.route('/number_odd_or_even/<int:n>', strict_slashes=False)
def number_odd_or_even(n):
    if n % 2 == 0:
        result = "even"
    else:
        result = "odd"
    return render_template('6-number_odd_or_even.html', number=n,
                           result=result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
