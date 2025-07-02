package com.codewithjj.wasteless.users.dtos;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class UserResponseDTO {

    private UUID id;
    private String username;
    private String role;
    private String email;
    private String name;
    private LocalDateTime createdAt;

    // Constructors
    public UserResponseDTO() {}

    public UserResponseDTO(UUID id, String username, String role, String email, String name, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.email = email;
        this.name = name;
        this.createdAt=createdAt;
    }

    // Getters and Setters
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

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}