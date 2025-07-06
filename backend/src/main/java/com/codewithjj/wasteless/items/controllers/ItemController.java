package com.codewithjj.wasteless.items.controllers;

import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.enums.ItemCategory;
import com.codewithjj.wasteless.items.services.ItemServiceImplementation;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

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
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Item details", required = true
            //content = @io.swagger.v3.oas.annotations.media.Content(mediaType = "multipart/form-data",
                    //schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ItemCreationDTO.class))
    )
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


    @PostMapping(value = "/uploadMultiple", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> handleFileUploadMultiple(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("userId") String userId,
            @RequestPart(value = "files", required = false) List<MultipartFile> attachments
    ) throws IOException {
ItemCreationDTO item = new ItemCreationDTO();
        item.setTitle(title);
        item.setDescription(description);
        item.setUserId(userId);
        System.out.println(attachments.size());
        System.out.println(item.getTitle());

        return ResponseEntity.ok("Files uploaded successfully!");
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
    @GetMapping("/{userId}/my-items")
    public List<Item> getItemsByUser(@PathVariable String userId) {
        return this.itemServiceImplementation.getItemsByUser(userId);
    }

}


