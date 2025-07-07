package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface ItemService {
    Item createItem(ItemCreationDTO item, List<MultipartFile> imageFiles);
    String deleteItemById(String id);
    Item getItemById(String id);
    List<Item> getAllItems();
    Item updateItem(Item item);
    List<Item> getItemsByUser(String userId);
    List<Item> getNearestItems(double latitude, double longitude);
    List<Item> getNearestItemsWithinRange(double latitude, double longitude,double range);
}
