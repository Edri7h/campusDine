package com.campus.canteen.service;

import com.campus.canteen.entity.MenuItem;
import com.campus.canteen.entity.Outlet;
import com.campus.canteen.repository.MenuItemRepository;
import com.campus.canteen.repository.OutletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutletService {
    
    @Autowired
    private OutletRepository outletRepository;
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    public List<Outlet> getAllOutlets() {
        return outletRepository.findAll();
    }
    
    public List<MenuItem> getOutletMenu(Long outletId) {
        return menuItemRepository.findByOutlet_OutletId(outletId);
    }
    
    public void updateMenuItemAvailability(Long itemId, Boolean availability) {
        MenuItem menuItem = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        menuItem.setAvailabilityStatus(availability);
        menuItemRepository.save(menuItem);
    }
}
