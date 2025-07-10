package com.codewithjj.wasteless.items.dtos;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class RequestCreationDTO {
    @NotBlank(message = "User ID cannot be empty")
    UUID userId;

    @NotBlank(message = "You must select an item")
    UUID itemId;

    String notes;

    public  UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getItemId() {
        return itemId;
    }

    public void setItemId(UUID itemId) {
        this.itemId = itemId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


}
