# NEOCDT
## **Proyecto académico – Ingeniería de Software 2**  
## **Equipo:** Samuel Salazar, Roiman Urrego, Isabela Cabezas, Isabella Ortíz, Sebastián Bustamante  
**Docente:** Rodrigo Escobar López  

**NeoCDT** es un módulo digital de **NeoBank** para la **gestión de Certificados de Depósito a Término (CDTs)**.  
Permite abrir, consultar y renovar CDTs de forma 100% digital, mejorando la eficiencia y experiencia del usuario.

## **Avance Final** 

## **Incluye:**
- ✅ **Login funcional** con validación de credenciales.  
- ✅ **Backend Funcional**
- ✅ **Frontend Funcional** 
- ✅ **Historias de usuario** con criterios de aceptación en **Gherkin**.  
- ✅ **Pruebas unitarias** 
- ✅ **Análisis de SonarQube** 
  
## **Arquitectura (prototipo inicial)**

- **Frontend:** React.js (estructura base, rutas y componentes funcionales).
- **Backend:** Node.js + Express.
- **Base de datos:** MongoDB.
- **Control de calidad:** SonarQube.
- **Pruebas:** Jest (unitarias) y Playwright (funcionales E2E).

## **Funcionalidades actuales**

- Registro y autenticación de usuarios con validación segura.
- Creación, consulta, edición, actualización y eliminación de Solicitudes de CDT.
- Comunicación completa entre frontend y backend mediante API REST.
- Manejo de errores y validación de formularios.
- Escenarios de prueba unitarios en frontend y backend.
- Pruebas funcionales E2E derivadas de las historias de usuario.
- Análisis de calidad de código con SonarQube, sin issues críticos.

##  Instrucciones de ejecución

### Backend 

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/<usuario>/<repositorio>.git
   cd backend
2. Instalar dependencias
   ```bash
   npm install
  
3. Ejecutar el servidor:
   ```bash
   npm run dev


### **Frontend**

1. Ir al directorio del frontend:
   ```bash
   cd ../frontend
2. Instalar dependencias:
   ```bash
   npm install
3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev

### **Base de Datos sin MongoDB shell instalado**
   ```bash
mongosh "mongodb+srv://neocdt.1evhcei.mongodb.net/" --apiVersion 1 --username isabelacabezas_db_user
  ```
### **Base de Datos con MongoDB shell instalado**
```bash
mongosh "mongodb+srv://neocdt.1evhcei.mongodb.net/" --apiVersion 1 --username isabelacabezas_db_user

