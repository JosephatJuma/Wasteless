package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface ItemService {
    public Item createItem(ItemCreationDTO item,List<MultipartFile> imageFiles);
    public String deleteItemById(String id);
    public Item getItemById(String id);
    public List<Item> getAllItems();
    public Item updateItem(Item item);
    public List<Item> getItemsByUser(String userId);
}
