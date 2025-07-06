package com.codewithjj.wasteless.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
// Import the required packages

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Map;
@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        String envUrl = "cloudinary://681482994288216:Y8mBLjcBKzwNfLs-crNmcncBJ_E@dgujgh7n1";
        if (envUrl != null) {
            return new Cloudinary(envUrl);
        }

        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        String cloudinaryUrl = dotenv.get("CLOUDINARY_URL");

        if (cloudinaryUrl != null) {
            return new Cloudinary(cloudinaryUrl);
        }

        throw new RuntimeException("CLOUDINARY_URL not found in system environment or .env file");
    }
}
