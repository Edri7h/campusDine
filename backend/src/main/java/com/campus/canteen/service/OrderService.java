package com.campus.canteen.service;

import com.campus.canteen.dto.OrderResponse;
import com.campus.canteen.dto.PlaceOrderRequest;
import com.campus.canteen.entity.*;
import com.campus.canteen.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OutletRepository outletRepository;
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Transactional
    public Long placeOrder(PlaceOrderRequest request) {
        User user = userRepository.findById(request.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Outlet outlet = outletRepository.findById(request.getOutlet_id())
                .orElseThrow(() -> new RuntimeException("Outlet not found"));
        
        Order order = new Order();
        order.setUser(user);
        order.setOutlet(outlet);
        order.setOrderType(request.getOrder_type());
        order.setScheduledTime(request.getScheduled_time());
        order.setDeliveryLocation(request.getDelivery_location());
        
        // Calculate total amount
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (PlaceOrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getItem_id())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));
            
            BigDecimal itemTotal = menuItem.getPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.getQuantity());
            order.getOrderItems().add(orderItem);
        }
        
        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        
        return savedOrder.getOrderId();
    }
    
    public List<OrderResponse> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUser_UserIdOrderByOrderDateDesc(userId);
        return orders.stream().map(this::convertToOrderResponse).collect(Collectors.toList());
    }
    
    public List<OrderResponse> getOutletOrders(Long outletId) {
        List<Order> orders = orderRepository.findByOutlet_OutletIdOrderByOrderDateDesc(outletId);
        return orders.stream().map(this::convertToOrderResponse).collect(Collectors.toList());
    }
    
    public void acceptOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus("Accepted");
        orderRepository.save(order);
    }
    
    public void updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status);
        orderRepository.save(order);
    }
    
    private OrderResponse convertToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setOrder_id(order.getOrderId());
        response.setOutlet_name(order.getOutlet().getOutletName());
        response.setUser_id(order.getUser().getUserId());
        response.setDelivery_location(order.getDeliveryLocation());
        response.setStatus(order.getOrderStatus());
        response.setTotal_amount(order.getTotalAmount());
        response.setOrder_type(order.getOrderType().name());
        if (order.getScheduledTime() != null) {
            response.setScheduled_time(order.getScheduledTime().toString());
        }
        return response;
    }
}
