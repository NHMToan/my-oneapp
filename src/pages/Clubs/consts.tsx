import Label from "components/Label";

import { Trans } from "react-i18next";
export const PAID_STATUS = {
  cash: (
    <Label variant="filled" color="success">
      <Trans i18nKey="club.event.details.paid_status.cash" />
    </Label>
  ),
  momo: (
    <Label variant="filled" color="success">
      <Trans i18nKey="club.event.details.paid_status.momo" />
    </Label>
  ),
  bank: (
    <Label variant="filled" color="success">
      <Trans i18nKey="club.event.details.paid_status.bank" />
    </Label>
  ),
  none: (
    <Label variant="filled" color="error">
      <Trans i18nKey="club.event.details.paid_status.none" />
    </Label>
  ),
};
