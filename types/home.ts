export interface HomeHeroLink {
  label: string;
  href: string;
}

export interface HomeHeroImageSource {
  src: string;
  position: string;
}

export interface HomeHeroFact {
  value: string;
  label: string;
}

export interface HomeHeroSlide {
  title: string;
  lead: string;
  presentation: "nakladka" | "pelny-kadr";
  image: {
    alt: string;
    desktop: HomeHeroImageSource;
    mobile: HomeHeroImageSource;
  };
  caption: {
    label: string;
    text: string;
  };
  facts?: HomeHeroFact[];
  primaryLink: HomeHeroLink;
  secondaryLink: HomeHeroLink;
}
