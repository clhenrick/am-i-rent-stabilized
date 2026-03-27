FROM python:3.14-slim

WORKDIR /home/data

COPY . .

RUN pip install -r requirements.txt && chmod +x init.sh

CMD ["./init.sh"]
