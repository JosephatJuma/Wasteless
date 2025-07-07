package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.cloudinary.services.CloudinaryImageService;
import com.codewithjj.wasteless.exceptions.ResourceNotFoundException;
import com.codewithjj.wasteless.items.dtos.ItemCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.entities.ItemImage;
import com.codewithjj.wasteless.items.repositories.ItemImageRepository;
import com.codewithjj.wasteless.items.repositories.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ItemServiceImplementation implements ItemService{

    private final ItemRepository itemRepository;
    private final ItemImageRepository itemImageRepository;
    private final CloudinaryImageService cloudinary;

    @Autowired
    public ItemServiceImplementation(ItemRepository itemRepository, ItemImageRepository itemImageRepository, CloudinaryImageService cloudinary) {
        this.itemRepository = itemRepository;
        this.itemImageRepository = itemImageRepository;
        this.cloudinary = cloudinary;
    }

    @Override
    public Item createItem(ItemCreationDTO dto, List<MultipartFile> imageFiles) {
        Item item = new Item();
        item.setTitle(dto.getTitle());
        UUID userId = UUID.fromString(dto.getUserId());
        item.setUserId(userId);
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

        // Save item first to get generated ID
        Item savedItem = itemRepository.save(item);

        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<ItemImage> images = new ArrayList<>();

            for (MultipartFile file : imageFiles.stream().limit(3).toList()) {
                String publicId = cloudinary.store(file);  // Should return Cloudinary public_id
                String url = cloudinary.getImageUrl(publicId);

                ItemImage image = new ItemImage();
                image.setPublicId(publicId);  // Set public_id for DB non-null column
                image.setUrl(url);
                image.setItem(savedItem);     // Associate with savedItem (managed entity)

                images.add(image);
            }

            itemImageRepository.saveAll(images);

            // Update savedItem's images list (optional, for coherence)
            savedItem.setImages(images);
        }

        return savedItem;
    }

    public String deleteItemById(String id) {
        UUID itemId = UUID.fromString(id); // Convert String to UUID

        List<ItemImage> itemImage = itemImageRepository.findByItemId(itemId);

        for (ItemImage image : itemImage) {
            cloudinary.deleteImage(image.getPublicId());
            itemImageRepository.delete(image);
        }
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
    @Override
    public List<Item> getItemsByUser(String userId) {
        UUID id = UUID.fromString(userId);
        return itemRepository.findByUserId(id);
    }

    @Override
    public List<Item> getNearestItems(double latitude, double longitude) {
        return itemRepository.findNearestItems(latitude, longitude);
    }

}
