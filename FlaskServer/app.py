from flask import Flask
from flask_cors import CORS
from blueprints.routes import routes_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(routes_bp) # blue_print hoạt động bình thường

if __name__ == '__main__':
    app.run(debug=True)


