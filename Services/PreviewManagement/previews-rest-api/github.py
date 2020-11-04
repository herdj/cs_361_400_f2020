from flask import Blueprint, request, make_response
from json2html import *
import json

bp = Blueprint("github", __name__, url_prefix="/services/github")