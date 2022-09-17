const Item = (props) => {
  const { plane, buttonClick, index } = props;

  let usDollar = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className='item_row'>
      <div className='airplane_wrapper'>
        <div className='airplane_detail'> {plane.year} {plane.mfr} {plane.model} </div>
        <div className='airplane_value'>{usDollar.format(plane.value)}</div>
      </div>
      <div className='button_wrapper'>
        <button className='edit_button' data-item={index} onClick={buttonClick}>Edit</button>
        <button className='delete_button' data-item={index} onClick={buttonClick}>Delete</button>
      </div>
    </div>
  );
}

export default Item;
