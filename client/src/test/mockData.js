// import { logDOM } from "@testing-library/react";

export const mockItemDetails = [
  {
    "_id": "663bc83747cfae58ed5c3ca8",
    "photos": ["https://i.pinimg.com/originals/ec/04/10/ec0410f1844b47b04687675bc91913f5.jpg", "https://i.pinimg.com/originals/e2/c3/2c/e2c32c3cc36fcb5b0ccd7db353c89dbf.png", "https://i.pinimg.com/originals/59/65/f9/5965f9f85874b87217027c2bc2033e8d.jpg"],
    "name": "Item Name 1",
    "caption": "Description about Item 1 here.",
    "brand": { "name": "Brand", "uri": "brand" },
    "price": 4500,
    "sizes": ["M", "L"]
  },
  {
    "_id": "663bc83747cfae58ed5c3ca9",
    "photos": ["https://i.pinimg.com/originals/ec/04/10/ec0410f1844b47b04687675bc91913f5.jpg"],
    "name": "Item Name 2",
    "caption": "Description about Item 2 here.",
    "brand": { "name": "Brand", "uri": "brand" },
    "price": 5000,
    "sizes": ["S", "M"]
  },
  {
    "_id": "663bc83747cfae58ed5c3caa",
    "photos": ["https://i.pinimg.com/originals/ec/04/10/ec0410f1844b47b04687675bc91913f5.jpg"],
    "name": "Item Name 3",
    "caption": "Description about Item 3 here.",
    "brand": { "name": "AnotherBrand", "uri": "another-brand" },
    "price": 5500,
    "sizes": ["L", "XL"]
  }
  // Add more items if needed
];

export const mockBrandDetails = [
  {
    name: "Brand",
    description: "Zdes' mozhno pomestit' opisanie vashego brenda.",
    logo: "https://i.pinimg.com/originals/96/23/0b/96230bd6504f8961e38ed3d7cc1078b2.jpg",
  },
];