package com.campus.canteen.repository;

import com.campus.canteen.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser_UserIdOrderByOrderDateDesc(Long userId);
    List<Order> findByOutlet_OutletIdOrderByOrderDateDesc(Long outletId);
}
