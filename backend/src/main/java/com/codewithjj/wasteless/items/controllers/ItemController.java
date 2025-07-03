package com.codewithjj.wasteless.items.controllers;

import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.services.ItemServiceImplementation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("items")
@Tag(name = "Items", description = "Operations related to items")
public class ItemController {
    private final ItemServiceImplementation itemServiceImplementation;

    @Autowired
    public ItemController(ItemServiceImplementation itemServiceImplementation) {
        this.itemServiceImplementation = itemServiceImplementation;
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody ItemCreationDTO itemCreationDTO) {
        Item createdItem = itemServiceImplementation.createItem(itemCreationDTO);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return this.itemServiceImplementation.getAllItems();
    }
    @GetMapping("{id}")
    public Item getItemById(@PathVariable String id) {
        return this.itemServiceImplementation.getItemById(id);
    }

    @PutMapping("{id}")
    public Item updateItem(@PathVariable String id, @RequestBody Item item) {
        return this.itemServiceImplementation.updateItem(item);
    }

    @DeleteMapping("{id}")
    public String deleteItemById(@PathVariable String id) {
        return this.itemServiceImplementation.deleteItemById(id);
    }

}
