package com.codewithjj.wasteless.users.constrollers;

import com.codewithjj.wasteless.users.dtos.UserCreationDTO;
import com.codewithjj.wasteless.users.dtos.UserResponseDTO;
import com.codewithjj.wasteless.users.entities.User;
import com.codewithjj.wasteless.users.services.UserServiceImplementation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserServiceImplementation userService;

    @Autowired
    public UserController(UserServiceImplementation userService) {
        this.userService = userService;
    }

@PostMapping
public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserCreationDTO userCreationDTO) {
    //Convert DTO to Entity
    User user = new User();
    user.setUsername(userCreationDTO.getUsername());
    user.setPassword(userCreationDTO.getPassword());
    user.setRole(userCreationDTO.getRole());
    user.setEmail(userCreationDTO.getEmail());
    user.setName(userCreationDTO.getName());

    User createdUser = userService.createUser(user);

    UserResponseDTO userResponseDTO = new UserResponseDTO(
            createdUser.getId(),
            createdUser.getUsername(),
            createdUser.getRole(),
            createdUser.getEmail(),
            createdUser.getName(),
            createdUser.getCreatedAt()

    );

    return new ResponseEntity<>(userResponseDTO, HttpStatus.CREATED);
}
    @GetMapping
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }
    @PutMapping("{id}")
    public User updateUser(@PathVariable String id, User user) {
        return this.userService.updateUser(user);
    }
    @DeleteMapping("{id}")
    public String deleteUserById(@PathVariable String id) {
        return this.userService.deleteUserById(id);
    }



}
