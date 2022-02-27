from distutils.log import debug
from flask import Flask
from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint)
import jsonpickle
from json import JSONEncoder
import json
#ml joint
#from flask_bootstrap import Bootstrap
import pandas as pd # add to requirements
import numpy as np

x={1244,56.55,78.66,66}
sampleJson = jsonpickle.encode(x)
decodedSet =jsonpickle.decode(sampleJson)
print(x)