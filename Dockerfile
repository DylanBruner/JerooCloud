FROM python:3.8
WORKDIR /app

COPY decompile/compiler.js /app/decompile/compiler.js
COPY decompile/main.js /app/decompile/main.js
COPY bootstrap.min.css /app/bootstrap.min.css
COPY easystar.js /app/easystar.js
COPY jeroocloud.js /app/jeroocloud.js
COPY jeroofeatures.js /app/jeroofeatures.js
COPY jeroorouter.py /app/jeroorouter.py
COPY locate.js /app/locate.js
COPY pathfinding.js /app/pathfinding.js
COPY speedup.js /app/speedup.js
COPY theme.js /app/theme.js
COPY requirements.txt /app/requirements.txt

RUN pip3 install -r requirements.txt
CMD ["python3", "jeroorouter.py"]