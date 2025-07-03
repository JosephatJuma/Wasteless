package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.exceptions.ResourceNotFoundException;
import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.repositories.ItemRepository;
import com.codewithjj.wasteless.users.entities.User;
import com.codewithjj.wasteless.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ItemServiceImplementation implements ItemService{

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;


    public ItemServiceImplementation(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository=  userRepository;
    }

    @Override
    public Item createItem(ItemCreationDTO dto) {
        Item item = new Item();
        item.setTitle(dto.getTitle());
        UUID userId = UUID.fromString(dto.getUserId());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        item.setUser(user);
        item.setUser(user);
        item.setTitle(dto.getTitle());
        item.setDescription(dto.getDescription());
        item.setQuantity(dto.getQuantity());
        item.setNotes(dto.getNotes());
        item.setTags(dto.getTags());
        item.setCategory(dto.getCategory());
        item.setPurchaseDate(dto.getPurchaseDate());
        item.setDisposalDate(dto.getDisposalDate());
        item.setCondition(dto.getCondition());
        item.setStorageType(dto.getStorageType());
        item.setLocation(dto.getLocation());
        item.setUnitOfMeasure(dto.getUnitOfMeasure());
        return itemRepository.save(item);
    }


    public String deleteItemById(String id) {
        UUID itemId = UUID.fromString(id); // Convert String to UUID
         itemRepository.deleteById(itemId);
        return "Item deleted successfully";
    }

    @Override
    public Item getItemById(String id) {
        UUID itemId = UUID.fromString(id);
        return  this.itemRepository.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
    }

    @Override
    public List<Item> getAllItems() {
        return this.itemRepository.findAll();
    }

    @Override
    public Item updateItem(Item item) {
        return this.itemRepository.save(item);
    }

}
