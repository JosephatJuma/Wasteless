package com.codewithjj.wasteless.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        // Prefer environment variable (Render will inject this)
        String cloudinaryUrl = System.getenv("CLOUDINARY_URL");

        // Optional: fallback to .env only for local dev
        if (cloudinaryUrl == null || cloudinaryUrl.isBlank()) {
            try {
                io.github.cdimascio.dotenv.Dotenv dotenv = io.github.cdimascio.dotenv.Dotenv.configure()
                        .ignoreIfMissing()
                        .load();
                cloudinaryUrl = dotenv.get("CLOUDINARY_URL");
            } catch (Exception ignored) {}
        }

        if (cloudinaryUrl != null && !cloudinaryUrl.isBlank()) {
            return new Cloudinary(cloudinaryUrl);
        }

        throw new RuntimeException("CLOUDINARY_URL not found in environment or .env file");
    }
}
