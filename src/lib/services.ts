import prisma from "./db";

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  iconName: string;
  features: string[];
  sortOrder: number;
  active: boolean;
  showOnHomepage: boolean;
  showInFooter: boolean;
}

interface GetServicesOptions {
  homepage?: boolean;
  footer?: boolean;
  all?: boolean;
}

export async function getServices(options: GetServicesOptions = {}): Promise<Service[]> {
  const { homepage, footer, all } = options;

  const whereClause: {
    active?: boolean;
    showOnHomepage?: boolean;
    showInFooter?: boolean;
  } = {};

  if (!all) {
    whereClause.active = true;
  }

  if (homepage) {
    whereClause.showOnHomepage = true;
  }
  if (footer) {
    whereClause.showInFooter = true;
  }

  const services = await prisma.service.findMany({
    where: whereClause,
    orderBy: { sortOrder: "asc" },
  });

  return services.map((service) => ({
    ...service,
    features: service.features as string[],
  }));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) return null;

  return {
    ...service,
    features: service.features as string[],
  };
}
