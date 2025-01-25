import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'damage_reports',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const saveReport = async (data: {
  damageType: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  photo: File;
}) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO damage_reports (damage_type, description, location, coordinates, photo) VALUES (?, ?, ?, ?, ?)',
      [data.damageType, data.description, data.location, JSON.stringify(data.coordinates), data.photo]
    );
    connection.release();
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};