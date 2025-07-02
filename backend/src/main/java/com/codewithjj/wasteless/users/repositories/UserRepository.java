package com.codewithjj.wasteless.users.repositories;

import com.codewithjj.wasteless.users.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
