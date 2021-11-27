import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'palabrasecreta'
    #SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    #FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN')


    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

    # MAIL_SERVER = 'smtp.googlemail.com'
    # MAIL_PORT = 587
    # MAIL_USE_TLS = True
    # MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    # MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
    # 'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')
    #SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost/cannabis'
    #SQLALCHEMY_TRACK_MODIFICATIONS = False # No nos de un warning
    SECRET_KEY = 'palabrasecreta'  # Para encriptar los token(32)

class TestingConfig(Config):
    # TESTING = True
    # SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
    # 'sqlite:///' + os.path.join(basedir, 'data-test.sqlite')
    pass

class ProductionConfig(Config):
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    # 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    pass


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
