import { format, formatDistanceToNow, getTime } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date, formatDate = "dd MMMM yyyy") {
  return format(new Date(date), formatDate);
}
export function fSDate(date, formatDate = "dd/MM/yyyy") {
  return format(new Date(date), formatDate);
}
export function fDateTime(date) {
  return format(new Date(date), "eeee dd MMM yyyy, HH:mm");
}

export function fSDateTime(date) {
  return format(new Date(date), "eeee d/M, HH:mm");
}

export function fFullTime(date) {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
}
export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
