package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.ItemRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ItemRequestRepo extends JpaRepository<ItemRequest, UUID> {
    List<ItemRequest> findByUserId(UUID userId);
    List<ItemRequest> findByItemId(UUID itemId);

    @Query(value = """
    SELECT r.* 
    FROM requests r
    JOIN items i ON r.item_id = i.id
    WHERE r.status = 0
      AND i.user_id = :userId
    """, nativeQuery = true)
    List<ItemRequest> getIncomingRequestsByUserId(UUID userId);
    @Query(value = "SELECT * FROM requests WHERE user_id = :userId", nativeQuery = true)
    List<ItemRequest> getOutgoingRequestsByUserId(UUID userId);

}
