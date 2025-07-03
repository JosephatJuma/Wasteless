package com.codewithjj.wasteless.users.services;

import com.codewithjj.wasteless.users.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    public User createUser(User user);
    public String deleteUserById(UUID id);
    public User getUserById(UUID id);
    public List<User> getAllUsers();
    public User updateUser(User user);
}
