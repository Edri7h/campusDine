package com.campus.canteen.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "outlets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Outlet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "outlet_id")
    private Long outletId;
    
    @Column(name = "outlet_name", nullable = false, length = 100)
    private String outletName;
    
    @Column(nullable = false, length = 200)
    private String location;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.Open;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    public enum Status {
        Open, Closed
    }
}
