package com.campus.canteen.controller;

import com.campus.canteen.dto.MessageResponse;
import com.campus.canteen.entity.MenuItem;
import com.campus.canteen.entity.Outlet;
import com.campus.canteen.service.OutletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OutletController {
    
    @Autowired
    private OutletService outletService;
    
    @GetMapping("/outlets")
    public ResponseEntity<List<Outlet>> getAllOutlets() {
        return ResponseEntity.ok(outletService.getAllOutlets());
    }
    
    @GetMapping("/outlets/{id}/menu")
    public ResponseEntity<List<MenuItem>> getOutletMenu(@PathVariable Long id) {
        return ResponseEntity.ok(outletService.getOutletMenu(id));
    }
    
    @PutMapping("/menu/{id}/availability")
    public ResponseEntity<MessageResponse> updateMenuAvailability(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> request) {
        outletService.updateMenuItemAvailability(id, request.get("availability_status"));
        return ResponseEntity.ok(new MessageResponse("Menu item availability updated"));
    }
}
