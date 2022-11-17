

# Serverless Framework Node HTTP API on AWS (DynamoDB, DynamoDB, API Gateway, Lambda, CloudFormation)

El presente proyecto aborda temas relacionados con usar servicios de AWS por medio del framework Serverless, donde se trabajo con un CRUD con dynamoDB y carga de imagenes en S3.

UR: https://github.com/HDS2904/serverless-node-project

## Guía de ejecutar proyecto

1. ejecutar el siguiente comando en su terminal:
  ```
    msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
  ```
  Esto permite instalar AWS CLI en su maquina.
  

2. Ejecutar el comando:
  ```
    aws configure
  ```
  Este comando permite configurar als credenciales de AWS en su maquina, donde se debera poner el "ID de clave de acceso" y la "clave de acceso secreta" de usuario creado en su cuenta AWS IAM (guia rápida de crearla: https://www.youtube.com/watch?v=mXisf92pn3g&ab_channel=CulturaDevOps)

3. Clonar el presente proyecto en su maquina local
  ```
    https://github.com/HDS2904/serverless-node-project
  ```

4. Ejecutar el siguiente comando desde su terminal posicionado en la carpeta del proeycto:
  ```
    sls deploy --verbose
  ```
  Esto permite desplegar el proyecto en AWS y configurar todo de forma automatica según el archivo serverless.yml

5. Ubiucar la URL princial de entre los endpoint visibles despues de ejecutar el comando del paso 4 para luego copiarlo

6. Descargar el archivo del siguiente enlace: 
  ```
    https://drive.google.com/file/d/1VUCtGQRefrYzPJHhDDp4eIRBsD8MQRxG/view?usp=sharing
  ```
 
7. importar en postman el archivo descargado del paso 6 para tener un folder las APIS a probar, previamente deberá cambiar la variable de desarrollo "url" (en postmant) por la url principal que copio el el paso 4

### Nota: 
  Recordar que los pasos 1 y 2 son escenciales para que al deployar el proyecto en SU CUENTA AWS.