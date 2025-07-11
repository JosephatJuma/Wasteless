package com.codewithjj.wasteless.cloudinary.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.codewithjj.wasteless.items.services.ImageStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryImageService implements ImageStorageService {

    private final Cloudinary cloudinary;
    private final String cloudinaryBaseUrl;

    public CloudinaryImageService(
            @Value("${CLOUDINARY_URL}") String cloudinaryUrl,
            @Value("${app.image.base-url:https://res.cloudinary.com/default/image/upload/}") String cloudinaryBaseUrl) {
        this.cloudinary = new Cloudinary(cloudinaryUrl);
        this.cloudinaryBaseUrl = cloudinaryBaseUrl;

        System.out.println(">>> CloudinaryImageService initialized with baseUrl: " + cloudinaryBaseUrl);
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
