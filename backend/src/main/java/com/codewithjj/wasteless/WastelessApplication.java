package com.codewithjj.wasteless;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
@SpringBootApplication
public class WastelessApplication {
    public static void main(String[] args) {
        if (System.getenv("RENDER") == null) {
            try {
                Dotenv dotenv = Dotenv.load();
                dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
            } catch (Exception ignored) {
                System.out.println("No .env file found — skipping dotenv");
            }
        }

        SpringApplication.run(WastelessApplication.class, args);
    }


}
