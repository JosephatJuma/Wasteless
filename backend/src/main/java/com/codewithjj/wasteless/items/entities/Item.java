package com.codewithjj.wasteless.items.entities;

import com.codewithjj.wasteless.items.enums.*;
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
    private ItemCategory category;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime expiryDate;
    private Double  quantity;
    private ItemUnitOfMeasure unitOfMeasure;
    private LocalDateTime purchaseDate;
    private LocalDateTime disposalDate;
    private ItemCondition condition;
    private ItemStorageType  storageType;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String imageUrl;
    private LocationData location;
    private String tags;
    private String notes;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


}
