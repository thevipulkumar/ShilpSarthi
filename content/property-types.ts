/**
 * Property types offered in the enquiry forms.
 *
 * This is the only surviving piece of the old pricing configuration. The
 * per-square-foot rate matrix and the estimator it fed were removed at the
 * owner's direction, along with the public pricing page. Nothing on the site
 * quotes a figure any more except the single "from Rs. 3.5 Lakh" headline in
 * config/site.ts.
 */
export type PropertyType = { id: string; label: string };

export const propertyTypes: PropertyType[] = [
  { id: '2bhk', label: '2 BHK' },
  { id: '3bhk', label: '3 BHK' },
  { id: '4bhk', label: '4 BHK' },
  { id: 'villa', label: 'Villa' },
  { id: 'independent-house', label: 'Independent house' },
  { id: 'under-construction', label: 'Under construction' },
  { id: 'other', label: 'Something else' },
];
