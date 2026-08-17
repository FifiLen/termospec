export interface HomeHeroLink {
  label: string;
  href: string;
}

export interface HomeHeroImageSource {
  src: string;
  position: string;
}

export interface HomeHeroSlide {
  title: string;
  lead: string;
  presentation: "nakladka" | "podzial";
  image: {
    alt: string;
    desktop: HomeHeroImageSource;
    mobile: HomeHeroImageSource;
  };
  caption: {
    label: string;
    text: string;
  };
  primaryLink: HomeHeroLink;
  secondaryLink: HomeHeroLink;
}
