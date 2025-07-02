package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.users.entities.User;

import java.util.List;

public interface ItemService {
    public Item createItem(Item item);
    public String deleteItemById(String id);
    public Item getItemById(String id);
    public List<Item> getAllItems();
    public Item updateItem(Item item);
    public Item requestItemsById(String id, String userId);

}
