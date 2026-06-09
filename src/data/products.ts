export const categories = [
  {name:'Magic Mushrooms', desc:'Premium dried strains and customer favorites.', gradient:'from-purple-100 to-pink-100'},
  {name:'Edibles', desc:'Gummies, chocolates, teas and hot chocolate.', gradient:'from-pink-100 to-yellow-100'},
  {name:'Capsules', desc:'Convenient, measured wellness capsules.', gradient:'from-cyan-100 to-white'},
  {name:'Microdose', desc:'Small dose blends for daily rituals.', gradient:'from-emerald-100 to-purple-100'},
];

export interface GroupedCategoryItem {
  groupName?: string;
  items: string[];
}

export const menuGroups: Record<string, GroupedCategoryItem[]> = {
  'Magic Mushrooms': [
    {
      items: [
        'Golden Teacher',
        'Penis Envy',
        'Blue Meanies',
        'Albino Penis Envy (APE)',
        'Tidal Wave',
        'Jack Frost',
        'Jedi Mind Fuck (JMF)',
        'Mazatapec',
        'B+',
        'Treasure Coast',
        'Melmac',
        'Enigma',
        'Hillbilly',
        'Thai Pink Buffalo'
      ]
    }
  ],
  'Edibles': [
    {
      groupName: 'Chocolate Bars',
      items: [
        'Golden Teacher Original Chocolate (GT OG)',
        'Golden Teacher Concentrated Chocolate (GT CC)',
        'Penis Envy Original Chocolate (PE OG)',
        'Penis Envy Refined Concentrate Chocolate (PE RC)',
        'Penis Envy Concentrated Chocolate (PE CC)'
      ]
    },
    {
      groupName: 'Gummies',
      items: [
        'Blue Raspberry Gummies',
        'Watermelon Gummies',
        'Strawberry Gummies',
        'Mango Gummies',
        'Green Apple Gummies',
        'Mixed Berry Gummies'
      ]
    },
    {
      groupName: 'S\'Mores',
      items: [
        'Golden Teacher S\'Mores',
        'Penis Envy S\'Mores',
        'Cookies & Cream S\'Mores'
      ]
    }
  ],
  'Capsules': [
    {
      groupName: 'Functional Mushroom Capsules',
      items: [
        'Lion\'s Mane Capsules',
        'Reishi Capsules',
        'Cordyceps Capsules',
        'Turkey Tail Capsules',
        'Chaga Capsules'
      ]
    },
    {
      groupName: 'Extracts & Tinctures',
      items: [
        'Golden Teacher Extract',
        'Penis Envy Extract',
        'Lion\'s Mane Tincture',
        'Reishi Tincture',
        'Cordyceps Tincture'
      ]
    }
  ],
  'Microdose': [
    {
      items: [
        'Golden Teacher Microdose',
        'Penis Envy Microdose',
        'Stamets Stack Microdose',
        'Creativity Microdose Blend',
        'Productivity Microdose Blend',
        'Wellness Microdose Blend'
      ]
    }
  ]
};

export const products = [
  // Magic Mushrooms (starting 3.5g price)
  ['Golden Teacher', 'Magic Mushrooms', '$66.00', 'Top Rated'],
  ['Penis Envy', 'Magic Mushrooms', '$84.00', 'Premium'],
  ['Blue Meanies', 'Magic Mushrooms', '$78.00', 'Best Seller'],
  ['Albino Penis Envy (APE)', 'Magic Mushrooms', '$102.00', 'Rare'],
  ['Tidal Wave', 'Magic Mushrooms', '$90.00', 'New'],
  ['Jack Frost', 'Magic Mushrooms', '$90.00', 'Rare'],
  ['Jedi Mind Fuck (JMF)', 'Magic Mushrooms', '$96.00', 'Popular'],
  ['Mazatapec', 'Magic Mushrooms', '$66.00', 'Classic'],
  ['B+', 'Magic Mushrooms', '$60.00', 'Best Seller'],
  ['Treasure Coast', 'Magic Mushrooms', '$78.00', 'Rare'],
  ['Melmac', 'Magic Mushrooms', '$102.00', 'Premium'],
  ['Enigma', 'Magic Mushrooms', '$114.00', 'Rare'],
  ['Hillbilly', 'Magic Mushrooms', '$72.00', 'New'],
  ['Thai Pink Buffalo', 'Magic Mushrooms', '$72.00', 'Popular'],

  // Edibles
  ['Golden Teacher Original Chocolate (GT OG)', 'Edibles', '$54.00', 'Best Seller'],
  ['Golden Teacher Concentrated Chocolate (GT CC)', 'Edibles', '$60.00', 'Premium'],
  ['Penis Envy Original Chocolate (PE OG)', 'Edibles', '$60.00', 'Best Seller'],
  ['Penis Envy Refined Concentrate Chocolate (PE RC)', 'Edibles', '$66.00', 'Premium'],
  ['Penis Envy Concentrated Chocolate (PE CC)', 'Edibles', '$66.00', 'Strong'],
  ['Blue Raspberry Gummies', 'Edibles', '$72.00', 'Best Seller'],
  ['Watermelon Gummies', 'Edibles', '$72.00', 'Popular'],
  ['Strawberry Gummies', 'Edibles', '$72.00', 'New'],
  ['Mango Gummies', 'Edibles', '$72.00', 'Fruit'],
  ['Green Apple Gummies', 'Edibles', '$72.00', 'Sour'],
  ['Mixed Berry Gummies', 'Edibles', '$72.00', 'Juicy'],
  ['Golden Teacher S\'Mores', 'Edibles', '$66.00', 'Sweet'],
  ['Penis Envy S\'Mores', 'Edibles', '$66.00', 'Popular'],
  ['Cookies & Cream S\'Mores', 'Edibles', '$66.00', 'New'],

  // Capsules
  ['Lion\'s Mane Capsules', 'Capsules', '$42.00', 'Focus'],
  ['Reishi Capsules', 'Capsules', '$42.00', 'Relax'],
  ['Cordyceps Capsules', 'Capsules', '$48.00', 'Energy'],
  ['Turkey Tail Capsules', 'Capsules', '$42.00', 'Wellness'],
  ['Chaga Capsules', 'Capsules', '$42.00', 'Shield'],
  ['Golden Teacher Extract', 'Capsules', '$60.00', 'Premium'],
  ['Penis Envy Extract', 'Capsules', '$66.00', 'Strong'],
  ['Lion\'s Mane Tincture', 'Capsules', '$54.00', 'Daily'],
  ['Reishi Tincture', 'Capsules', '$54.00', 'Calm'],
  ['Cordyceps Tincture', 'Capsules', '$54.00', 'Active'],

  // Microdose
  ['Golden Teacher Microdose', 'Microdose', '$66.00', 'Wellness'],
  ['Penis Envy Microdose', 'Microdose', '$72.00', 'Premium'],
  ['Stamets Stack Microdose', 'Microdose', '$72.00', 'Focus'],
  ['Creativity Microdose Blend', 'Microdose', '$72.00', 'Creative'],
  ['Productivity Microdose Blend', 'Microdose', '$72.00', 'Work'],
  ['Wellness Microdose Blend', 'Microdose', '$66.00', 'Daily']
];

