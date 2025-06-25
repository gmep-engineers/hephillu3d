const deleteBankCard = async function (conn, dto) {
  const query = `delete from bank_cards where id = ?`;
  await conn.query(query, [dto.id]);
};
