package com.codewithjj.wasteless.items.entities;

import com.codewithjj.wasteless.items.enums.*;
import com.codewithjj.wasteless.items.models.LocationData;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @UuidGenerator
    private UUID id;
    @Column(length = 50)
    private String title;
    private ItemCategory category;
    @Column(length = 400)
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
    @Column(name = "user_id")
    private UUID userId;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ItemImage> images = new ArrayList<>();
    private LocationData location;
    @Column(length = 100)
    private String tags;
    @Column(length = 200)
    private String notes;

    public Item() {}

    public Item(UUID id, String title, ItemCategory category, String description, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime expiryDate, Double quantity, ItemUnitOfMeasure unitOfMeasure, LocalDateTime purchaseDate, LocalDateTime disposalDate, ItemCondition condition, ItemStorageType storageType, UUID userId, List<ItemImage> images, LocationData location, String tags, String notes) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.unitOfMeasure = unitOfMeasure;
        this.purchaseDate = purchaseDate;
        this.disposalDate = disposalDate;
        this.condition = condition;
        this.storageType = storageType;
        this.userId = userId;
        this.images = images;
        this.location = location;
        this.tags = tags;
        this.notes = notes;
    }



    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public List<ItemImage> getImages() {
        return images;
    }

    public void setImages(List<ItemImage> images) {
        this.images = images;
    }
    public ItemCategory getCategory() {
        return category;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public ItemUnitOfMeasure getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(ItemUnitOfMeasure unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public LocalDateTime getDisposalDate() {
        return disposalDate;
    }

    public void setDisposalDate(LocalDateTime disposalDate) {
        this.disposalDate = disposalDate;
    }

    public ItemCondition getCondition() {
        return condition;
    }

    public void setCondition(ItemCondition condition) {
        this.condition = condition;
    }

    public ItemStorageType getStorageType() {
        return storageType;
    }

    public void setStorageType(ItemStorageType storageType) {
        this.storageType = storageType;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }


    public LocationData getLocation() {
        return location;
    }

    public void setLocation(LocationData location) {
        this.location = location;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


}
