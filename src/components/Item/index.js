const Item = (props) => {
  const { plane, buttonClick, index } = props;
  const { reg, mfr, model, value } = plane;

  // formatting for the value for each aircraft
  let usDollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="item_row">
      <div className="airplane_wrapper">
        <div className="airplane_detail">{reg} {mfr} {model}</div>
        <div className="airplane_value">{usDollar.format(value)}</div>
      </div>
      <div className="button_wrapper">
        {/* uses the prop index to identify the record when edit or delete are clicked */}
        <button className="edit_button" data-item={index} onClick={buttonClick}>Edit</button>
        <button className="delete_button" data-item={index} onClick={buttonClick}>Delete</button>
      </div>
    </div>
  );
};

export default Item;
