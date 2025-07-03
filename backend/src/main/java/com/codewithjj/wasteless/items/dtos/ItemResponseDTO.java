package com.codewithjj.wasteless.items.dtos;

import com.codewithjj.wasteless.items.enums.*;
import com.codewithjj.wasteless.items.models.LocationData;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class ItemResponseDTO {

    private String id; // assuming each item has a unique ID
    private String title;
    private ItemCategory category;
    private String description;
    private Double quantity;
    private ItemUnitOfMeasure unitOfMeasure;
    private LocalDateTime purchaseDate;
    private LocalDateTime disposalDate;
    private ItemCondition condition;
    private ItemStorageType storageType;
    private UUID userId;
    private List<String> images;
    private LocationData location;
    private String tags;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ItemResponseDTO(UUID id, String title, String description, Double quantity, String notes, String tags, ItemCategory category, LocalDateTime purchaseDate, LocalDateTime disposalDate, ItemCondition condition, ItemStorageType storageType, UUID userId, LocationData location) {
    }

    // Getters & Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
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
}
