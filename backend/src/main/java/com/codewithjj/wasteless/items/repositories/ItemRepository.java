package com.codewithjj.wasteless.items.repositories;

import com.codewithjj.wasteless.items.entities.Item;
import org.hibernate.validator.constraints.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, UUID> {

}
