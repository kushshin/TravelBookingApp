 const Promo = (req, res) => {
  const { code } = req.body;
  const validPromoCodes = {
    SAVE10: "10% off",
    FLAT100: "₹100 off",
  };

  if (validPromoCodes[code]) res.json({ valid: true, message: validPromoCodes[code] });
  else res.json({ valid: false, message: "Invalid promo code" });
};

export{Promo}
