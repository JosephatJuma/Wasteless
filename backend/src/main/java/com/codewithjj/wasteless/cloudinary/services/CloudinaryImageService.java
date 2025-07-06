package com.codewithjj.wasteless.cloudinary.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.codewithjj.wasteless.items.services.ImageStorageService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import io.github.cdimascio.dotenv.Dotenv;
@Service
public class CloudinaryImageService implements ImageStorageService {
    Dotenv dotenv = Dotenv.load();
    private final Cloudinary cloudinary =new Cloudinary(dotenv.get("CLOUDINARY_URL"));
    private final String baseUrl;

    public CloudinaryImageService(
            Cloudinary cloudinary,
            @Value("${app.image.base-url:https://res.cloudinary.com/default/image/upload/}") String baseUrl) {
        //this.cloudinary = cloudinary;
        this.baseUrl = baseUrl;

        System.out.println(">>> CloudinaryImageService initialized with baseUrl: " + baseUrl);
    }

    @Override
    public String store(MultipartFile file) {
        try {
            String publicId = "wasteless/" + UUID.randomUUID();
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("public_id", publicId)
            );
            return (String) uploadResult.get("public_id");
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to Cloudinary", e);
        }
    }

    @Override
    public String getImageUrl(String publicId) {
        return cloudinary.url().secure(true).generate(publicId);
    }

    @Override
    public void deleteImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image from Cloudinary", e);
        }
    }
}