export function getSubcategories(label: string): string[] {
  const groups = menuGroups[label];
  if (!groups) return [];
  return groups.flatMap(g => g.items);
}

const customSlugs: Record<string, string> = {
  'Albino Penis Envy (APE)': 'albino-penis-envy',
  'Jedi Mind Fuck (JMF)': 'jedi-mind-fuck',
  'B+': 'b-plus',
  'Thai Pink Buffalo': 'thai-pink-buffalo',
  'Golden Teacher Original Chocolate (GT OG)': 'golden-teacher-original-chocolate',
  'Golden Teacher Concentrated Chocolate (GT CC)': 'golden-teacher-concentrated-chocolate',
  'Penis Envy Original Chocolate (PE OG)': 'penis-envy-original-chocolate',
  'Penis Envy Refined Concentrate Chocolate (PE RC)': 'penis-envy-refined-concentrate-chocolate',
  'Penis Envy Concentrated Chocolate (PE CC)': 'penis-envy-concentrated-chocolate',
  'Golden Teacher S\'Mores': 'golden-teacher-smores',
  'Penis Envy S\'Mores': 'penis-envy-smores',
  'Cookies & Cream S\'Mores': 'cookies-cream-smores',
  'Lion\'s Mane Capsules': 'lions-mane-capsules',
  'Lion\'s Mane Tincture': 'lions-mane-tincture',
};

