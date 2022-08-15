import Label from "components/Label";

export const PAID_STATUS = {
  cash: (
    <Label variant="filled" color="success">
      Cash
    </Label>
  ),
  momo: (
    <Label variant="filled" color="success">
      Momo
    </Label>
  ),
  bank: (
    <Label variant="filled" color="success">
      Bank
    </Label>
  ),
  none: (
    <Label variant="filled" color="error">
      Unpaid
    </Label>
  ),
  prepaid: (
    <Label variant="filled" color="info">
      Prepaid
    </Label>
  ),
};
