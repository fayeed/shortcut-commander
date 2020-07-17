type OS = "Windows" | "Macintosh" | "Unknown OS";

export function getOS(): OS {
  let OSName: OS = "Unknown OS";

  if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
  if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
  if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Windows";

  return OSName;
}
