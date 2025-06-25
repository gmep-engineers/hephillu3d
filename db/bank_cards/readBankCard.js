const readBankCard = async function (conn, dto) {
  const query = `
    select * from bank_cards where id = *
    `;
  const [result] = await conn.query(query, [dto.id]);
  if (result.length > 0) {
    const res = result[0];
    return {
      id: res.id,
      owner_id: res.owner_id,
      card_number_hash: res.card_number_hash,
      expiry_date_hash: res.expiry_date_hash,
      name_on_card_hash: res.name_on_card_hash,
      street: res.street,
      city: res.city,
      state: res.state,
      postal_code: res.postal_code,
      country_iso: res.country_iso,
    };
  }
};
module.exports = readBankCard;
