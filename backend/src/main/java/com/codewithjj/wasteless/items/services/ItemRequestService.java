package com.codewithjj.wasteless.items.services;

import com.codewithjj.wasteless.items.dtos.RequestCreationDTO;
import com.codewithjj.wasteless.items.entities.ItemRequest;

import java.util.List;

public interface ItemRequestService {
    ItemRequest createRequest(RequestCreationDTO requestCreationDTO);
    ItemRequest getRequestById(String id);
    List<ItemRequest> getAllRequestsByUserId(String userId);
    List<ItemRequest> getIncomingRequestsByUserId(String userId);
    List<ItemRequest> getOutgoingRequestsByUserId(String userId);
    String deleteRequestById(String id);
    ItemRequest acceptRequest(String id);
    ItemRequest rejectRequest(String id);

}
