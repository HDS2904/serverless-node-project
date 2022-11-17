

# Serverless Framework Node HTTP API on AWS (DynamoDB, DynamoDB, API Gateway, Lambda, CloudFormation)

El presente proyecto aborda temas relacionados con usar servicios de AWS por medio del framework Serverless, donde se trabajo con un CRUD con dynamoDB y carga de imagenes en S3.

UR: https://github.com/HDS2904/serverless-node-project

## Guía de ejecutar proyecto

1. ejecuatar el siguiente comando para instalar AWS CLI:
  msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

2. Ejecutar el comando:
   aws configure
  donde se debera poner el "ID de clave de acceso" y la "clave de acceso secreta" de usuario creado en AWS IAM (guia rápida de crearla: https://www.youtube.com/watch?v=mXisf92pn3g&ab_channel=CulturaDevOps)

3. Ahora debera clonar el proyecto en su maquina local

4. Ejecutar el comando:
  sls deploy --verbose

5. Descargar el archivo del siguiente enlace: https://drive.google.com/file/d/1VUCtGQRefrYzPJHhDDp4eIRBsD8MQRxG/view?usp=sharing , importarlo en postman para tener un folder las APIS a probar  y cambiar la variable de desarrollo "url" (en postmant) por la url principal que se genera AWS en consola despues de ejecutar el paso 4.

### Nota: 
  Recordar que los pasos 1 y 2 son escenciales para que al deployar el proyecto en SU CUENTA AWS.