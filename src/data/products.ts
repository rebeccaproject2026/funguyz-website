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
  // Magic Mushrooms
  ['Golden Teacher', 'Magic Mushrooms', '$59.99', 'Top Rated'],
  ['Penis Envy', 'Magic Mushrooms', '$79.99', 'Premium'],
  ['Blue Meanies', 'Magic Mushrooms', '$64.99', 'Best Seller'],
  ['Albino Penis Envy (APE)', 'Magic Mushrooms', '$84.99', 'Rare'],
  ['Tidal Wave', 'Magic Mushrooms', '$69.99', 'New'],
  ['Jack Frost', 'Magic Mushrooms', '$69.99', 'Rare'],
  ['Jedi Mind Fuck (JMF)', 'Magic Mushrooms', '$59.99', 'Popular'],
  ['Mazatapec', 'Magic Mushrooms', '$54.99', 'Classic'],
  ['B+', 'Magic Mushrooms', '$49.99', 'Best Seller'],
  ['Treasure Coast', 'Magic Mushrooms', '$59.99', 'Rare'],
  ['Melmac', 'Magic Mushrooms', '$74.99', 'Premium'],
  ['Enigma', 'Magic Mushrooms', '$99.99', 'Rare'],
  ['Hillbilly', 'Magic Mushrooms', '$54.99', 'New'],
  ['Thai Pink Buffalo', 'Magic Mushrooms', '$59.99', 'Popular'],

  // Edibles
  ['Golden Teacher Original Chocolate (GT OG)', 'Edibles', '$29.99', 'Best Seller'],
  ['Golden Teacher Concentrated Chocolate (GT CC)', 'Edibles', '$39.99', 'Premium'],
  ['Penis Envy Original Chocolate (PE OG)', 'Edibles', '$34.99', 'Best Seller'],
  ['Penis Envy Refined Concentrate Chocolate (PE RC)', 'Edibles', '$49.99', 'Premium'],
  ['Penis Envy Concentrated Chocolate (PE CC)', 'Edibles', '$44.99', 'Strong'],
  ['Blue Raspberry Gummies', 'Edibles', '$24.99', 'Best Seller'],
  ['Watermelon Gummies', 'Edibles', '$24.99', 'Popular'],
  ['Strawberry Gummies', 'Edibles', '$24.99', 'New'],
  ['Mango Gummies', 'Edibles', '$24.99', 'Fruit'],
  ['Green Apple Gummies', 'Edibles', '$24.99', 'Sour'],
  ['Mixed Berry Gummies', 'Edibles', '$24.99', 'Juicy'],
  ['Golden Teacher S\'Mores', 'Edibles', '$19.99', 'Sweet'],
  ['Penis Envy S\'Mores', 'Edibles', '$24.99', 'Popular'],
  ['Cookies & Cream S\'Mores', 'Edibles', '$22.99', 'New'],

  // Capsules
  ['Lion\'s Mane Capsules', 'Capsules', '$34.99', 'Focus'],
  ['Reishi Capsules', 'Capsules', '$34.99', 'Relax'],
  ['Cordyceps Capsules', 'Capsules', '$34.99', 'Energy'],
  ['Turkey Tail Capsules', 'Capsules', '$34.99', 'Wellness'],
  ['Chaga Capsules', 'Capsules', '$34.99', 'Shield'],
  ['Golden Teacher Extract', 'Capsules', '$49.99', 'Premium'],
  ['Penis Envy Extract', 'Capsules', '$59.99', 'Strong'],
  ['Lion\'s Mane Tincture', 'Capsules', '$29.99', 'Daily'],
  ['Reishi Tincture', 'Capsules', '$29.99', 'Calm'],
  ['Cordyceps Tincture', 'Capsules', '$29.99', 'Active'],

  // Microdose
  ['Golden Teacher Microdose', 'Microdose', '$39.99', 'Wellness'],
  ['Penis Envy Microdose', 'Microdose', '$44.99', 'Premium'],
  ['Stamets Stack Microdose', 'Microdose', '$49.99', 'Focus'],
  ['Creativity Microdose Blend', 'Microdose', '$44.99', 'Creative'],
  ['Productivity Microdose Blend', 'Microdose', '$44.99', 'Work'],
  ['Wellness Microdose Blend', 'Microdose', '$39.99', 'Daily']
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
  'Jack Frost': {
    titleTag: 'Jack Frost Magic Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy Jack Frost magic mushrooms online with fast Toronto, GTA and Barrie delivery. Premium quality Jack Frost mushrooms available from FunGuyz.',
    keywords: 'jack frost mushrooms, jack frost shrooms, jack frost delivery toronto, buy jack frost mushrooms canada, jack frost gta, mushroom delivery toronto, magic mushroom delivery gta, funguyz jack frost, barrie mushroom delivery',
    h1: 'Jack Frost Magic Mushrooms',
    description: 'Jack Frost is a premium hybrid Psilocybe Cubensis strain that has rapidly gained popularity among mushroom enthusiasts throughout Canada. Easily recognized by its bright frosted appearance and unique genetics, Jack Frost has become one of the most sought-after mushroom strains available online.\n\nCustomers searching for premium mushroom delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Pickering, Ajax, Whitby, Barrie, and surrounding GTA communities frequently choose Jack Frost due to its growing reputation and premium cultivation characteristics. Every batch is selected for freshness, appearance, and overall quality before being prepared for discreet delivery.'
  },
  'Jedi Mind Fuck (JMF)': {
    titleTag: 'Jedi Mind Fuck Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Shop Jedi Mind Fuck magic mushrooms with fast Toronto and GTA delivery. Premium JMF mushrooms available throughout the Greater Toronto Area.',
    keywords: 'jedi mind fuck mushrooms, jmf mushrooms, jmf delivery toronto, buy jmf canada, jedi mind fuck gta, mushroom delivery toronto, funguyz jmf, magic mushrooms barrie',
    h1: 'Jedi Mind Fuck Magic Mushrooms',
    description: 'Jedi Mind Fuck, commonly known as JMF, is one of the most recognized mushroom strains available in Canada. Known for its strong reputation, attractive appearance, and premium genetics, JMF continues to be one of the most searched mushroom strains throughout Toronto and the GTA.\n\nCustomers throughout Mississauga, Vaughan, Richmond Hill, Markham, Pickering, Barrie, and surrounding regions regularly seek out Jedi Mind Fuck because of its popularity and established reputation within the mushroom community. Each batch is selected for consistency, freshness, and quality before fulfillment.'
  },
  'Mazatapec': {
    titleTag: 'Mazatapec Magic Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Order Mazatapec magic mushrooms online with fast Toronto, GTA and Barrie delivery. Premium Mazatapec mushrooms available from FunGuyz.',
    keywords: 'mazatapec mushrooms, mazatapec delivery toronto, buy mazatapec mushrooms canada, mazatapec gta, mushroom delivery toronto, funguyz mazatapec, magic mushroom delivery barrie',
    h1: 'Mazatapec Magic Mushrooms',
    description: 'Mazatapec is a classic Psilocybe Cubensis strain known throughout the mushroom community for its long history, stable genetics, and respected reputation. This traditional strain remains a popular choice among customers searching for premium mushroom delivery in Toronto and surrounding GTA communities.\n\nFunGuyz carefully selects each batch for freshness, appearance, and quality. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding areas frequently choose Mazatapec because of its trusted reputation and premium characteristics.'
  },
  'B+': {
    titleTag: 'B+ Magic Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy B+ magic mushrooms online with discreet Toronto and GTA delivery. Premium B Plus mushrooms available from FunGuyz.',
    keywords: 'b plus mushrooms, b+ mushrooms, b plus delivery toronto, buy b plus canada, b plus gta, mushroom delivery toronto, funguyz b plus, magic mushrooms barrie',
    h1: 'B+ Magic Mushrooms',
    description: 'B+ is one of the most widely recognized mushroom strains in the world and continues to be one of the most requested mushroom varieties throughout Canada. Known for its strong genetics, attractive appearance, and popularity, B+ remains a favorite among customers searching for premium mushroom delivery throughout Toronto and the GTA.\n\nEvery batch is selected for freshness, consistency, and visual quality before fulfillment. Customers throughout Mississauga, Vaughan, Markham, Richmond Hill, Pickering, Ajax, Whitby, Barrie, and surrounding communities regularly choose B+ because of its trusted reputation and widespread popularity.'
  },
  'Treasure Coast': {
    titleTag: 'Treasure Coast Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy Treasure Coast mushrooms online with fast Toronto, GTA and Barrie delivery. Premium mushroom products available from FunGuyz.',
    keywords: 'treasure coast mushrooms, treasure coast delivery toronto, treasure coast shrooms canada, mushroom delivery gta, buy treasure coast mushrooms, funguyz treasure coast',
    h1: 'Treasure Coast Magic Mushrooms',
    description: 'Treasure Coast is a premium Psilocybe Cubensis strain recognized for its quality genetics and growing popularity among mushroom enthusiasts throughout Canada. This respected strain continues to attract customers searching for premium mushroom delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA regions.\n\nEach batch is selected for quality, freshness, and consistency before packaging. Treasure Coast remains one of the most respected premium mushroom strains available online today.'
  },
  'Melmac': {
    titleTag: 'Melmac Magic Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Order Melmac magic mushrooms online with fast Toronto and GTA delivery. Premium Melmac mushrooms available throughout Ontario.',
    keywords: 'melmac mushrooms, melmac delivery toronto, buy melmac mushrooms canada, melmac gta, mushroom delivery toronto, funguyz melmac, premium mushrooms barrie',
    h1: 'Melmac Magic Mushrooms',
    description: 'Melmac is a highly sought-after mushroom strain known for its unique lineage and premium genetics. Recognized throughout Canada for its distinctive appearance and increasing popularity, Melmac continues to be one of the most requested mushroom strains among customers seeking premium mushroom delivery.\n\nCustomers throughout Toronto, Mississauga, Vaughan, Richmond Hill, Markham, Barrie, and surrounding GTA communities frequently search for Melmac because of its strong reputation and premium quality.'
  },
  'Enigma': {
    titleTag: 'Enigma Magic Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy Enigma magic mushrooms online with fast Toronto, GTA and Barrie delivery. Rare premium mushroom strain available from FunGuyz.',
    keywords: 'enigma mushrooms, enigma delivery toronto, buy enigma mushrooms canada, enigma gta, rare mushrooms toronto, mushroom delivery gta, funguyz enigma',
    h1: 'Enigma Magic Mushrooms',
    description: 'Enigma is one of the rarest and most unique mushroom mutations available in Canada. Known for its unusual appearance and limited availability, Enigma has become one of the most searched premium mushroom products throughout Toronto and the GTA.\n\nFunGuyz carefully sources and selects Enigma batches for freshness, appearance, and quality. Customers searching for rare mushroom delivery in Toronto, Vaughan, Richmond Hill, Markham, Mississauga, Barrie, and surrounding communities frequently seek out this exclusive strain.'
  },
  'Hillbilly': {
    titleTag: 'Hillbilly Magic Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Shop Hillbilly magic mushrooms online with fast Toronto and GTA delivery. Premium Hillbilly mushrooms available from FunGuyz.',
    keywords: 'hillbilly mushrooms, hillbilly delivery toronto, buy hillbilly mushrooms canada, hillbilly gta, mushroom delivery toronto, funguyz hillbilly, magic mushrooms barrie',
    h1: 'Hillbilly Magic Mushrooms',
    description: 'Hillbilly is a respected Psilocybe Cubensis strain known for its dependable genetics, strong reputation, and premium quality. Customers searching for premium mushroom delivery throughout Toronto and the GTA continue to choose Hillbilly because of its consistency and popularity.\n\nEvery batch is selected for visual quality, freshness, and cultivation standards before being prepared for discreet delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding regions.'
  },
  'Thai Pink Buffalo': {
    titleTag: 'Thai Pink Buffalo Mushrooms Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy Thai Pink Buffalo mushrooms online with fast Toronto, GTA and Barrie delivery. Premium mushroom strain available from FunGuyz.',
    keywords: 'thai pink buffalo mushrooms, thai pink buffalo delivery toronto, pink buffalo mushrooms canada, mushroom delivery gta, buy thai pink buffalo mushrooms, funguyz thai pink buffalo',
    h1: 'Thai Pink Buffalo Magic Mushrooms',
    description: 'Thai Pink Buffalo is a premium mushroom strain originating from Thailand and recognized for its respected genetics and growing popularity throughout Canada. This strain continues to attract customers searching for premium mushroom delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities.\n\nSelected for freshness, appearance, and quality, Thai Pink Buffalo remains one of the most respected international mushroom strains available online. FunGuyz carefully prepares every order using discreet packaging methods designed to maintain freshness and privacy throughout the delivery process.'
  },

  // Edibles
  'Golden Teacher Original Chocolate (GT OG)': {
    titleTag: 'Golden Teacher Chocolate Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy Golden Teacher chocolate online with fast Toronto, GTA and Barrie delivery. Premium mushroom chocolate available from FunGuyz.',
    keywords: 'golden teacher chocolate, mushroom chocolate toronto, golden teacher chocolate canada, mushroom edibles gta, buy mushroom chocolate online, funguyz chocolate, mushroom delivery toronto',
    h1: 'Golden Teacher Original Chocolate',
    description: 'Golden Teacher Original Chocolate combines premium mushroom ingredients with rich chocolate for a convenient and enjoyable edible experience. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities frequently choose Golden Teacher Chocolate due to its popularity, quality, and convenient format.'
  },
  'Golden Teacher Concentrated Chocolate (GT CC)': {
    titleTag: 'Golden Teacher Concentrated Chocolate Toronto | FunGuyz',
    metaDescription: 'Shop Golden Teacher Concentrated Chocolate with fast Toronto and GTA delivery. Premium mushroom chocolate available online.',
    keywords: 'golden teacher concentrated chocolate, mushroom chocolate toronto, concentrated mushroom chocolate, funguyz edibles, mushroom delivery gta',
    h1: 'Golden Teacher Concentrated Chocolate',
    description: 'Golden Teacher Concentrated Chocolate is designed for customers seeking a premium mushroom edible option in a convenient chocolate format. Carefully prepared and packaged, this product remains popular throughout Toronto and the Greater Toronto Area.'
  },
  'Penis Envy Original Chocolate (PE OG)': {
    titleTag: 'Penis Envy Chocolate Delivery Toronto & GTA | FunGuyz',
    metaDescription: 'Buy Penis Envy mushroom chocolate online with fast Toronto, GTA and Barrie delivery. Premium edible products available from FunGuyz.',
    keywords: 'penis envy chocolate, mushroom chocolate toronto, penis envy edibles, mushroom chocolate gta, funguyz edibles, mushroom delivery toronto',
    h1: 'Penis Envy Original Chocolate',
    description: 'Penis Envy Original Chocolate remains one of the most requested mushroom edible products available online. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, and Barrie frequently choose this premium edible format.'
  },
  'Penis Envy Refined Concentrate Chocolate (PE RC)': {
    titleTag: 'Penis Envy Refined Chocolate Toronto | FunGuyz',
    metaDescription: 'Order Penis Envy Refined Concentrate Chocolate online with fast Toronto and GTA delivery. Premium mushroom edible available from FunGuyz.',
    keywords: 'penis envy concentrate chocolate, mushroom chocolate delivery toronto, premium mushroom edibles, funguyz chocolate, mushroom delivery gta',
    h1: 'Penis Envy Refined Concentrate Chocolate',
    description: 'Penis Envy Refined Concentrate Chocolate is crafted for customers seeking a premium edible experience. Its convenient format and growing popularity make it a frequently searched product throughout Toronto and surrounding GTA communities.'
  },
  'Penis Envy Concentrated Chocolate (PE CC)': {
    titleTag: 'Penis Envy Concentrated Chocolate Toronto | FunGuyz',
    metaDescription: 'Buy Penis Envy Concentrated Chocolate online with fast GTA delivery. Premium mushroom chocolate available throughout Toronto and Barrie.',
    keywords: 'penis envy concentrated chocolate, mushroom chocolate gta, buy mushroom chocolate toronto, funguyz edibles, premium mushroom chocolate',
    h1: 'Penis Envy Concentrated Chocolate',
    description: 'Penis Envy Concentrated Chocolate remains one of the most popular premium edible products available online. Customers searching for mushroom chocolate delivery throughout Toronto and the GTA frequently choose this premium chocolate format.'
  },
  'Blue Raspberry Gummies': {
    titleTag: 'Blue Raspberry Mushroom Gummies Toronto | FunGuyz',
    metaDescription: 'Buy Blue Raspberry mushroom gummies online with fast Toronto, GTA and Barrie delivery. Premium edible gummies from FunGuyz.',
    keywords: 'blue raspberry gummies, mushroom gummies toronto, buy mushroom gummies canada, gummy delivery toronto, funguyz gummies',
    h1: 'Blue Raspberry Mushroom Gummies',
    description: 'Blue Raspberry Gummies are among the most popular mushroom edible options available online. Their flavorful format and convenient serving style continue to make them a customer favorite throughout Toronto and the GTA.'
  },
  'Watermelon Gummies': {
    titleTag: 'Watermelon Mushroom Gummies Toronto | FunGuyz',
    metaDescription: 'Order Watermelon mushroom gummies online with fast Toronto and GTA delivery. Premium edible gummies available from FunGuyz.',
    keywords: 'watermelon gummies, mushroom gummies canada, edible gummies toronto, gummy delivery gta, funguyz gummies',
    h1: 'Watermelon Mushroom Gummies',
    description: 'Watermelon Gummies offer a delicious edible format that continues to attract customers searching for mushroom gummies throughout Toronto, Vaughan, Mississauga, Barrie, and surrounding regions.'
  },
  'Strawberry Gummies': {
    titleTag: 'Strawberry Mushroom Gummies Delivery Toronto | FunGuyz',
    metaDescription: 'Buy Strawberry mushroom gummies online with fast Toronto and GTA delivery. Premium mushroom gummies from FunGuyz.',
    keywords: 'strawberry gummies, mushroom gummies toronto, buy gummies canada, edible gummies gta, funguyz edibles',
    h1: 'Strawberry Mushroom Gummies',
    description: 'Strawberry Gummies remain one of the most popular fruit-flavored mushroom edible products available online and continue to be a favorite among customers throughout Toronto and surrounding GTA communities.'
  },
  'Mango Gummies': {
    titleTag: 'Mango Mushroom Gummies Delivery Toronto | FunGuyz',
    metaDescription: 'Shop Mango mushroom gummies online with fast Toronto, GTA and Barrie delivery. Premium gummies available from FunGuyz.',
    keywords: 'mango gummies, mushroom gummies gta, edible gummies toronto, buy mushroom gummies canada, funguyz gummies',
    h1: 'Mango Mushroom Gummies',
    description: 'Mango Gummies combine convenience and flavor in a premium mushroom edible format. Customers throughout Toronto, Vaughan, Richmond Hill, Barrie, and surrounding GTA regions regularly search for this popular product.'
  },
  'Green Apple Gummies': {
    titleTag: 'Green Apple Mushroom Gummies Toronto | FunGuyz',
    metaDescription: 'Buy Green Apple mushroom gummies online with fast Toronto and GTA delivery. Premium gummies available throughout the GTA.',
    keywords: 'green apple gummies, mushroom gummies toronto, edible gummies gta, gummy delivery toronto, funguyz gummies',
    h1: 'Green Apple Mushroom Gummies',
    description: 'Green Apple Gummies are a premium edible option known for their popularity and convenient format. Customers throughout Toronto and the GTA frequently choose this product for its enjoyable flavor profile.'
  },
  'Mixed Berry Gummies': {
    titleTag: 'Mixed Berry Mushroom Gummies Toronto | FunGuyz',
    metaDescription: 'Order Mixed Berry mushroom gummies online with fast Toronto, GTA and Barrie delivery. Premium edible products available from FunGuyz.',
    keywords: 'mixed berry gummies, mushroom gummies canada, edible gummies toronto, mushroom gummy delivery gta, funguyz gummies',
    h1: 'Mixed Berry Mushroom Gummies',
    description: 'Mixed Berry Gummies continue to be one of the most popular mushroom edible products throughout Toronto and the GTA. Their convenient format and customer demand make them a frequently searched product online.'
  },
  'Golden Teacher S\'Mores': {
    titleTag: 'Golden Teacher S\'Mores Delivery Toronto | FunGuyz',
    metaDescription: 'Buy Golden Teacher S\'Mores online with fast Toronto and GTA delivery. Premium mushroom edibles available from FunGuyz.',
    keywords: 'golden teacher smores, mushroom smores canada, edible delivery toronto, mushroom treats gta, funguyz edibles',
    h1: 'Golden Teacher S\'Mores',
    description: 'Golden Teacher S\'Mores combine premium mushroom ingredients with delicious marshmallow, chocolate, and graham cracker flavors for a convenient and enjoyable edible experience. Perfect for customers seeking a unique sweet treat in Toronto and the GTA.'
  },
  'Penis Envy S\'Mores': {
    titleTag: 'Penis Envy S\'Mores Delivery Toronto | FunGuyz',
    metaDescription: 'Shop Penis Envy S\'Mores online with fast GTA delivery. Premium mushroom edible products available from FunGuyz.',
    keywords: 'penis envy smores, mushroom smores toronto, edible delivery gta, funguyz edibles',
    h1: 'Penis Envy S\'Mores',
    description: 'Penis Envy S\'Mores are a popular and convenient mushroom edible product featuring high-potency ingredients and classic sweet flavors. Customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, and Barrie frequently choose this premium format.'
  },
  'Cookies & Cream S\'Mores': {
    titleTag: 'Cookies & Cream S\'Mores Toronto | FunGuyz',
    metaDescription: 'Buy Cookies & Cream S\'Mores online with fast Toronto and GTA delivery. Premium mushroom treats available from FunGuyz.',
    keywords: 'cookies and cream smores, mushroom smores canada, edible delivery toronto, funguyz edibles',
    h1: 'Cookies & Cream S\'Mores',
    description: 'Cookies & Cream S\'Mores offer a delicious white-chocolate, cookies & cream cookie crumb, and marshmallow edible format. A customer favorite sweet mushroom treat throughout Toronto, Barrie, and the GTA.'
  },

  // Capsules
  'Lion\'s Mane Capsules': {
    titleTag: "Lion's Mane Capsules Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Lion's Mane capsules online with fast Toronto, GTA and Barrie delivery. Premium functional mushroom capsules available from FunGuyz.",
    keywords: "lion's mane capsules, lion's mane toronto, lion's mane canada, mushroom capsules toronto, buy lion's mane online, funguyz capsules, functional mushrooms canada",
    h1: "Lion's Mane Capsules",
    description: "Lion's Mane is one of the most recognized functional mushroom supplements available today. Known for its distinctive appearance and growing popularity, Lion's Mane capsules continue to attract customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities. Each capsule is carefully prepared for consistency, quality, and convenience."
  },
  'Reishi Capsules': {
    titleTag: "Reishi Capsules Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Shop Reishi capsules online with fast Toronto and GTA delivery. Premium functional mushroom supplements available from FunGuyz.",
    keywords: "reishi capsules, reishi mushroom capsules, reishi canada, mushroom supplements toronto, buy reishi online, funguyz capsules",
    h1: "Reishi Capsules",
    description: "Reishi is one of the most respected functional mushrooms in the world. Reishi capsules remain popular among customers searching for premium mushroom supplements throughout Toronto, Vaughan, Markham, Richmond Hill, Mississauga, Barrie, and surrounding GTA communities."
  },
  'Cordyceps Capsules': {
    titleTag: "Cordyceps Capsules Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Cordyceps capsules online with fast Toronto, GTA and Barrie delivery. Premium mushroom capsules available from FunGuyz.",
    keywords: "cordyceps capsules, cordyceps mushroom capsules, cordyceps canada, mushroom supplements toronto, buy cordyceps online, funguyz capsules",
    h1: "Cordyceps Capsules",
    description: "Cordyceps capsules are a popular functional mushroom supplement chosen by customers throughout Toronto and the GTA. Known for their premium quality and convenient capsule format, Cordyceps products continue to gain popularity across Canada."
  },
  'Turkey Tail Capsules': {
    titleTag: "Turkey Tail Capsules Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Order Turkey Tail capsules online with fast Toronto and GTA delivery. Premium mushroom supplements available from FunGuyz.",
    keywords: "turkey tail capsules, turkey tail mushroom canada, mushroom capsules toronto, functional mushrooms gta, buy turkey tail online, funguyz capsules",
    h1: "Turkey Tail Capsules",
    description: "Turkey Tail capsules are among the most recognized functional mushroom products available online. Customers throughout Toronto, Mississauga, Vaughan, Markham, Barrie, and surrounding regions continue to choose Turkey Tail due to its popularity and premium quality."
  },
  'Chaga Capsules': {
    titleTag: "Chaga Capsules Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Chaga capsules online with fast Toronto, GTA and Barrie delivery. Premium functional mushroom capsules available from FunGuyz.",
    keywords: "chaga capsules, chaga mushroom capsules, chaga canada, mushroom supplements toronto, buy chaga online, funguyz capsules",
    h1: "Chaga Capsules",
    description: "Chaga capsules continue to grow in popularity among customers searching for premium functional mushroom supplements. FunGuyz offers high-quality Chaga capsules with delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities."
  },
  'Golden Teacher Extract': {
    titleTag: "Golden Teacher Extract Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Golden Teacher extract online with fast Toronto and GTA delivery. Premium mushroom extract products available from FunGuyz.",
    keywords: "golden teacher extract, mushroom extract toronto, golden teacher canada, mushroom products gta, funguyz extracts",
    h1: "Golden Teacher Extract",
    description: "Golden Teacher Extract provides a premium mushroom extract option for customers throughout Toronto and the GTA. Carefully prepared and packaged, this product continues to attract customers looking for high-quality mushroom extracts online."
  },
  'Penis Envy Extract': {
    titleTag: "Penis Envy Extract Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Order Penis Envy extract online with fast Toronto and GTA delivery. Premium mushroom extract products available from FunGuyz.",
    keywords: "penis envy extract, mushroom extract canada, penis envy products toronto, premium mushroom extracts, funguyz extracts",
    h1: "Penis Envy Extract",
    description: "Penis Envy Extract remains one of the most searched mushroom extract products available online. Customers throughout Toronto, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA regions continue to seek this premium extract format."
  },
  'Lion\'s Mane Tincture': {
    titleTag: "Lion's Mane Tincture Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Lion's Mane tincture online with fast Toronto, GTA and Barrie delivery. Premium mushroom tinctures available from FunGuyz.",
    keywords: "lion's mane tincture, lion's mane extract toronto, mushroom tinctures canada, functional mushrooms gta, funguyz tinctures",
    h1: "Lion's Mane Tincture",
    description: "Lion's Mane Tincture is a premium liquid mushroom extract option that continues to gain popularity throughout Toronto and the GTA. Customers frequently choose tinctures due to their convenience and ease of use."
  },
  'Reishi Tincture': {
    titleTag: "Reishi Tincture Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Shop Reishi tincture online with fast Toronto and GTA delivery. Premium mushroom tinctures available from FunGuyz.",
    keywords: "reishi tincture, reishi extract canada, mushroom tinctures toronto, buy reishi tincture online, funguyz tinctures",
    h1: "Reishi Tincture",
    description: "Reishi Tincture offers customers a premium liquid mushroom supplement format. FunGuyz provides quality Reishi tinctures with delivery throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities."
  },
  'Cordyceps Tincture': {
    titleTag: "Cordyceps Tincture Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Cordyceps tincture online with fast Toronto, GTA and Barrie delivery. Premium mushroom tinctures available from FunGuyz.",
    keywords: "cordyceps tincture, cordyceps extract canada, mushroom tinctures toronto, buy cordyceps tincture online, funguyz tinctures",
    h1: "Cordyceps Tincture",
    description: "Cordyceps Tincture is a premium liquid mushroom extract product available for customers throughout Toronto and the GTA. Carefully prepared and packaged, it continues to be a popular choice among customers searching for mushroom tinctures online."
  },

  // Microdose
  'Golden Teacher Microdose': {
    titleTag: "Golden Teacher Microdose Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Buy Golden Teacher microdose capsules online with fast Toronto, GTA and Barrie delivery. Premium microdose products available from FunGuyz.",
    keywords: "golden teacher microdose, microdose capsules toronto, microdosing canada, golden teacher capsules, microdose delivery toronto, funguyz microdose, microdose gta",
    h1: "Golden Teacher Microdose Capsules",
    description: "Golden Teacher Microdose capsules are among the most popular microdosing products available online. Carefully prepared using premium Golden Teacher mushroom material, these capsules provide a convenient format for customers throughout Toronto, Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding GTA communities. FunGuyz offers discreet delivery and premium quality products designed for customers seeking a reliable microdose capsule option."
  },
  'Penis Envy Microdose': {
    titleTag: "Penis Envy Microdose Delivery Toronto & GTA | FunGuyz",
    metaDescription: "Shop Penis Envy microdose capsules online with fast Toronto and GTA delivery. Premium microdose products available from FunGuyz.",
    keywords: "penis envy microdose, microdose capsules toronto, penis envy capsules canada, mushroom microdose gta, microdose delivery toronto, funguyz microdose",
    h1: "Penis Envy Microdose Capsules",
    description: "Penis Envy Microdose capsules continue to grow in popularity among customers searching for premium microdosing products throughout Toronto and the GTA. Each capsule is prepared for consistency and convenience, making it a popular option among customers throughout Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding communities."
  },
  'Stamets Stack Microdose': {
    titleTag: "Stamets Stack Microdose Delivery Toronto | FunGuyz",
    metaDescription: "Buy Stamets Stack microdose capsules online with fast Toronto, GTA and Barrie delivery. Premium microdose blends available from FunGuyz.",
    keywords: "stamets stack canada, stamets stack microdose, microdose capsules toronto, mushroom capsules gta, microdose delivery toronto, funguyz stamets stack",
    h1: "Stamets Stack Microdose Capsules",
    description: "Stamets Stack remains one of the most recognized microdose capsule formats available today. This premium blend continues to attract customers throughout Toronto, Mississauga, Vaughan, Richmond Hill, Markham, Barrie, and surrounding GTA regions looking for convenient microdose products."
  },
  'Creativity Microdose Blend': {
    titleTag: "Creativity Microdose Blend Delivery Toronto | FunGuyz",
    metaDescription: "Order Creativity Microdose Blend capsules online with fast Toronto and GTA delivery. Premium microdose products available from FunGuyz.",
    keywords: "creativity microdose blend, microdose capsules toronto, mushroom microdose canada, microdose delivery gta, funguyz microdose",
    h1: "Creativity Microdose Blend",
    description: "Creativity Microdose Blend is designed for customers seeking a convenient microdose capsule format. This premium product continues to attract customers throughout Toronto, Vaughan, Markham, Richmond Hill, Mississauga, Barrie, and surrounding GTA communities."
  },
  'Productivity Microdose Blend': {
    titleTag: "Productivity Microdose Blend Toronto & GTA | FunGuyz",
    metaDescription: "Buy Productivity Microdose Blend capsules online with fast Toronto, GTA and Barrie delivery. Premium microdose products available from FunGuyz.",
    keywords: "productivity microdose blend, microdose capsules toronto, microdosing canada, mushroom capsules gta, funguyz microdose, microdose delivery toronto",
    h1: "Productivity Microdose Blend",
    description: "Productivity Microdose Blend remains a popular microdose capsule option for customers throughout Toronto and the GTA. Carefully prepared and packaged, this premium microdose product continues to attract growing interest throughout Mississauga, Vaughan, Markham, Richmond Hill, Barrie, and surrounding areas."
  },
  'Wellness Microdose Blend': {
    titleTag: "Wellness Microdose Blend Delivery Toronto | FunGuyz",
    metaDescription: "Shop Wellness Microdose Blend capsules online with fast Toronto, GTA and Barrie delivery. Premium microdose products available from FunGuyz.",
    keywords: "wellness microdose blend, microdose capsules toronto, microdosing canada, mushroom capsules gta, microdose delivery toronto, funguyz microdose",
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