export function getProductSlug(title: string): string {
  if (customSlugs[title]) return customSlugs[title];
  return title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Maps category names to their URL slugs (matching the existing /category/[slug] route)
const categorySlugMap: Record<string, string> = {
  'Magic Mushrooms': 'magic-mushrooms',
  'Edibles': 'edibles',
  'Capsules': 'capsules',
  'Microdose': 'microdose',
};

export function getCategorySlug(category: string): string {
  return categorySlugMap[category] || category.toLowerCase().replace(/\s+/g, '-');
}

// Returns the full product URL in [category]/[product] format
export function getProductUrl(title: string, category: string): string {
  return `/${getCategorySlug(category)}/${getProductSlug(title)}`;
}

export interface ProductSeoData {
  titleTag: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  description: string;
}

export const productSeoMetadata: Record<string, ProductSeoData> = {
  // Magic Mushrooms
  'Golden Teacher': {
    titleTag: 'Golden Teacher Mushroom Delivery Canada | FunGuyz',
    metaDescription: "Shop Golden Teacher mushrooms, one of Canada's most popular beginner-friendly strains. Fast delivery across Toronto, the GTA and Canada-wide shipping.",
    keywords: 'golden teacher delivery, golden teacher mushrooms canada, beginner magic mushrooms, mushroom delivery toronto',
    h1: 'Golden Teacher Magic Mushrooms',
    description: 'Golden Teacher is a highly acclaimed Psilocybe Cubensis strain that first appeared in the late 1980s. Its exact origin is unknown, but it is beloved in mycological research for its robust genetic stability, mild learning curve, and clean spore presentation.'
  },
  'Penis Envy': {
    titleTag: 'Penis Envy Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Order Penis Envy mushrooms, a highly sought-after strain known for its potency and dense caps. Fast delivery throughout Toronto, the GTA and Canada.',
    keywords: 'penis envy delivery, penis envy mushrooms canada, strong magic mushrooms, mushroom delivery gta',
    h1: 'Penis Envy Magic Mushrooms',
    description: 'Penis Envy is legendary for its mutation that prevents it from fully opening its cap, leading to highly concentrated active alkaloids. First isolated by pioneering researchers, it represents one of the most potent genetic lines available globally.'
  },
  'Blue Meanies': {
    titleTag: 'Blue Meanies Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Shop Blue Meanies mushrooms, a popular strain recognized for its unique appearance and strong reputation. Fast delivery and Canada-wide shipping.',
    keywords: 'blue meanies delivery, blue meanies mushrooms canada, mushroom delivery canada',
    h1: 'Blue Meanies Magic Mushrooms',
    description: 'Our Blue Meanies strain represents a stabilized, high-potency Psilocybe Cubensis strain selected for its rapid colonization rates and heavy blue bruising characteristics.'
  },
  'Albino Penis Envy (APE)': {
    titleTag: 'Albino Penis Envy (APE) Delivery Canada | FunGuyz',
    metaDescription: 'Order Albino Penis Envy (APE) mushrooms, a premium strain prized by experienced enthusiasts. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'ape delivery, albino penis envy canada, ape mushrooms delivery',
    h1: 'Albino Penis Envy Magic Mushrooms',
    description: 'Albino Penis Envy (APE) is one of the most visually striking and potent cultivated strains in existence, inheriting the impressive potency of Penis Envy with a stark white, albino pigmentation.'
  },
  'Tidal Wave': {
    titleTag: 'Tidal Wave Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Shop Tidal Wave mushrooms, an award-winning hybrid strain known for its distinctive genetics. Fast delivery and discreet Canada-wide shipping.',
    keywords: 'tidal wave delivery, tidal wave mushrooms canada, mushroom delivery',
    h1: 'Tidal Wave Magic Mushrooms',
    description: 'Tidal Wave is a famous hybrid crossing B+ and Penis Envy. It won the original Psilocybin Cup and is prized for its aggressive growth, high potency, and fascinating genetic stability.'
  },
  'Jack Frost': {
    titleTag: 'Jack Frost Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Order Jack Frost mushrooms featuring bright frosty coloration and growing popularity among collectors. Fast delivery throughout Canada.',
    keywords: 'jack frost delivery, jack frost mushrooms canada',
    h1: 'Jack Frost Magic Mushrooms',
    description: 'Jack Frost is a premium hybrid Psilocybe Cubensis strain that has rapidly gained popularity among mushroom enthusiasts throughout Canada. Easily recognized by its bright frosted appearance and unique genetics, Jack Frost has become one of the most sought-after mushroom strains available online.\n\nCustomers searching for premium mushroom delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Pickering, Ajax, Whitby, Barrie, and surrounding GTA communities frequently choose Jack Frost due to its growing reputation and premium cultivation characteristics. Every batch is selected for freshness, appearance, and overall quality before being prepared for discreet delivery.'
  },
  'Jedi Mind Fuck (JMF)': {
    titleTag: 'Jedi Mind Fuck Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Shop Jedi Mind Fuck mushrooms, a legendary strain known for large fruiting bodies and loyal followers. Fast delivery and Canada-wide shipping.',
    keywords: 'jedi mind fuck delivery, jmf mushrooms canada',
    h1: 'Jedi Mind Fuck Magic Mushrooms',
    description: 'Jedi Mind Fuck, commonly known as JMF, is one of the most recognized mushroom strains available in Canada. Known for its strong reputation, attractive appearance, and premium genetics, JMF continues to be one of the most searched mushroom strains throughout Toronto and the GTA.\n\nCustomers throughout Mississauga, Vaughan, Richmond Hill, Markham, Pickering, Barrie, and surrounding regions regularly seek out Jedi Mind Fuck because of its popularity and established reputation within the mushroom community. Each batch is selected for consistency, freshness, and quality before fulfillment.'
  },
  'Mazatapec': {
    titleTag: 'Mazatapec Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Order Mazatapec mushrooms, a classic strain with deep roots in mushroom culture. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'mazatapec delivery, mazatapec mushrooms canada',
    h1: 'Mazatapec Magic Mushrooms',
    description: 'Mazatapec is a classic Psilocybe Cubensis strain known throughout the mushroom community for its long history, stable genetics, and respected reputation. This traditional strain remains a popular choice among customers searching for premium mushroom delivery in Toronto and surrounding GTA communities.\n\nFunGuyz carefully selects each batch for freshness, appearance, and quality. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding areas frequently choose Mazatapec because of its trusted reputation and premium characteristics.'
  },
  'B+': {
    titleTag: 'B+ Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Shop B+ mushrooms, one of the most recognized and versatile strains available today. Fast delivery and discreet Canada-wide shipping.',
    keywords: 'b plus delivery, b plus mushrooms canada',
    h1: 'B+ Magic Mushrooms',
    description: 'B+ is one of the most widely recognized mushroom strains in the world and continues to be one of the most requested mushroom varieties throughout Canada. Known for its strong genetics, attractive appearance, and popularity, B+ remains a favorite among customers searching for premium mushroom delivery throughout Toronto and the GTA.\n\nEvery batch is selected for freshness, consistency, and visual quality before fulfillment. Customers throughout Mississauga, Vaughan, Markham, Richmond Hill, Pickering, Ajax, Whitby, Barrie, and surrounding communities regularly choose B+ because of its trusted reputation and widespread popularity.'
  },
  'Treasure Coast': {
    titleTag: 'Treasure Coast Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Order Treasure Coast mushrooms, a sought-after strain known for its unique lineage and popularity. Fast delivery throughout Canada.',
    keywords: 'treasure coast delivery, treasure coast mushrooms canada',
    h1: 'Treasure Coast Magic Mushrooms',
    description: 'Treasure Coast is a premium Psilocybe Cubensis strain recognized for its quality genetics and growing popularity among mushroom enthusiasts throughout Canada. This respected strain continues to attract customers searching for premium mushroom delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA regions.\n\nEach batch is selected for quality, freshness, and consistency before packaging. Treasure Coast remains one of the most respected premium mushroom strains available online today.'
  },
  'Melmac': {
    titleTag: 'Melmac Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Shop Melmac mushrooms, a rare Penis Envy genetic variant recognized for its distinctive appearance. Fast delivery and Canada-wide shipping.',
    keywords: 'melmac delivery, melmac mushrooms canada',
    h1: 'Melmac Magic Mushrooms',
    description: 'Melmac is a highly sought-after mushroom strain known for its unique lineage and premium genetics. Recognized throughout Canada for its distinctive appearance and increasing popularity, Melmac continues to be one of the most requested mushroom strains among customers seeking premium mushroom delivery.\n\nCustomers throughout Toronto, Mississauga, Vaughan, Richmond Hill, Markham, Barrie, and surrounding GTA communities frequently search for Melmac because of its strong reputation and premium quality.'
  },
  'Enigma': {
    titleTag: 'Enigma Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Order Enigma mushrooms, a unique mutation strain admired for its unusual growth structure. Fast delivery throughout Canada.',
    keywords: 'enigma delivery, enigma mushrooms canada',
    h1: 'Enigma Magic Mushrooms',
    description: 'Enigma is one of the rarest and most unique mushroom mutations available in Canada. Known for its unusual appearance and limited availability, Enigma has become one of the most searched premium mushroom products throughout Toronto and the GTA.\n\nFunGuyz carefully sources and selects Enigma batches for freshness, appearance, and quality. Customers searching for rare mushroom delivery in Toronto, Vaughan, Richmond Hill, Markham, Mississauga, Barrie, and surrounding communities frequently seek out this exclusive strain.'
  },
  'Hillbilly': {
    titleTag: 'Hillbilly Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Shop Hillbilly mushrooms, a well-known strain valued for consistent cultivation and popularity. Fast delivery and Canada-wide shipping.',
    keywords: 'hillbilly delivery, hillbilly mushrooms canada',
    h1: 'Hillbilly Magic Mushrooms',
    description: 'Hillbilly is a respected Psilocybe Cubensis strain known for its dependable genetics, strong reputation, and premium quality. Customers searching for premium mushroom delivery throughout Toronto and the GTA continue to choose Hillbilly because of its consistency and popularity.\n\nEvery batch is selected for visual quality, freshness, and cultivation standards before being prepared for discreet delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding regions.'
  },
  'Thai Pink Buffalo': {
    titleTag: 'Thai Pink Buffalo Mushroom Delivery Canada | FunGuyz',
    metaDescription: 'Order Thai Pink Buffalo mushrooms, a famous strain originating from Thailand. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'thai pink buffalo delivery, thai pink buffalo mushrooms canada',
    h1: 'Thai Pink Buffalo Magic Mushrooms',
    description: 'Thai Pink Buffalo is a premium mushroom strain originating from Thailand and recognized for its respected genetics and growing popularity throughout Canada. This strain continues to attract customers searching for premium mushroom delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities.\n\nSelected for freshness, appearance, and quality, Thai Pink Buffalo remains one of the most respected international mushroom strains available online. FunGuyz carefully prepares every order using discreet packaging methods designed to maintain freshness and privacy throughout the delivery process.'
  },

  // Edibles
  'Golden Teacher Original Chocolate (GT OG)': {
    titleTag: 'Golden Teacher Chocolate Delivery Canada | FunGuyz',
    metaDescription: 'Shop Golden Teacher Original Chocolate, a smooth mushroom edible option with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Golden Teacher chocolate delivery, mushroom chocolate Canada, mushroom edibles delivery',
    h1: 'Golden Teacher Original Chocolate',
    description: 'Golden Teacher Original Chocolate combines premium mushroom ingredients with rich chocolate for a convenient and enjoyable edible experience. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities frequently choose Golden Teacher Chocolate due to its popularity, quality, and convenient format.'
  },
  'Golden Teacher Concentrated Chocolate (GT CC)': {
    titleTag: 'Golden Teacher Concentrated Chocolate Delivery | FunGuyz',
    metaDescription: 'Order Golden Teacher Concentrated Chocolate, crafted for stronger edible shoppers. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Golden Teacher concentrated chocolate, mushroom chocolate delivery, edible delivery Canada',
    h1: 'Golden Teacher Concentrated Chocolate',
    description: 'Golden Teacher Concentrated Chocolate is designed for customers seeking a premium mushroom edible option in a convenient chocolate format. Carefully prepared and packaged, this product remains popular throughout Toronto and the Greater Toronto Area.'
  },
  'Penis Envy Original Chocolate (PE OG)': {
    titleTag: 'Penis Envy Chocolate Delivery Canada | FunGuyz',
    metaDescription: 'Shop Penis Envy Original Chocolate, a popular mushroom edible made for PE fans. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Penis Envy chocolate delivery, PE mushroom chocolate, mushroom edibles Canada',
    h1: 'Penis Envy Original Chocolate',
    description: 'Penis Envy Original Chocolate remains one of the most requested mushroom edible products available online. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, and Barrie frequently choose this premium edible format.'
  },
  'Penis Envy Refined Concentrate Chocolate (PE RC)': {
    titleTag: 'Penis Envy Refined Chocolate Delivery | FunGuyz',
    metaDescription: 'Order Penis Envy Refined Concentrate Chocolate, a premium edible choice with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Penis Envy refined chocolate, mushroom chocolate delivery, edible delivery Canada',
    h1: 'Penis Envy Refined Concentrate Chocolate',
    description: 'Penis Envy Refined Concentrate Chocolate is crafted for customers seeking a premium edible experience. Its convenient format and growing popularity make it a frequently searched product throughout Toronto and surrounding GTA communities.'
  },
  'Penis Envy Concentrated Chocolate (PE CC)': {
    titleTag: 'Penis Envy Concentrated Chocolate Delivery | FunGuyz',
    metaDescription: 'Shop Penis Envy Concentrated Chocolate, a strong edible option for PE buyers. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Penis Envy concentrated chocolate, mushroom chocolate Canada, mushroom edible delivery',
    h1: 'Penis Envy Concentrated Chocolate',
    description: 'Penis Envy Concentrated Chocolate remains one of the most popular premium edible products available online. Customers searching for mushroom chocolate delivery throughout Toronto and the GTA frequently choose this premium chocolate format.'
  },
  'Blue Raspberry Gummies': {
    titleTag: 'Blue Raspberry Mushroom Gummies Delivery | FunGuyz',
    metaDescription: 'Shop Blue Raspberry mushroom gummies with fruity flavour and fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Blue Raspberry mushroom gummies, mushroom gummies delivery, mushroom edibles Canada',
    h1: 'Blue Raspberry Mushroom Gummies',
    description: 'Blue Raspberry Gummies are among the most popular mushroom edible options available online. Their flavorful format and convenient serving style continue to make them a customer favorite throughout Toronto and the GTA.'
  },
  'Watermelon Gummies': {
    titleTag: 'Watermelon Mushroom Gummies Delivery Canada | FunGuyz',
    metaDescription: 'Order Watermelon mushroom gummies with sweet flavour and fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Watermelon mushroom gummies, mushroom gummies delivery, edible delivery Canada',
    h1: 'Watermelon Mushroom Gummies',
    description: 'Watermelon Gummies offer a delicious edible format that continues to attract customers searching for mushroom gummies throughout Toronto, Vaughan, Mississauga, Barrie, and surrounding regions.'
  },
  'Strawberry Gummies': {
    titleTag: 'Strawberry Mushroom Gummies Delivery Canada | FunGuyz',
    metaDescription: 'Shop Strawberry mushroom gummies with a classic fruit flavour and fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Strawberry mushroom gummies, mushroom gummies Canada, mushroom edibles delivery',
    h1: 'Strawberry Mushroom Gummies',
    description: 'Strawberry Gummies remain one of the most popular fruit-flavored mushroom edible products available online and continue to be a favorite among customers throughout Toronto and surrounding GTA communities.'
  },
  'Mango Gummies': {
    titleTag: 'Mango Mushroom Gummies Delivery Canada | FunGuyz',
    metaDescription: 'Order Mango mushroom gummies with tropical flavour and fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Mango mushroom gummies, mushroom gummies delivery, edible delivery Canada',
    h1: 'Mango Mushroom Gummies',
    description: 'Mango Gummies combine convenience and flavor in a premium mushroom edible format. Customers throughout Toronto, Vaughan, Richmond Hill, Barrie, and surrounding GTA regions regularly search for this popular product.'
  },
  'Green Apple Gummies': {
    titleTag: 'Green Apple Mushroom Gummies Delivery | FunGuyz',
    metaDescription: 'Shop Green Apple mushroom gummies with a crisp fruit flavour and fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Green Apple mushroom gummies, mushroom gummies Canada, edible delivery Canada',
    h1: 'Green Apple Mushroom Gummies',
    description: 'Green Apple Gummies are a premium edible option known for their popularity and convenient format. Customers throughout Toronto and the GTA frequently choose this product for its enjoyable flavor profile.'
  },
  'Mixed Berry Gummies': {
    titleTag: 'Mixed Berry Mushroom Gummies Delivery Canada | FunGuyz',
    metaDescription: 'Order Mixed Berry mushroom gummies with bold berry flavour and fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Mixed Berry mushroom gummies, mushroom gummies delivery, mushroom edibles Canada',
    h1: 'Mixed Berry Mushroom Gummies',
    description: 'Mixed Berry Gummies continue to be one of the most popular mushroom edible products throughout Toronto and the GTA. Their convenient format and customer demand make them a frequently searched product online.'
  },
  'Golden Teacher S\'Mores': {
    titleTag: 'Golden Teacher S’mores Delivery Canada | FunGuyz',
    metaDescription: 'Shop Golden Teacher S’mores, a dessert-style mushroom edible with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Golden Teacher smores, mushroom smores delivery, mushroom edibles Canada',
    h1: 'Golden Teacher S\'Mores',
    description: 'Golden Teacher S\'Mores combine premium mushroom ingredients with delicious marshmallow, chocolate, and graham cracker flavors for a convenient and enjoyable edible experience. Perfect for customers seeking a unique sweet treat in Toronto and the GTA.'
  },
  'Penis Envy S\'Mores': {
    titleTag: 'Penis Envy S’mores Delivery Canada | FunGuyz',
    metaDescription: 'Order Penis Envy S’mores, a dessert-style PE mushroom edible with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Penis Envy smores, PE mushroom smores, mushroom edible delivery',
    h1: 'Penis Envy S\'Mores',
    description: 'Penis Envy S\'Mores are a popular and convenient mushroom edible product featuring high-potency ingredients and classic sweet flavors. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, and Barrie frequently choose this premium format.'
  },
  'Cookies & Cream S\'Mores': {
    titleTag: 'Cookies & Cream S’mores Delivery Canada | FunGuyz',
    metaDescription: 'Shop Cookies & Cream S’mores, a sweet mushroom edible with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Cookies and Cream smores, mushroom smores delivery, mushroom edibles Canada',
    h1: 'Cookies & Cream S\'Mores',
    description: 'Cookies & Cream S\'Mores offer a delicious white-chocolate, cookies & cream cookie crumb, and marshmallow edible format. A customer favorite sweet mushroom treat throughout Toronto, Barrie, and the GTA.'
  },

  // Capsules
  'Lion\'s Mane Capsules': {
    titleTag: 'Lion’s Mane Capsules Delivery Canada | FunGuyz',
    metaDescription: 'Shop Lion’s Mane capsules, a popular functional mushroom supplement for daily routines. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Lion’s Mane capsules Canada, Lion’s Mane delivery, functional mushroom capsules',
    h1: "Lion's Mane Capsules",
    description: "Lion's Mane is one of the most recognized functional mushroom supplements available today. Known for its distinctive appearance and growing popularity, Lion's Mane capsules continue to attract customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities. Each capsule is carefully prepared for consistency, quality, and convenience."
  },
  'Reishi Capsules': {
    titleTag: 'Reishi Capsules Delivery Canada | FunGuyz',
    metaDescription: 'Order Reishi capsules, a trusted functional mushroom option for wellness-focused routines. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Reishi capsules Canada, Reishi delivery, functional mushroom capsules Canada',
    h1: "Reishi Capsules",
    description: "Reishi is one of the most respected functional mushrooms in the world. Reishi capsules remain popular among customers searching for premium mushroom supplements throughout Toronto, Vaughan, Markham, Richmond Hill, Mississauga, Barrie, and surrounding GTA communities."
  },
  'Cordyceps Capsules': {
    titleTag: 'Cordyceps Capsules Delivery Canada | FunGuyz',
    metaDescription: 'Shop Cordyceps capsules, a popular functional mushroom supplement for active lifestyles. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Cordyceps capsules Canada, Cordyceps delivery, mushroom capsules Canada',
    h1: "Cordyceps Capsules",
    description: "Cordyceps capsules are a popular functional mushroom supplement chosen by customers throughout Toronto and the GTA. Known for their premium quality and convenient capsule format, Cordyceps products continue to gain popularity across Canada."
  },
  'Turkey Tail Capsules': {
    titleTag: 'Turkey Tail Capsules Delivery Canada | FunGuyz',
    metaDescription: 'Order Turkey Tail capsules, a respected functional mushroom choice for daily wellness routines. Fast delivery across Canada.',
    keywords: 'Turkey Tail capsules Canada, Turkey Tail delivery, mushroom supplement Canada',
    h1: "Turkey Tail Capsules",
    description: "Turkey Tail capsules are among the most recognized functional mushroom products available online. Customers throughout Toronto, Mississauga, Vaughan, Markham, Barrie, and surrounding regions continue to choose Turkey Tail due to its popularity and premium quality."
  },
  'Chaga Capsules': {
    titleTag: 'Chaga Capsules Delivery Canada | FunGuyz',
    metaDescription: 'Shop Chaga capsules, a popular functional mushroom product for daily wellness support. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Chaga capsules Canada, Chaga delivery, functional mushroom capsules',
    h1: "Chaga Capsules",
    description: "Chaga capsules continue to grow in popularity among customers searching for premium functional mushroom supplements. FunGuyz offers high-quality Chaga capsules with delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities."
  },
  'Golden Teacher Extract': {
    titleTag: 'Golden Teacher Extract Delivery Canada | FunGuyz',
    metaDescription: 'Order Golden Teacher extract, a concentrated mushroom product with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Golden Teacher extract, mushroom extract delivery, mushroom extract Canada',
    h1: "Golden Teacher Extract",
    description: "Golden Teacher Extract provides a premium mushroom extract option for customers throughout Toronto and the GTA. Carefully prepared and packaged, this product continues to attract customers looking for high-quality mushroom extracts online."
  },
  'Penis Envy Extract': {
    titleTag: 'Penis Envy Extract Delivery Canada | FunGuyz',
    metaDescription: 'Shop Penis Envy extract, a concentrated PE mushroom product with fast delivery across Toronto, the GTA and Canada-wide shipping.',
    keywords: 'Penis Envy extract, PE extract delivery, mushroom extract Canada',
    h1: "Penis Envy Extract",
    description: "Penis Envy Extract remains one of the most searched mushroom extract products available online. Customers throughout Toronto, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA regions continue to seek this premium extract format."
  },
  'Lion\'s Mane Tincture': {
    titleTag: 'Lion’s Mane Tincture Delivery Canada | FunGuyz',
    metaDescription: 'Shop Lion’s Mane tincture, a convenient functional mushroom liquid format with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Lion’s Mane tincture Canada, Lion’s Mane delivery, mushroom tincture Canada',
    h1: "Lion's Mane Tincture",
    description: "Lion's Mane Tincture is a premium liquid mushroom extract option that continues to gain popularity throughout Toronto and the GTA. Customers frequently choose tinctures due to their convenience and ease of use."
  },
  'Reishi Tincture': {
    titleTag: 'Reishi Tincture Delivery Canada | FunGuyz',
    metaDescription: 'Order Reishi tincture, a convenient functional mushroom liquid option with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Reishi tincture Canada, Reishi delivery, mushroom tincture Canada',
    h1: "Reishi Tincture",
    description: "Reishi Tincture offers customers a premium liquid mushroom supplement format. FunGuyz provides quality Reishi tinctures with delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities."
  },
  'Cordyceps Tincture': {
    titleTag: 'Cordyceps Tincture Delivery Canada | FunGuyz',
    metaDescription: 'Shop Cordyceps tincture, a functional mushroom liquid format for daily routines. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Cordyceps tincture Canada, Cordyceps delivery, mushroom tincture Canada',
    h1: "Cordyceps Tincture",
    description: "Cordyceps Tincture is a premium liquid mushroom extract product available for customers throughout Toronto and the GTA. Carefully prepared and packaged, it continues to be a popular choice among customers searching for mushroom tinctures online."
  },

  // Microdose
  'Golden Teacher Microdose': {
    titleTag: 'Golden Teacher Microdose Delivery Canada | FunGuyz',
    metaDescription: 'Shop Golden Teacher microdose capsules, a popular choice for structured microdosing. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Golden Teacher microdose, microdose delivery Canada, microdose capsules Canada',
    h1: "Golden Teacher Microdose Capsules",
    description: "Golden Teacher Microdose capsules are among the most popular microdosing products available online. Carefully prepared using premium Golden Teacher mushroom material, these capsules provide a convenient format for customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities. FunGuyz offers discreet delivery and premium quality products designed for customers seeking a reliable microdose capsule option."
  },
  'Penis Envy Microdose': {
    titleTag: 'Penis Envy Microdose Delivery Canada | FunGuyz',
    metaDescription: 'Order Penis Envy microdose capsules, a PE-based microdose option with fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Penis Envy microdose, PE microdose delivery, microdose capsules Canada',
    h1: "Penis Envy Microdose Capsules",
    description: "Penis Envy Microdose capsules continue to grow in popularity among customers searching for premium microdosing products throughout Toronto and the GTA. Each capsule is prepared for consistency and convenience, making it a popular option among customers throughout Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding communities."
  },
  'Stamets Stack Microdose': {
    titleTag: 'Stamets Stack Microdose Delivery Canada | FunGuyz',
    metaDescription: 'Order Stamets Stack microdose capsules, a known blend format for microdosing routines. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Stamets Stack microdose, microdose capsules Canada, microdose delivery',
    h1: "Stamets Stack Microdose Capsules",
    description: "Stamets Stack remains one of the most recognized microdose capsule formats available today. This premium blend continues to attract customers throughout Toronto, Mississauga, Vaughan, Richmond Hill, Markham, Barrie, and surrounding GTA regions looking for convenient microdose products."
  },
  'Creativity Microdose Blend': {
    titleTag: 'Creativity Microdose Blend Delivery Canada | FunGuyz',
    metaDescription: 'Shop Creativity Microdose Blend capsules for creative-focused routines. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Creativity microdose blend, microdose delivery Canada, mushroom microdose',
    h1: "Creativity Microdose Blend",
    description: "Creativity Microdose Blend is designed for customers seeking a convenient microdose capsule format. This premium product continues to attract customers throughout Toronto, Vaughan, Markham, Richmond Hill, Mississauga, Barrie, and surrounding GTA communities."
  },
  'Productivity Microdose Blend': {
    titleTag: 'Productivity Microdose Blend Delivery Canada | FunGuyz',
    metaDescription: 'Shop Productivity Microdose Blend capsules for routine-focused shoppers. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Productivity microdose blend, microdose delivery Canada, microdose capsules',
    h1: "Productivity Microdose Blend",
    description: "Productivity Microdose Blend remains a popular microdose capsule option for customers throughout Toronto and the GTA. Carefully prepared and packaged, this premium microdose product continues to attract growing interest throughout Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding areas."
  },
  'Wellness Microdose Blend': {
    titleTag: 'Wellness Microdose Blend Delivery Canada | FunGuyz',
    metaDescription: 'Order Wellness Microdose Blend capsules for balanced daily routines. Fast delivery across Toronto, the GTA and Canada.',
    keywords: 'Wellness microdose blend, microdose delivery Canada, microdose capsules Canada',
    h1: "Wellness Microdose Blend",
    description: "Wellness Microdose Blend is a premium capsule product designed for customers seeking a convenient microdose format. Available throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities, this product continues to be one of the growing categories within the FunGuyz microdose collection."
  }
};

export function getProductSeoMetadata(title: string, category: string = ''): ProductSeoData {
  if (productSeoMetadata[title]) {
    return productSeoMetadata[title];
  }
  // Default fallback values
  const defaultDesc = category === 'Edibles' 
    ? 'These delicious infused e-commerce gummies provide a precise, safe, and controlled active wellness experience.'
    : category === 'Capsules'
    ? 'Our custom capsules are designed for daily cognitive wellness, mental focus, stress reduction, and deep neurological recovery.'
    : category === 'Microdose'
    ? 'Optimally formulated with sub-perceptual psilocybin levels alongside organic adaptogenic blends.'
    : 'A gorgeous and highly potent dried magic mushroom strain, selected by our mycological experts for quality and genetic purity.';

  return {
    titleTag: `${title} Magic Mushrooms Delivery Toronto & GTA | FunGuyz`,
    metaDescription: `Buy ${title} online with fast Toronto and GTA delivery. Premium quality products available from FunGuyz.`,
    keywords: `${title.toLowerCase()}, buy ${title.toLowerCase()} canada, ${title.toLowerCase()} delivery toronto`,
    h1: `${title} Magic Mushrooms`,
    description: defaultDesc
  };
}

export interface ProductSections {
  overview: {
    title: string;
    content: string;
    highlights: string[];
  };
  appearance: {
    title: string;
    content: string;
    details: string[];
  };
  genetics: {
    title: string;
    content: string;
    origin: string;
  };
  popularity: {
    title: string;
    content: string;
    rank: string;
  };
  whyChooseUs: {
    title: string;
    points: { title: string; desc: string }[];
  };
  strainInfo: {
    title: string;
    specs: { label: string; value: string }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
}

export function getProductSections(title: string, category: string, seoDescription: string): ProductSections {
  const cleanTitle = title.replace(/\s*\(.*?\)\s*/g, ''); // Strip suffixes like (GT OG), (GT CC) for visual presentation

  // 1. Overview Content
  const overviewContent = seoDescription;
  const overviewHighlights = category === 'Edibles'
    ? ['Gourmet Infusions', 'Precise mg Dosing', 'Zero Earthy Taste']
    : category === 'Capsules'
    ? ['Tasteless Capsule Format', 'Vegetarian Cellulose Shells', 'Synergistic Stacks']
    : category === 'Microdose'
    ? ['Sub-Perceptual Dose', 'Zero Psychoactive Trips', 'Ideal for High Productivity']
    : ['A Grade Genetic Purity', 'Elite Canadian Cultivar', '100% Laboratory Tested'];

  // 2. Appearance Content
  let appearanceContent = '';
  let appearanceDetails: string[] = [];
  if (category === 'Edibles') {
    if (title.toLowerCase().includes('chocolate') || title.toLowerCase().includes('smores') || title.toLowerCase().includes('s\'mores')) {
      appearanceContent = `The ${cleanTitle} features a luxurious, professional presentation. Each bar is divided into a clean, easy-to-break grid pattern for simple microdose calculation.`;
      appearanceDetails = ['Premium gold-foil inner sealing', 'Rich glossy finish with clean break-lines', 'Certified food-grade childproof exterior packaging'];
    } else {
      appearanceContent = `The ${cleanTitle} displays a translucent, vibrant candy appearance. Each gummy is molded into a precise shape for visual appeal and consistent compound distribution.`;
      appearanceDetails = ['Sugar-dusted crystalline surface texture', 'Semi-soft, chewy texture with zero sticky residue', 'Naturally colored with premium organic fruit juices'];
    }
  } else if (category === 'Capsules' || category === 'Microdose') {
    appearanceContent = `The ${cleanTitle} utilizes clear, vegetable-cellulose capsule shells. This provides a tasteless and easy-to-swallow format that bypasses the stomach discomfort of raw mushrooms.`;
    appearanceDetails = ['Translucent size-00 vegetable capsules', 'Finely ground homogeneous botanical powder', 'Hermetically sealed container with secure child-lock cap'];
  } else {
    appearanceContent = `The dried specimens of ${cleanTitle} present beautifully cured stalks and caps. They display characteristic natural visual indicators, including white-to-golden skin, thick fibrous stems, and dense spore prints.`;
    appearanceDetails = ['Prone to high-potency blue bruising', 'Deep golden caps with frosted white margins', 'Perfectly dried and crispy (cracker-dry preservation)'];
  }

  // 3. Genetics Content
  let geneticsContent = '';
  let geneticsOrigin = '';
  if (title.toLowerCase().includes('golden teacher')) {
    geneticsContent = `Golden Teacher is a highly acclaimed Psilocybe Cubensis strain that first appeared in the late 1980s. Its exact origin is unknown, but it is beloved in mycological research for its robust genetic stability, mild learning curve, and clean spore presentation.`;
    geneticsOrigin = 'Isolated Psilocybe Cubensis';
  } else if (title.toLowerCase().includes('penis envy')) {
    geneticsContent = `Penis Envy is legendary for its mutation that prevents it from fully opening its cap, leading to highly concentrated active alkaloids. First isolated by pioneering researchers, it represents one of the most potent genetic lines available globally.`;
    geneticsOrigin = 'Isolated Penis Envy Mutation';
  } else if (title.toLowerCase().includes('jack frost')) {
    geneticsContent = `Jack Frost is a unique hybrid created by crossing Albino Golden Teacher with True Albino Teacher (TAT). The result is a stunning albino presentation with frosted gills that look like ice crystals.`;
    geneticsOrigin = 'True Albino Teacher Hybrid';
  } else if (title.toLowerCase().includes('blue meanies')) {
    geneticsContent = `Our Blue Meanies strain represents a stabilized, high-potency Psilocybe Cubensis strain selected for its rapid colonization rates and heavy blue bruising characteristics.`;
    geneticsOrigin = 'Panaeolus Cyanescens / Cubensis Select';
  } else if (category === 'Capsules' && (title.toLowerCase().includes('lions mane') || title.toLowerCase().includes('lion\'s mane'))) {
    geneticsContent = `Hericium Erinaceus (Lion's Mane) is a premium functional mushroom native to North America and Asia. It is celebrated for its natural nootropic compounds: hericenones and erinacines, which support nerve growth factor (NGF).`;
    geneticsOrigin = 'Organic Nootropic Extract';
  } else if (category === 'Capsules' && title.toLowerCase().includes('reishi')) {
    geneticsContent = `Ganoderma Lucidum (Reishi) is historically referred to as the 'Mushroom of Immortality'. It is rich in triterpenes and beta-glucans, which support stress adaptation and immune responses.`;
    geneticsOrigin = 'Ganoderma Lucidum Extract';
  } else if (category === 'Capsules' && title.toLowerCase().includes('cordyceps')) {
    geneticsContent = `Cordyceps Militaris contains cordycepin and adenosine, compounds that participate directly in cellular ATP energy production. This makes it a popular natural alternative to caffeine.`;
    geneticsOrigin = 'Cordyceps Militaris Extract';
  } else if (category === 'Capsules' && (title.toLowerCase().includes('turkey tail') || title.toLowerCase().includes('chaga'))) {
    geneticsContent = `Turkey Tail and Chaga functional extracts contain highly dense immunomodulating polysaccharides (PSK, PSP) and active antioxidants like betulinic acid.`;
    geneticsOrigin = 'Premium Adaptogenic Bio-extract';
  } else {
    geneticsContent = `A premium selected Psilocybe Cubensis line cultivated under strict laboratory parameters in British Columbia, Canada, prioritizing genetic stability and high active compounds.`;
    geneticsOrigin = 'British Columbia Isolated Cultivar';
  }

  // 4. Popularity Content
  let popularityContent = '';
  let popularityRank = '';
  if (title.toLowerCase().includes('golden teacher')) {
    popularityContent = `Golden Teacher products rank as FunGuyz's #1 customer choice. They are highly sought after throughout Toronto, Mississauga, and Vaughan by both beginners and experienced individuals for their balanced, smooth, and deeply introspective profile.`;
    popularityRank = '#1 Best Seller';
  } else if (title.toLowerCase().includes('penis envy')) {
    popularityContent = `Penis Envy is the ultimate choice for experienced psychonauts in Toronto and the GTA. It consistently sells out in Barrie and Markham due to its premium, maximum-strength rating.`;
    popularityRank = 'Top Rated - Premium';
  } else if (category === 'Edibles') {
    popularityContent = `Our fruit gummies and chocolate treats are highly requested across Richmond Hill, Vaughan, and Barrie for social events, outdoor hiking, and casual microdosing due to their delicious flavors and predictable onset times.`;
    popularityRank = 'Top E-commerce Favorite';
  } else if (category === 'Microdose' || category === 'Capsules') {
    popularityContent = `Capsule stacks are highly favored by professionals, students, and creatives in downtown Toronto and Mississauga looking to enhance daily productivity, cognitive flow, and mental stamina without psychoactive effects.`;
    popularityRank = 'A-List Nootropic Choice';
  } else {
    popularityContent = `An increasingly popular choice among Canadian customers who search for high-quality, laboratory-tested mushroom products online for quick GTA delivery.`;
    popularityRank = 'Trending Strain';
  }

  // 5. Why Customers Choose It
  const whyChooseUsPoints = [
    { title: 'Certified Purity', desc: 'Sourced from indoor cleanrooms with zero pesticides, chemical binders, or fillers.' },
    { title: 'Consistent Potency', desc: 'Each batch is laboratory-standardized to ensure predictable and reliable strengths.' },
    { title: 'Absolute Discretion', desc: 'Shipped in plain, odorless, vacuum-sealed boxes for complete user privacy.' },
    { title: 'Fast GTA Courier Delivery', desc: 'Direct, rapid delivery to Toronto, Mississauga, Vaughan, Markham, Richmond Hill, and Barrie.' }
  ];

  // 6. Strain Information / Specs
  const specsList: { label: string; value: string }[] = [
    { label: 'Category Type', value: category },
    { label: 'Source Origin', value: 'British Columbia, Canada' },
    { label: 'Product Name', value: cleanTitle },
  ];
  if (category === 'Magic Mushrooms') {
    specsList.push({ label: 'Active Compound', value: 'Psilocybin, Psilocin' });
    specsList.push({ label: 'Potency Rating', value: title.toLowerCase().includes('penis envy') || title.toLowerCase().includes('enigma') ? 'Maximum Strength' : title.toLowerCase().includes('jack frost') ? 'Strong' : 'Moderate' });
    specsList.push({ label: 'Typical Dose', value: 'Microdose: 0.1g-0.25g | Medium: 1g-2.5g | Deep: 3g+' });
  } else if (category === 'Edibles') {
    specsList.push({ label: 'Active Infusion', value: 'Premium Psilocybin Distillate' });
    specsList.push({ label: 'Format Type', value: title.toLowerCase().includes('chocolate') ? 'Luxury Belgian Chocolate' : title.toLowerCase().includes('smores') ? 'S\'Mores Treat' : 'Chewy Fruit Gummy' });
    specsList.push({ label: 'Digestion Load', value: 'Very Light (Stomach-Friendly)' });
  } else {
    specsList.push({ label: 'Capsule Material', value: '100% Vegetable Cellulose' });
    specsList.push({ label: 'Recommended Intake', value: '1 capsule every 2-3 days (Fadiman Stack)' });
    specsList.push({ label: 'Nootropic Type', value: title.toLowerCase().includes('extract') ? 'Psychoactive Concentrated Extract' : 'Adaptogenic Brain Supplement' });
  }
  specsList.push({ label: 'Preservation Shelf Life', value: '12 Months (Airtight Cool Dry Storage)' });

  // 7. Product-Specific FAQs
  const faqItems = [
    {
      q: `How should I store my ${cleanTitle}?`,
      a: category === 'Edibles'
        ? `We highly recommend keeping chocolates and fruit gummies in a cool storage drawer or refrigerated to preserve texture and prevent melting, especially during warmer months.`
        : `Store in a cool, dry, dark cabinet inside an airtight container. Keeping it away from heat, light, and moisture ensures the active compounds remain stable.`
    },
    {
      q: `How long does the onset of ${cleanTitle} take?`,
      a: category === 'Edibles'
        ? `Onset typically takes 30 to 60 minutes. Because it digests through the stomach, we advise waiting at least 90 minutes before considering adjusting your intake.`
        : category === 'Capsules' || category === 'Microdose'
        ? `For microdoses, there is no psychoactive 'kick-in' effect. The cognitive benefit (clarity, mood stability) is sub-perceptual and integrates smoothly into your day.`
        : `Onset takes 20 to 45 minutes on a relatively empty stomach. Expect a gentle rise in sensory awareness and mood lift during the first hour.`
    },
    {
      q: `Is delivery for ${cleanTitle} completely private?`,
      a: `Yes, absolutely. FunGuyz ships all orders in completely plain, unbranded boxes. Packages are vacuum-sealed to prevent odors, ensuring absolute privacy from dispatch to delivery in Toronto, the GTA, and Barrie.`
    }
  ];

  return {
    overview: {
      title: 'Overview',
      content: overviewContent,
      highlights: overviewHighlights
    },
    appearance: {
      title: 'Appearance',
      content: appearanceContent,
      details: appearanceDetails
    },
    genetics: {
      title: 'Genetics',
      content: geneticsContent,
      origin: geneticsOrigin
    },
    popularity: {
      title: 'Popularity',
      content: popularityContent,
      rank: popularityRank
    },
    whyChooseUs: {
      title: 'Why Customers Choose It',
      points: whyChooseUsPoints
    },
    strainInfo: {
      title: 'Strain Information',
      specs: specsList
    },
    faq: {
      title: 'FAQ',
      items: faqItems
    }
  };
}

export const mushroomPricingTable: Record<string, Record<string, number>> = {
  'Golden Teacher': { '3.5g': 66, '7g': 118, '14g': 218, '28g': 410 },
  'Penis Envy': { '3.5g': 84, '7g': 152, '14g': 282, '28g': 530 },
  'Blue Meanies': { '3.5g': 78, '7g': 140, '14g': 260, '28g': 490 },
  'Albino Penis Envy (APE)': { '3.5g': 102, '7g': 184, '14g': 340, '28g': 640 },
  'Tidal Wave': { '3.5g': 90, '7g': 162, '14g': 300, '28g': 565 },
  'Jack Frost': { '3.5g': 90, '7g': 162, '14g': 300, '28g': 565 },
  'Jedi Mind Fuck (JMF)': { '3.5g': 96, '7g': 172, '14g': 318, '28g': 600 },
  'Mazatapec': { '3.5g': 66, '7g': 118, '14g': 218, '28g': 410 },
  'B+': { '3.5g': 60, '7g': 108, '14g': 200, '28g': 375 },
  'Treasure Coast': { '3.5g': 78, '7g': 140, '14g': 260, '28g': 490 },
  'Melmac': { '3.5g': 102, '7g': 184, '14g': 340, '28g': 640 },
  'Enigma': { '3.5g': 114, '7g': 205, '14g': 380, '28g': 715 },
  'Hillbilly': { '3.5g': 72, '7g': 130, '14g': 240, '28g': 450 },
  'Thai Pink Buffalo': { '3.5g': 72, '7g': 130, '14g': 240, '28g': 450 }
};



