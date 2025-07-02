package com.codewithjj.wasteless.users.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @UuidGenerator
    //@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    private String username;
    private String password;
    private String role;
    private String email;
    private String name;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // Preferred: Use LocalDateTime for modern Java

    // Or if you prefer java.util.Date
    // @Column(name = "created_at", nullable = false, updatable = false)
    // private Date createdAt;

    // This method will be called automatically before the entity is persisted (inserted)
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(); // Set to current time before persisting
        // Or: this.createdAt = new Date(); if using java.util.Date
    }

    public User() {}

    public User(UUID id, String username, String password, String role, String email, String name, Date createdAt) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.name = name;
    }
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
         this.createdAt=createdAt;
    }



}
