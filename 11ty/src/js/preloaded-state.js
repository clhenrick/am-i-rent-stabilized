/**
 * preloadedState
 * use this for feature development and debugging to avoid
 * a repetitive stress injury from clicking the UI too much.
 */
export const preloadedState = {
  slides: {
    curIndex: 3,
  },
  addressGeocode: {
    status: "idle",
    error: null,
    searchResult: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-73.95757, 40.658],
          },
          properties: {
            id: "1251947",
            gid: "nycpad:venue:1251947",
            layer: "venue",
            source: "nycpad",
            source_id: "1251947",
            country_code: "US",
            name: "146 FENIMORE STREET",
            housenumber: "146",
            street: "FENIMORE STREET",
            postalcode: "11225",
            accuracy: "point",
            country: "United States",
            country_gid: "whosonfirst:country:85633793",
            country_a: "USA",
            region: "New York",
            region_gid: "whosonfirst:region:85688543",
            region_a: "NY",
            county: "Kings County",
            county_gid: "whosonfirst:county:102082361",
            county_a: "BK",
            locality: "New York",
            locality_gid: "whosonfirst:locality:85977539",
            locality_a: "NYC",
            borough: "Brooklyn",
            borough_gid: "whosonfirst:borough:421205765",
            neighbourhood: "Prospect",
            neighbourhood_gid: "whosonfirst:neighbourhood:85892955",
            label: "146 FENIMORE STREET, Brooklyn, NY, USA",
            addendum: {
              pad: {
                bbl: "3050420047",
                bin: "3115518",
                version: "24d",
              },
            },
          },
        },
      ],
    },
  },
  tenantsRights: {
    status: "idle",
    results: {
      rows: [
        {
          name: "Movement to Protect the People",
          full_address: null,
          email: "info@mtopp.org",
          phone: "(718) 703-3086",
          description: "anti-displacement activist group",
          service_area: "Prospect Lefferts Gardens",
          website_url: "http://mtopp.org/",
        },
        {
          name: "Prospect Park East Network",
          full_address: null,
          email: "ppeastnet@gmail.com",
          phone: "347 413-9273",
          description:
            "PPEN is an organization of concerned residents formed to address irresponsible development (e.g. 626 Flatbush, 23 floors towing over the Park) and the larger concerns it brings, which include the urgent need for contextual zoning and impact studies on such issues as low income and affordable housing, traffic, subways, parking, schools, safety, sanitation and the Park itself.",
          service_area: "Prospect Lefferts Gardens",
          website_url: "http://www.ppen.org/",
        },
      ],
      schema: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "full_address",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
        {
          name: "phone",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "service_area",
          type: "string",
        },
        {
          name: "website_url",
          type: "string",
        },
      ],
      meta: {
        cacheHit: false,
        totalBytesProcessed: "486756",
        location: "US",
      },
    },
    error: null,
  },
  rentStabilized: {
    status: "idle",
    match: {
      rows: [
        {
          bbl: 3050420047,
        },
      ],
      schema: [
        {
          name: "bbl",
          type: "number",
        },
      ],
      meta: {
        cacheHit: false,
        totalBytesProcessed: "486848",
        location: "US",
      },
    },
    error: null,
  },
};
