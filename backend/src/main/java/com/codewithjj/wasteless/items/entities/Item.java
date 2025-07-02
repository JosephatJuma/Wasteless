package com.codewithjj.wasteless.items.entities;

import com.codewithjj.wasteless.items.models.LocationData;
import com.codewithjj.wasteless.users.entities.User;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @UuidGenerator
    private UUID id;
    private String title;
    private enum category {
        FOOD,
        CLOTHING,
        ELECTRONICS,
        BOOKS,
        HOME_GOODS,
        KITCHEN_TOOLS,
        FURNITURE,
        OTHER
    }
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime expiryDate;
    private Double  quantity;
    private enum unitOfMeasure{
        KG,
        LITER,
        COUNT,
        PIECES,
        BOX,
        PAIR,
        NONE,
        BUNDLE,
        BATCH,
        OTHER
    }
    private LocalDateTime purchaseDate;
    private LocalDateTime disposalDate;
    private enum status {
        AVAILABLE,
        PENDING_DISPOSAL,
        DISPOSED,
        ARCHIVED,
        EXPIRED,
        CONSUMED
    }

    private enum condition{
        NEW,
        USED_LIKE_NEW,
        GOOD,
        FAIR,
        POOR,
        DAMAGED
    }
    private enum storageType{REFRIGERATED, FROZEN, SHELF_STABLE, DRY}
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String imageUrl;
    private LocationData location;
    private String tags;
    private String notes;


}
