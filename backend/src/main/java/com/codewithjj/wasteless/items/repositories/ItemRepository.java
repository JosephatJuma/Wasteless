package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.models.LocationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findByUserId(UUID userId);
    @Query(value = """
      SELECT *, (
        6371 * acos(
          cos(radians(:latitude)) *
          cos(radians(latitude)) *
          cos(radians(longitude) - radians(:longitude)) +
          sin(radians(:latitude)) *
          sin(radians(latitude))
        )
      ) AS distance
      FROM items
      ORDER BY distance ASC
      LIMIT 10
      """, nativeQuery = true)
    List<Item> findNearestItems(
            @Param("latitude") double latitude,
            @Param("longitude") double longitude);

}
