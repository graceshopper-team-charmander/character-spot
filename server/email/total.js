const total = (subtotal, shipping) =>{
  return (`<tr>
  <td align='left' style='font-size:0px;padding:0px 25px;word-break:break-word;'>
    <table border='0' cellpadding='0' cellspacing='0' style='cellpadding:0;cellspacing:0;color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;' width='100%'>
      <tr style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif; color:#777777">
        <td width='50%'>
        </td>
        <td style='text-align:right; padding-right: 10px; border-top: 0px solid #cccccc;'>
          <span style='padding:8px 0px; display: inline-block;'>
            Subtotal
          </span>
          <br />
          <span style='padding-bottom:8px; display: inline-block;'>
            Shipping
          </span>
          <br />
          <span style='display: inline-block;font-weight: bold; color: #4d4d4d'>
            Total
          </span>
        </td>
        <td style='text-align: right; border-top: 0px solid #cccccc;'>
          <span style='padding:8px 0px; display: inline-block;'>
            $${(subtotal / 100).toLocaleString('en')}
          </span>
          <br />
          <span style='padding-bottom:8px; display: inline-block;'>
          $${(shipping / 100).toFixed(2)}
          </span>
          <br />
          <span style='display: inline-block;font-weight: bold; color: #4d4d4d'>
           $${((subtotal + shipping)/100).toLocaleString('en')}
          </span>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr style="font-size:14px; line-height:19px; font-family: 'Oxygen', 'Helvetica Neue', helvetica, sans-serif; color:#777777;background-color: #000000'">
  <td> &nbsp;  </td>
</tr>`
)}


module.exports = total
