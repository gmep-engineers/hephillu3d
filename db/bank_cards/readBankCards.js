const readBankCards = async function (conn, dto) {
  var query = "";
  var result = [];
  if (dto.owner_id) {
    query = `select * from bank_cards where owner_id = ?`;
    [result] = await conn.query(query, [dto.owner_id]);
  } else {
    query = `select * from bank_cards`;
    [result] = await conn.query(query);
  }
  const resList = [];
  for (let i = 0; i < result.length; i++) {
    const res = result[i];
    resList.push({
      id: res.id,
      owner_id: res.owner_id,
      card_number_hash: res.card_number_hash,
      expiry_date_hash: res.expiry_date_hash,
      name_on_card_hash: res.name_on_card_hash,
      street: res.street,
      unit: res.unit,
      city: res.city,
      state: res.state,
      postal_code: res.postal_code,
      county_iso: res.county_iso,
    });
  }
  return resList;
};
module.exports = readBankCards;
