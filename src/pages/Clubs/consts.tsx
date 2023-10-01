import Label from "components/Label";

export const PAID_STATUS = {
  cash: (
    <Label variant="filled" color="success">
      Cash
    </Label>
  ),
  momo: (
    <Label variant="filled" color="#ad006c">
      Momo
    </Label>
  ),
  bank: (
    <Label variant="filled" color="#826AF9">
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
export const EVENT_TYPES = ["badminton", "bowling"];
export const BOWLING_VOTE_TYPE = [
  { id: "play", color: "#54D62C" },
  { id: "compete", color: "#f50" },
];
