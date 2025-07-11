package com.codewithjj.wasteless.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        String cloudinaryUrl = System.getenv("CLOUDINARY_URL");

        // Use dotenv only if NOT on Render
        if ((cloudinaryUrl == null || cloudinaryUrl.isBlank()) && System.getenv("RENDER") == null) {
            try {

                Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
                cloudinaryUrl = dotenv.get("CLOUDINARY_URL");
            } catch (Exception e) {
                System.out.println("Dotenv not found locally, skipping");
            }
        }

        if (cloudinaryUrl != null && !cloudinaryUrl.isBlank()) {
            return new Cloudinary(cloudinaryUrl);
        }

        throw new RuntimeException("CLOUDINARY_URL not found in environment or .env file");
    }
}
