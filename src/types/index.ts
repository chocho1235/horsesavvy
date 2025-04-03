export interface MembershipSection {
  title: string;
  links: string[];
}

export interface MembershipData {
  information: MembershipSection;
  branch: MembershipSection;
  centre: MembershipSection;
}

export interface NewsItem {
  image: string;
  title: string;
  snippet: string;
  date: string;
  category: string;
}

export interface Partner {
  name: string;
  logo: string;
} 