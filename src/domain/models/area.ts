/** A district inside the launch city, used for customer location and artist coverage. */
export type Area = {
  id: string;
  name: string;
  city: string;
  /** Approximate district centre, used to estimate coverage by radius. */
  latitude: number;
  longitude: number;
};
