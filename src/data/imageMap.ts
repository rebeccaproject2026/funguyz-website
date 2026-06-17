export const imageMap: Record<string, string> = {
  // Magic Mushrooms
  'Golden Teacher': '/images/magicmushrooms/goldenteacher/goldenteacherfront.webp',
  'Penis Envy': '/images/magicmushrooms/penisenvy/penisenvyfront.webp',
  'Blue Meanies': '/images/magicmushrooms/bluemeanies/bluemeaniesfront.webp',
  'Albino Penis Envy (APE)': '/images/magicmushrooms/albinopenisenvyape/albinopenisenvyapefront.webp',
  'Tidal Wave': '/images/magicmushrooms/tidalwave/tidalwavefront.webp',
  'Jack Frost': '/images/magicmushrooms/jackfrost/jackfrostfront.webp',
  'Jedi Mind Fuck (JMF)': '/images/magicmushrooms/jedimindfuckjmf/jedimindfuckjmffront.webp',
  'Mazatapec': '/images/magicmushrooms/mazatapec/mazatapecfront.webp',
  'B+': '/images/magicmushrooms/b+/b+front.webp',
  'Treasure Coast': '/images/magicmushrooms/treasurecoast/treasurecoastfront.webp',
  'Melmac': '/images/magicmushrooms/melmac/melmacfront.webp',
  'Enigma': '/images/magicmushrooms/enigma/enigmafront.webp',
  'Hillbilly': '/images/magicmushrooms/hillbilly/hillbillyfront.webp',
  'Thai Pink Buffalo': '/images/magicmushrooms/thaipinkbuffalo/thaipinkbuffalofront.webp',

  // Edibles
  'Golden Teacher Original Chocolate (GT OG)': '/images/edibles/chocolatebars/goldenteacheroriginalchocolategtog/goldenteacheroriginalchocolategtogfront.webp',
  'Golden Teacher Concentrated Chocolate (GT CC)': '/images/edibles/chocolatebars/goldenteacherconcentratedchocolategtcc/goldenteacherconcentratedchocolategtccfront.webp',
  'Penis Envy Original Chocolate (PE OG)': '/images/edibles/chocolatebars/penisenvyoriginalchocolatepeog/penisenvyoriginalchocolatepeogfront.webp',
  'Penis Envy Refined Concentrate Chocolate (PE RC)': '/images/edibles/chocolatebars/penisenvyrefinedconcentratechocolateperc/penisenvyrefinedconcentratechocolatepercfront.webp',
  'Penis Envy Concentrated Chocolate (PE CC)': '/images/edibles/chocolatebars/penisenvyconcentratedchocolatepecc/penisenvyconcentratedchocolatepeccfront.webp',
  'Blue Raspberry Gummies': '/images/edibles/gummies/blueraspberrygummies/blueraspberrygummiesfront.webp',
  'Watermelon Gummies': '/images/edibles/gummies/watermelongummies/watermelongummiesfront.webp',
  'Strawberry Gummies': '/images/edibles/gummies/strawberrygummies/strawberrygummiesfront.webp',
  'Mango Gummies': '/images/edibles/gummies/mangogummies/mangogummiesfront.webp',
  'Green Apple Gummies': '/images/edibles/gummies/greenapplegummies/greenapplegummiesfront.webp',
  'Mixed Berry Gummies': '/images/edibles/gummies/mixedberrygummies/mixedberrygummiesfront.webp',
  'Golden Teacher S\'Mores': '/images/edibles/s_mores/goldenteachers_mores/goldenteachers_moresfront.webp',
  'Penis Envy S\'Mores': '/images/edibles/s_mores/penisenvys_mores/penisenvys_moresfront.webp',
  'Cookies & Cream S\'Mores': '/images/edibles/s_mores/cookies&creams_mores/cookies&creams_moresfront.webp',


  // Capsules
  'Lion\'s Mane Capsules': '/images/CAPSULES/functionalmushroomcapsules/lion_smanecapsules/lion_smanecapsulesfront.webp',
  'Reishi Capsules': '/images/CAPSULES/functionalmushroomcapsules/reishicapsules/reishicapsulesfront.webp',
  'Cordyceps Capsules': '/images/CAPSULES/functionalmushroomcapsules/cordycepscapsules/cordycepscapsulesfront.webp',
  'Turkey Tail Capsules': '/images/CAPSULES/functionalmushroomcapsules/turkeytailcapsules/turkeytailcapsulesfront.webp',
  'Chaga Capsules': '/images/CAPSULES/functionalmushroomcapsules/chagacapsules/chagacapsulesfront.webp',
  'Golden Teacher Extract': '/images/CAPSULES/extractstinctures/goldenteacherextract/goldenteacherextractfront.webp',
  'Penis Envy Extract': '/images/CAPSULES/extractstinctures/penisenvyextract/penisenvyextractfront.webp',
  'Lion\'s Mane Tincture': '/images/CAPSULES/extractstinctures/lion_smanetincture/lion_smanetincturefront.webp',
  'Reishi Tincture': '/images/CAPSULES/extractstinctures/reishitincture/reishitincturefront.webp',
  'Cordyceps Tincture': '/images/CAPSULES/extractstinctures/cordycepstincture/cordycepstincturefront.webp',

  // Microdose
  'Golden Teacher Microdose': '/images/microdose/goldenteachermicrodose/goldenteachermicrodosefront.webp',
  'Penis Envy Microdose': '/images/microdose/penisenvymicrodose/penisenvymicrodosefront.webp',
  'Stamets Stack Microdose': '/images/microdose/stametsstackmicrodose/stametsstackmicrodosefront.webp',
  'Creativity Microdose Blend': '/images/microdose/creativitymicrodoseblend/creativitymicrodoseblendfront.webp',
  'Productivity Microdose Blend': '/images/microdose/productivitymicrodoseblend/productivitymicrodoseblendfront.webp',
  'Wellness Microdose Blend': '/images/microdose/wellnessmicrodoseblend/wellnessmicrodoseblendfront.webp'
};

export function getFallbackImage(category: string): string {
  if (category === 'Edibles') return '/images/cat_edibles.webp';
  if (category === 'Capsules') return '/images/cat_capsules.webp';
  if (category === 'Microdose') return '/images/cat_microdose.webp';
  return '/images/cat_mushrooms.webp';
}
