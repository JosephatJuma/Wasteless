package com.codewithjj.wasteless.users.services;

import com.codewithjj.wasteless.users.entities.User;
import com.codewithjj.wasteless.users.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public User createUser(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public String deleteUserById(String id) {
         this.userRepository.deleteById(id);
         return "User deleted successfully";
    }

    @Override
    public User getUserById(String id) {
        return this.userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }
}
