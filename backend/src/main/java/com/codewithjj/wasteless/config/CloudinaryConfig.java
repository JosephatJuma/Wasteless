package com.codewithjj.wasteless.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    // Inject CLOUDINARY_URL if available via Spring Environment (e.g. Render env vars)
    @Value("${CLOUDINARY_URL:}")
    private String cloudinaryUrlFromSpring;

    @Bean
    public Cloudinary cloudinary() {
        String cloudinaryUrl = cloudinaryUrlFromSpring;

        // If not found via Spring and not running on Render, fallback to .env
        if ((cloudinaryUrl == null || cloudinaryUrl.isBlank()) && System.getenv("RENDER") == null) {
            try {
                Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
                cloudinaryUrl = dotenv.get("CLOUDINARY_URL");
                System.out.println("Loaded CLOUDINARY_URL from .env");
            } catch (Exception e) {
                System.out.println("Failed to load .env locally: " + e.getMessage());
            }
        }

        if (cloudinaryUrl != null && !cloudinaryUrl.isBlank()) {
            return new Cloudinary(cloudinaryUrl);
        }

        throw new RuntimeException("CLOUDINARY_URL not found in environment or .env file");
    }
}
