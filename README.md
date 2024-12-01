# EnginuityAI  
A chatbot using the Retrieval-Augmented Generation (RAG) mechanism to solve study-related doubts.  

## Getting Started  

Follow these steps to set up and run the project:  

### Prerequisites  
- **Docker**: Ensure Docker is installed and running on your system.  
- **Java 21**: Required to run the Spring Boot application.  
- **Maven 3.9.9**: For building and running the Spring Boot application.  

### How to Run  

1. **Stop any running Docker containers:**  
   ```bash  
   docker compose down  
   ```  

2. **Start Docker containers:**  
   ```bash  
   docker compose up -d  
   ```  

   **Note:** Ensure that port `5432` (default PostgreSQL port) is not in use. If another process is using the port:  
   - Find the process ID (PID):  
     ```cmd  
     netstat -aon | findstr :5432  
     ```  
   - Terminate the process:  
     ```cmd  
     taskkill /PID <PID> /F  
     ```  
   - Repeat steps 1 and 2.  

3. **Run the Spring Boot application:**  
   ```bash  
   mvn spring-boot:run  
   ```  

### Features  
- **RAG Mechanism:** Combines retrieval-based methods with generative AI for accurate and context-aware responses.  
- **Study-Focused:** Tailored to assist with academic queries and doubts.  

### Contributing  
Feel free to submit issues or contribute to the project by creating a pull request.  
