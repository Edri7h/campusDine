package com.campus.canteen.dto;

import com.campus.canteen.entity.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PlaceOrderRequest {
    @NotNull(message = "User ID is required")
    private Long user_id;
    
    @NotNull(message = "Outlet ID is required")
    private Long outlet_id;
    
    @NotNull(message = "Order type is required")
    private Order.OrderType order_type;
    
    private LocalDateTime scheduled_time;
    
    @NotBlank(message = "Delivery location is required")
    private String delivery_location;
    
    @NotEmpty(message = "Order items cannot be empty")
    private List<OrderItemRequest> items;
    
    @Data
    public static class OrderItemRequest {
        @NotNull(message = "Item ID is required")
        private Long item_id;
        
        @NotNull(message = "Quantity is required")
        private Integer quantity;
    }
}
