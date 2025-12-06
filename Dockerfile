FROM mysql:8.0

WORKDIR /app

# Copiamos tu script SQL dentro de la imagen
COPY database/Knowledge.sql /app/Knowledge.sql

COPY import.sh /app/import.sh

RUN chmod +x /app/import.sh

CMD ["/bin/bash", "/app/import.sh"]
