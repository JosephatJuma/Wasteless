package com.codewithjj.wasteless.items.controllers;

import com.codewithjj.wasteless.items.dtos.RequestCreationDTO;
import com.codewithjj.wasteless.items.entities.ItemRequest;
import com.codewithjj.wasteless.items.services.ItemRequestServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("requests")
@Tag(name = "Requests", description = "Requests for items")
public class RequestController {
    ItemRequestServiceImpl itemRequestService;

    @Autowired
    public RequestController(ItemRequestServiceImpl itemRequestService) {
        this.itemRequestService = itemRequestService;
    }

    @PostMapping
    public  ResponseEntity<ItemRequest> createRequest(@RequestBody RequestCreationDTO dto) {
         ItemRequest createdItemRequest = itemRequestService.createRequest(dto);
        return new ResponseEntity<>(createdItemRequest, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public  ResponseEntity<ItemRequest> getRequestById(@PathVariable String id) {
        ItemRequest createdItemRequest = itemRequestService.getRequestById(id);
        return new ResponseEntity<>(createdItemRequest, HttpStatus.CREATED);
    }
    @GetMapping("{userId}/list")
    public  ResponseEntity<List<ItemRequest>> getAllRequestsByUserId(@PathVariable String userId) {
        List<ItemRequest> createdItemRequest = itemRequestService.getAllRequestsByUserId(userId);
        return new ResponseEntity<>(createdItemRequest, HttpStatus.CREATED);
    }
    @PatchMapping("{id}/reject")
    public  ResponseEntity<ItemRequest> rejectRequest(@PathVariable String id) {
        ItemRequest createdItemRequest = itemRequestService.rejectRequest(id);
        return new ResponseEntity<>(createdItemRequest, HttpStatus.CREATED);
    }

    @PatchMapping("{id}/accept")
    public  ResponseEntity<ItemRequest> acceptRequest(@PathVariable String id) {
        ItemRequest createdItemRequest = itemRequestService.acceptRequest(id);
        return new ResponseEntity<>(createdItemRequest, HttpStatus.CREATED);
    }

@DeleteMapping("{id}")
    public  String deleteRequest(@PathVariable String id) {
        return itemRequestService.deleteRequestById(id);
    }

}
