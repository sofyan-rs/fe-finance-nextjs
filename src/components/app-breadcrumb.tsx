import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";

export const AppBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { name: "Home", href: "/" },
    ...segments.map((segment, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { name, href };
    }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => (
          <BreadcrumbItem key={crumb.href}>
            {idx < crumbs.length - 1 ? (
              <>
                <BreadcrumbLink href={crumb.href}>{crumb.name}</BreadcrumbLink>
                <BreadcrumbSeparator /> {/* Should render <span>, not <li> */}
              </>
            ) : (
              <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
