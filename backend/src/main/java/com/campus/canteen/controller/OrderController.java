package com.campus.canteen.controller;

import com.campus.canteen.dto.MessageResponse;
import com.campus.canteen.dto.OrderResponse;
import com.campus.canteen.dto.PlaceOrderRequest;
import com.campus.canteen.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        Long orderId = orderService.placeOrder(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Order placed successfully");
        response.put("order_id", orderId);
        response.put("status", "Placed");
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<List<OrderResponse>> getUserOrders(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getUserOrders(id));
    }
    
    @GetMapping("/outlet/{id}")
    public ResponseEntity<List<OrderResponse>> getOutletOrders(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOutletOrders(id));
    }
    
    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptOrder(@PathVariable Long id) {
        orderService.acceptOrder(id);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Order accepted");
        response.put("status", "Accepted");
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<MessageResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        orderService.updateOrderStatus(id, request.get("status"));
        return ResponseEntity.ok(new MessageResponse("Order status updated successfully"));
    }
}
