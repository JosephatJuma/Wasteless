package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.ItemImage;
import org.hibernate.validator.constraints.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemImageRepository extends JpaRepository<ItemImage, UUID> {
}
