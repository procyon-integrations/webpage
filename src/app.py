from flask import Flask, request, render_template
from flask_mail import Mail
import json
import html
import os
app = Flask(__name__, static_folder='static')

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='noreply@procyon.ee',
    MAIL_PASSWORD=os.environ['MAILER_PASS']
)

mail = Mail(app)


@app.route('/', methods=['GET'])
def main_page():
    return render_template('index.html')


@app.route('/email/', methods=['POST'])
def mailer():
    data = request.data
    data = json.loads(data)
    try:
        name = html.escape(data['name'])
        email = html.escape(data['email'])
        subject = html.escape(data['subject'])
        mail.send_message(
            'Message from procyon.ee',
            sender='noreply@procyon.ee',
            recipients=['info@procyon.ee'],
            body=f"Message from: {name}.\nEmail: {email}\nMessage: {subject}"
        )
    except Exception:
        return {'Success': False}
    return {'Success': True}


if __name__ == '__main__':
    app.run()




