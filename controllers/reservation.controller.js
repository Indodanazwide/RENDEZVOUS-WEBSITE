import db from "../database/db.js";

// Get all reservations
export const getReservations = async (req, res) => {
    try {
        const [reservations] = await db.execute(`SELECT * FROM reservations`);
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'An error occurred while fetching reservations' });
    }
};

// Create a new reservation
export const createReservation = async (req, res) => {
    const { name, email, date, guests, specialRequest } = req.body; // Updated variable names

    try {
        await db.execute(
            `INSERT INTO reservations (reservation_name, reservation_email, reservation_date, reservation_guests, reservation_special_request) 
             VALUES (?, ?, ?, ?, ?)`, 
            [name, email, date, guests, specialRequest] // Use updated variable names here
        );

        res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'An error occurred while creating reservation' });
    }
};

// Update an existing reservation
export const updateReservation = async (req, res) => {
    const { reservation_id } = req.params;
    const { name, email, date, guests, specialRequest } = req.body; // Updated variable names

    try {
        const [result] = await db.execute(
            `UPDATE reservations SET reservation_name = ?, reservation_email = ?, reservation_date = ?, 
             reservation_guests = ?, reservation_special_request = ? WHERE reservation_id = ?`, 
            [name, email, date, guests, specialRequest, reservation_id] // Use updated variable names here
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation updated successfully' });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'An error occurred while updating reservation' });
    }
};

// Cancel a reservation
export const cancelReservation = async (req, res) => {
    const { reservation_id } = req.params;

    try {
        const [result] = await db.execute(`DELETE FROM reservations WHERE reservation_id = ?`, [reservation_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error canceling reservation:', error);
        res.status(500).json({ error: 'An error occurred while canceling reservation' });
    }
};