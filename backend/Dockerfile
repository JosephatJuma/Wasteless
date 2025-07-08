# Use a lightweight base image with JDK
FROM openjdk:17-jdk-slim
LABEL authors="Josephat Juma"

# Set working directory
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Optionally set Cloudinary URL (or pass it at runtime instead)
# ENV CLOUDINARY_URL=cloudinary://...

# Copy the built JAR from host into the container
COPY target/wasteless-0.0.1-SNAPSHOT.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
