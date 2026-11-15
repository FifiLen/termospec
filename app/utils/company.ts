import type { CompanyData } from "~~/schemas/company";

// "+48 (32) 435 80 50" → "tel:+48324358050"
export const telephoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const companyMapUrl = (company: CompanyData, embed = false) => {
  const street = company.address.street.replace(/^ul\.\s*/i, "");
  const query = encodeURIComponent(`${company.legalName}, ${street}, ${company.address.city}`);

  return embed
    ? `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/?q=${query}`;
};
