const createBankCard = async function (conn, dto) {
  const query = `
    insert into bank_cards (
        id,
        owner_id,
        card_number_hash,
        expiry_date_hash,
        name_on_card_hash,
        street,
        unit,
        city,
        state,
        postal_code
    ) values (
        null,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `;
  const [result] = await conn.query(query, [
    dto.owner_id,
    dto.card_number_hash,
    dto.expiry_date_hash,
    dto.name_on_card_hash,
    dto.street,
    dto.unit,
    dto.city,
    dto.state,
    dto.postal_code,
  ]);
  return result.insertId;
};
module.exports = createBankCard;
