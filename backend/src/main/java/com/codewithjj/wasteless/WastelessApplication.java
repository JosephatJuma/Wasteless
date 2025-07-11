package com.codewithjj.wasteless;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
@SpringBootApplication
public class WastelessApplication {
    Dotenv dotenv = Dotenv.load();


    public static void main(String[] args) {
        // Load .env variables
        Dotenv dotenv = Dotenv.load();

        // Set them as system properties so Spring Boot can resolve them
        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );
        SpringApplication.run(WastelessApplication.class, args);
    }

}
