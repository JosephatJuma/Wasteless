package com.codewithjj.wasteless.items.services;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    String store(MultipartFile file);
    String getImageUrl(String identifier);
    void deleteImage(String identifier);
}