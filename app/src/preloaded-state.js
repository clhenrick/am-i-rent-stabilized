/**
 * preloadedState
 * use this for feature development and debugging to avoid
 * a repetitive stress injury from clicking the UI too much.
 */
export const preloadedState = {
  slides: {
    curIndex: 7,
  },
  tenantsRights: {
    status: "idle",
    results: {
      rows: [
        {
          name: "North West Bushwick Community Group",
          full_address: "",
          email: "NWBcommunity@gmail.com",
          phone: "",
          description: "community group serving Bushwick, Brooklyn, NY",
          service_area: "Bushwick",
          website_url: "NWBcommunity.org",
        },
        {
          name: "Make The Road New York (Brooklyn)",
          full_address: "301 Grove Street  BK 11237",
          email: "",
          phone: "(718) 418-7690",
          description:
            "Make the Road New York (MRNY) builds the power of Latino and working class communities to achieve dignity and justice through organizing, policy innovation, transformative education, and survival services.",
          service_area: "Bushwick",
          website_url: "http://www.maketheroad.org/",
        },
        {
          name:
            "Ridgewood Bushwick Senior Citizens Council Legal Empowerment & Assistance Program (Bushwick Office)",
          full_address: "1475 Myrtle Ave.  BK 11237",
          email: "",
          phone: "(347) 295-3738",
          description:
            "homeless prevention, re-housing from shelter, legal services, veteran’s services, adult education, and job training and placement.  We also offer ongoing tenants’ rights and financial literacy trainings for community residents.",
          service_area: "Bushwick",
          website_url: "http://www.empowermentcenter.org",
        },
        {
          name: "Bushwick Housing Independence Project",
          full_address: "",
          email: "bhipbrooklyn@gmail.com",
          phone: "",
          description:
            "The Bushwick Housing Independence Project helps to preserve existing affordable housing for low and moderate-income families in Bushwick.",
          service_area: "Bushwick",
          website_url: "http://www.bhip-brooklyn.org/",
        },
        {
          name: "Ridgewood Bushwick Senior Citizens Council (main office)",
          full_address: "217 Wyckoff Avenue  BK 11237",
          email: "<nstanczyk@rbscc.org",
          phone: "718 366 3800 x1005",
          description:
            "homeless prevention, re-housing from shelter, legal services, veteran’s services, adult education, and job training and placement.  We also offer ongoing tenants’ rights and financial literacy trainings for community residents.",
          service_area: "Bushwick",
          website_url: "http://www.empowermentcenter.org",
        },
      ],
      time: 0.005,
      fields: {
        name: {
          type: "string",
          pgtype: "text",
        },
        full_address: {
          type: "string",
          pgtype: "text",
        },
        email: {
          type: "string",
          pgtype: "text",
        },
        phone: {
          type: "string",
          pgtype: "text",
        },
        description: {
          type: "string",
          pgtype: "text",
        },
        service_area: {
          type: "string",
          pgtype: "text",
        },
        website_url: {
          type: "string",
          pgtype: "text",
        },
      },
      total_rows: 5,
    },
    error: null,
  },
};
