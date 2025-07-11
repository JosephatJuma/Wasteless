package com.codewithjj.wasteless;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
@SpringBootApplication
public class WastelessApplication {
    Dotenv dotenv = Dotenv.load();


    public static void main(String[] args) {

        SpringApplication.run(WastelessApplication.class, args);
    }

}
