const mysql = require('mysql2/promise');

export default async function handler(req, res) {
  // CORS 허용 (어느 컴퓨터에서 열어도 데이터가 오도록 설정)
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 4000,
      ssl: { rejectUnauthorized: false }
    });

    const [rows] = await connection.execute('SELECT * FROM fish');
    await connection.end();

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
