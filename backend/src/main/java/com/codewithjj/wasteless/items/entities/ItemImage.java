package com.codewithjj.wasteless.items.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "item_images")
public class ItemImage {

    @Id
    @GeneratedValue(generator = "UUID") // Or @UuidGenerator if using Hibernate 6+
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false) //foreign key column name in item_images table
    private Item item; // Reference to the Item entity

    @Column(nullable = false)
    private String url; // The direct URL to the image (e.g., from Cloudinary, S3)

    @Column(nullable = false)
    private String publicId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;



    public ItemImage() {}


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Item getItem() { // Getter for the Item relationship
        return item;
    }

    public void setItem(Item item) { // Setter for the Item relationship
        this.item = item;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


}