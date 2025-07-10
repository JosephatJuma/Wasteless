package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.exceptions.NotValidUUIDException;
import com.codewithjj.wasteless.exceptions.ResourceNotFoundException;
import com.codewithjj.wasteless.items.dtos.RequestCreationDTO;
import com.codewithjj.wasteless.items.entities.Item;
import com.codewithjj.wasteless.items.entities.ItemRequest;
import com.codewithjj.wasteless.items.enums.RequestStatus;
import com.codewithjj.wasteless.items.repositories.ItemRepository;
import com.codewithjj.wasteless.items.repositories.ItemRequestRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ItemRequestServiceImpl implements ItemRequestService {
    ItemRequestRepo itemRequestRepo;
    ItemRepository itemRepository;
    public ItemRequestServiceImpl(ItemRequestRepo itemRequestRepo, ItemRepository itemRepository) {
        this.itemRequestRepo = itemRequestRepo;
        this.itemRepository = itemRepository;
    }



    @Override
    public ItemRequest createRequest(RequestCreationDTO dto) {
        Item item = itemRepository.findById(dto.getItemId()).orElseThrow(()->new ResourceNotFoundException("The Item selected no longer exists"));
        ItemRequest itemRequest = new ItemRequest();
        itemRequest.setUserId(dto.getUserId());
        itemRequest.setItem(item);
        itemRequest.setNotes(dto.getNotes());
        item.setLocation(dto.getLocation());
        return itemRequestRepo.save(itemRequest);
    }

    @Override
    public ItemRequest getRequestById(String id) {
        try {
            UUID requestId = UUID.fromString(id);
            return this.itemRequestRepo.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + id));
        } catch (Exception e) {
            throw new NotValidUUIDException("Invalid UUID format: " + id);
        }
    }

    @Override
    public List<ItemRequest> getAllRequestsByUserId(String userId) {
        UUID id = UUID.fromString(userId);
        return this.itemRequestRepo.findByUserId(id);
    }

    @Override
    public String deleteRequestById(String id) {
        UUID requestId = UUID.fromString(id);
        this.itemRequestRepo.deleteById(requestId);
        return "Request been cancelled successfully";
    }

    @Override
    public ItemRequest acceptRequest(String id) {
        UUID requestId = UUID.fromString(id);
        ItemRequest itemRequest = this.itemRequestRepo.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + id));
        itemRequest.setStatus(RequestStatus.APPROVED);
        //reject all other requests
        List<ItemRequest> requests = this.itemRequestRepo.findByItemId(itemRequest.getItem().getId());
        for (ItemRequest request : requests) {
            if (request.getId().equals(requestId)) continue;
            request.setStatus(RequestStatus.REJECTED);
            this.itemRequestRepo.save(request);

        }
        return itemRequest;
    }

    @Override
    public ItemRequest rejectRequest(String id) {
        UUID requestId = UUID.fromString(id);
        ItemRequest itemRequest = this.itemRequestRepo.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + id));
        itemRequest.setStatus(RequestStatus.REJECTED);
        return itemRequest;
    }
}
