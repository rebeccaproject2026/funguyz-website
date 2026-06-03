export const categories = [
  {name:'Magic Mushrooms', desc:'Premium dried strains and customer favorites.', gradient:'from-purple-100 to-pink-100'},
  {name:'Edibles', desc:'Gummies, chocolates, teas and hot chocolate.', gradient:'from-pink-100 to-yellow-100'},
  {name:'Capsules', desc:'Convenient, measured wellness capsules.', gradient:'from-cyan-100 to-white'},
  {name:'Microdose', desc:'Small dose blends for daily rituals.', gradient:'from-emerald-100 to-purple-100'},
];
export const products = [
  ['Golden Teacher','Magic Mushrooms','$59.99','Top Rated'],['Penis Envy','Magic Mushrooms','$79.99','Premium'],['Blue Raspberry Gummies','Edibles','$34.99','Best Seller'],['Golden Teacher Capsules','Capsules','$39.99','Wellness'],['Microdose Daily Blend','Microdose','$29.99','Daily'],['Jack Frost','Magic Mushrooms','$69.99','Rare'],['Milk Chocolate Bar','Edibles','$27.99','Smooth'],['Focus Capsules','Capsules','$31.99','Focus']
];

export function getSubcategories(label: string): string[] {
  switch (label) {
    case 'Magic Mushrooms':
      return [
        "Golden Teacher", "Blue Pulaski", "Texas Yellow Cap", "Vietnamese", "B+",
        "Mazatapec", "Treasure Coast", "Cambodian", "Penis Envy", "Golden Penis Envy",
        "Blue Meanies", "Squat Mak", "Thrasher", "Jedi Mind Fuck", "Melmac",
        "Tidal Wave", "Albino Penis Envy", "Albino Extra Terrestrial", "Albino Jedi Mind Fuck", "Albino Snow White",
        "Albino SV-13", "Albino Treasure Coast", "Jack Frost", "Yeti", "APER",
        "Avalanche", "Dino Eggs", "Full Moon Party", "Koh Samui", "Shakti"
      ];
    case 'Edibles':
      return [
        "Blue Raspberry Gummies", "Watermelon Gummies", "Strawberry Gummies", "Peach Gummies", "Tropical Gummies",
        "Mixed Berry Gummies", "Milk Chocolate Bar", "Dark Chocolate Bar", "Cookies & Cream Chocolate", "Mint Chocolate Bar",
        "Salted Caramel Chocolate", "White Chocolate Bar", "Chai Mushroom Tea", "Lemon Ginger Tea", "Berry Hibiscus Tea",
        "Relaxation Tea", "Energy Tea", "Mushroom Hot Chocolate"
      ];
    case 'Capsules':
      return [
        "Golden Teacher Capsules", "Penis Envy Capsules", "Blue Meanies Capsules", "Focus & Clarity Capsules", "Mood Support Capsules",
        "Energy Boost Capsules", "Creative Boost Capsules", "Relax & Chill Capsules", "Beginner Friendly Capsules", "Balanced Mind Capsules",
        "Lion’s Mane Capsules", "Reishi Capsules", "Cordyceps Capsules", "Chaga Capsules"
      ];
    case 'Microdose':
      return [
        "Golden Teacher Microdose", "Penis Envy Microdose", "Blue Meanies Microdose", "Daily Wellness Microdose", "Focus & Clarity Microdose",
        "Creative Boost Microdose", "Mood Support Microdose", "Energy Boost Microdose", "Relax & Chill Microdose", "Beginner Friendly Microdose",
        "Balanced Mind Microdose", "Lion’s Mane Microdose Blend", "Stamets Stack Microdose", "Premium Microdose Blend"
      ];
    default:
      return [];
  }
}

