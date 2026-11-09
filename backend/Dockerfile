# ---------- Etapa 1: compilar el JAR ----------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Primero solo el pom: las dependencias quedan en caché mientras no cambie
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q package -DskipTests

# ---------- Etapa 2: imagen final, solo con el JRE ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

RUN groupadd --system spring && useradd --system --gid spring spring
USER spring

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
