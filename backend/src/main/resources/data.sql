-- Seed data for outlets
INSERT INTO outlets (outlet_name, location, status) VALUES
('Main Canteen', 'Academic Block', 'Open'),
('Coffee House', 'Library Building', 'Open'),
('Snack Corner', 'Hostel Area', 'Open');

-- Seed data for menu items
INSERT INTO menu_items (outlet_id, item_name, price, availability_status) VALUES
-- Main Canteen
(1, 'Veg Thali', 80.00, true),
(1, 'Non-Veg Thali', 120.00, true),
(1, 'Paneer Butter Masala', 90.00, true),
(1, 'Dal Makhani', 70.00, true),
(1, 'Biryani', 110.00, true),

-- Coffee House
(2, 'Cappuccino', 60.00, true),
(2, 'Latte', 65.00, true),
(2, 'Espresso', 50.00, true),
(2, 'Sandwich', 80.00, true),
(2, 'Pastry', 70.00, true),

-- Snack Corner
(3, 'Samosa', 20.00, true),
(3, 'Pakora', 30.00, true),
(3, 'Burger', 60.00, true),
(3, 'Pizza Slice', 80.00, true),
(3, 'Cold Drink', 25.00, true);
