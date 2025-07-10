package com.codewithjj.wasteless.items.controllers;

import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.services.ItemServiceImplementation;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Create a new item", description = "Creates a new item and returns the created item")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Item details", required = true)
    public ResponseEntity<Item> createItem(
            @RequestPart("metadata") String metaData,
            @RequestPart(value = "files", required = false) List<MultipartFile> attachments
    ) throws IOException {
        // Manually deserialize
        ObjectMapper mapper = new ObjectMapper();
        ItemCreationDTO itemCreationDTO = mapper.readValue(metaData, ItemCreationDTO.class);

        Item createdItem = itemServiceImplementation.createItem(itemCreationDTO, attachments);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all items", description = "Returns a list of all items")
    public List<Item> getAllItems() {
        return this.itemServiceImplementation.getAllItems();
    }

    @Operation(summary = "Get an item by ID", description = "Returns the item with the specified ID")
    @GetMapping("{id}")
    public Item getItemById(@PathVariable String id) {

        return this.itemServiceImplementation.getItemById(id);
    }

    @Operation(summary = "Update an item", description = "Updates the item with the specified ID")
    @PutMapping("{id}")
    public Item updateItem( @RequestBody Item item,@PathVariable String id) {
        return this.itemServiceImplementation.updateItem(item,id);
    }

    @Operation(summary = "Get items by location", description = "Returns a list of items near the specified location")
    @GetMapping("/location/{latitude}/{longitude}/{page}/{limit}")
    public List<Item> getItemByLocation(@PathVariable double latitude, @PathVariable double longitude, @PathVariable int page, @PathVariable int limit) {
        return this.itemServiceImplementation.getNearestItems(latitude, longitude,page,limit);
    }

    @Operation(summary = "Get items by location", description = "Returns a list of items within the specified range of the specified location")
    @GetMapping("/location/{latitude}/{longitude}/{range}/{page}/{limit}")
    public List<Item> getItemByLocation(@PathVariable double latitude, @PathVariable double longitude, @PathVariable double range, @PathVariable int page, @PathVariable int limit) {
        System.out.println(latitude+" "+longitude+" "+range+" "+page);
        return this.itemServiceImplementation.getNearestItemsWithinRange(latitude, longitude,range, page,limit);
    }

    @Operation(summary = "Delete an item by ID", description = "Deletes the item with the specified ID")
    @DeleteMapping("{id}")
    public String deleteItemById(@PathVariable String id) {

        return this.itemServiceImplementation.deleteItemById(id);
    }

    @Operation(summary = "Get items by user ID", description = "Returns a list of items created by the user with the specified ID")
    @GetMapping("/{userId}/my-items")
    public List<Item> getItemsByUser(@PathVariable String userId) {
        return this.itemServiceImplementation.getItemsByUser(userId);
    }

}


