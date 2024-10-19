import db from "../database/db.js";

// categories
export const getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute(`SELECT * FROM categories`);
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'An error occurred while fetching categories' });
    }
};

// menu
export const getMenuItems = async (req, res) => {
    try {
        const [menuItems] = await db.execute(`SELECT * FROM menu_items`);
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'An error occurred while fetching menu items' });
    }
};

export const getMenuItemById = async (req, res) => {
    const { menu_item_id } = req.params;

    try {
        const [menuItem] = await db.execute(`SELECT * FROM menu_items WHERE menu_item_id = ?`, [menu_item_id]);
        if (menuItem.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem[0]);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ error: 'An error occurred while fetching the menu item' });
    }
};

export const getMenuItemsByCategory = async (req, res) => {
    const { category_id } = req.params;

    try {
        const [menuItems] = await db.execute(`SELECT * FROM menu_items WHERE category_id = ?`, [category_id]);
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by category:', error);
        res.status(500).json({ error: 'An error occurred while fetching menu items' });
    }
};

// cart
export const getCartItems = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the JWT token

    try {
        const [cartItems] = await db.execute(
            `SELECT c.quantity, m.menu_item_id, m.menu_item_name, m.menu_item_image, m.menu_item_price
             FROM cart c
             JOIN menu_items m ON c.menu_item_id = m.menu_item_id
             WHERE c.user_id = ?`, 
            [userId]
        );

        res.json(cartItems); // Send the cart items as the response
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
};

export const addItemToCart = async (req, res) => {
    const userId = req.user.id; // Corrected to match your JWT payload
    const { menu_item_id, quantity = 1 } = req.body; // Set a default quantity if not provided

    try {
        const [existingItem] = await db.execute(
            `SELECT * FROM cart WHERE user_id = ? AND menu_item_id = ?`, 
            [userId, menu_item_id]
        );

        if (existingItem.length > 0) {
            const newQuantity = existingItem[0].quantity + quantity;
            await db.execute(
                `UPDATE cart SET quantity = ? WHERE user_id = ? AND menu_item_id = ?`,
                [newQuantity, userId, menu_item_id]
            );
            return res.status(200).json({ message: 'Cart item quantity updated successfully' });
        } else {
            await db.execute(
                `INSERT INTO cart (user_id, menu_item_id, quantity) VALUES (?, ?, ?)`, 
                [userId, menu_item_id, quantity]
            );
            return res.status(201).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding item to cart' });
    }
};

export const updateCartItem = async (req, res) => {
    const { cart_id } = req.params;
    const { quantity } = req.body;

    try {
        const [result] = await db.execute(
            `UPDATE cart SET quantity = ? WHERE cart_id = ?`, 
            [quantity, cart_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'An error occurred while updating cart item' });
    }
};

export const removeItemFromCart = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the JWT token
    const { menu_item_id } = req.params; // Get the menu_item_id from the URL parameters

    try {
        await db.execute(
            `DELETE FROM cart WHERE user_id = ? AND menu_item_id = ?`,
            [userId, menu_item_id]
        );

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing item from cart' });
    }
};