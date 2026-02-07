package com.campus.canteen.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long order_id;
    private String outlet_name;
    private Long user_id;
    private String delivery_location;
    private String status;
    private BigDecimal total_amount;
    private String order_type;
    private String scheduled_time;
}
