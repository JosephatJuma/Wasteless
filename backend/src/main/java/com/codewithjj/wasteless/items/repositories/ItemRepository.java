package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {


}
