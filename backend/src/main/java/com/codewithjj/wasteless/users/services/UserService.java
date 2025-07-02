package com.codewithjj.wasteless.users.services;

import com.codewithjj.wasteless.users.entities.User;

import java.util.List;

public interface UserService {
    public User createUser(User user);
    public String deleteUserById(String id);
    public User getUserById(String id);
    public List<User> getAllUsers();
    public User updateUser(User user);
}
