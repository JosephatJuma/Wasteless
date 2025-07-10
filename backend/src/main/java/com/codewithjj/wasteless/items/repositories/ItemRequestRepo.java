package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.entities.ItemRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ItemRequestRepo extends JpaRepository<ItemRequest, UUID> {
    List<ItemRequest> findByUserId(UUID userId);
    List<ItemRequest> findByItemId(UUID itemId);

}
