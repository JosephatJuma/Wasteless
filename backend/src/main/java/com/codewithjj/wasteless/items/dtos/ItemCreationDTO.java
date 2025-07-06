package com.codewithjj.wasteless.items.dtos;

import com.codewithjj.wasteless.items.enums.*;
import com.codewithjj.wasteless.items.models.LocationData;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;


public class ItemCreationDTO {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotNull(message = "Category cannot be null")
    private ItemCategory category;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @PositiveOrZero(message = "Quantity must be zero or positive")
    private Double quantity;

    private ItemUnitOfMeasure unitOfMeasure;

    private LocalDateTime purchaseDate;
    private LocalDateTime disposalDate;

    private ItemCondition condition;
    private ItemStorageType storageType;

    @NotBlank(message = "User ID cannot be empty")
    private String userId;



    private LocationData location;

    private String tags;
    private String notes;

    // Getters & Setters

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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
