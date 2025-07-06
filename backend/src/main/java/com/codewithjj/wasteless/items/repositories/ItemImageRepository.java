package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ItemImageRepository extends JpaRepository<ItemImage, UUID> {
    void deleteByItemId(UUID itemId);
    List<ItemImage> findByItemId(UUID itemId);
}
