package com.codewithjj.wasteless.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.cdimascio.dotenv.Dotenv;


@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        String cloudinaryUrl = dotenv.get("CLOUDINARY_URL");

        if (cloudinaryUrl != null) {
            return new Cloudinary(cloudinaryUrl);
        }

        throw new RuntimeException("CLOUDINARY_URL not found in system environment or .env file");
    }
}
