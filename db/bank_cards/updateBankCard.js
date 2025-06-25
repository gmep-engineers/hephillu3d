const updateBankCard = async function (conn, dto) {
  const query = `
    update bank_cards set
    card_number_hash = ?,
    expiry_date_hash = ?,
    name_on_card_hash = ?,
    street = ?,
    city = ?,
    state = ?,
    postal_code = ?
    country_iso = ?
    where id = ?
    `;
  const bankCard = await readBankCard(conn, dto);
  if (!bankCard) return;
  await conn.query(query, [
    dto.card_number_hash || bankCard.card_number_hash,
    dto.expiry_date_hash || bankCard.expiry_date_hash,
    dto.name_on_card_hash || bankCard.name_on_card_hash,
    dto.city || bankCard.city,
    dto.state || bankCard.state,
    dto.postal_code || bankCard.postal_code,
    dto.country_iso || bankCard.country_iso,
    dto.id,
  ]);
};
module.exports = updateBankCard;
