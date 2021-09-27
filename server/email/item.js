
const item = (item) => {
  return (`<tr>
  <td align='left' style='font-size:0px;padding:10px 25px;border: 3px solid #fcd000;border-radius:4px;word-break:break-word;'>
    <table border='0' cellpadding='0' cellspacing='0' style='cellpadding:0;cellspacing:0;color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;' width='100%'>
      <tr style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif; color:#777777;background-color: #000000'">
        <td width='50%'>
          <table cellpadding='0' cellspacing='0' style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif;" width='100%'>
            <tbody>
              <tr>
                <td style='padding-right:5px;' width='35%'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                    <tbody>
                      <tr>
                        <td style='width:110px;'>
                          <a href='https://character-spot.herokuapp.com/products/${item.id}' target='_blank'>
                            <img alt='item1' height='auto' src='${item.imageUrl}' style='border: 1px solid #e6e6e6;border-radius:4px;display:block;font-size:13px;height:auto;outline:none;text-decoration:none;width:100%;' width='110' />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style="text-align:left; font-size:14px; line-height:19px; font-family: ' oxygen', 'helvetica neue', helvetica, sans-serif; color: #777777;">
                  <span style='color: #4d4d4d; font-weight:bold;'>
                    ${item.name}
                  </span>
                  <br />
                  ${item.description}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td style='text-align:center; ' width='10%'>
          ${item.cart.cartQuantity}
        </td>
        <td style='text-align:right; ' width='10%'>
          $${(item.price / 100).toLocaleString('en')}
        </td>
      </tr>
      </table>
  </td>
</tr>`
)}

module.exports = item
