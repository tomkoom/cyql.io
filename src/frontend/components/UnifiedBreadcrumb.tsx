import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ROUTES } from "@/constants"
import { Link } from "react-router-dom"

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface UnifiedBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function UnifiedBreadcrumb({ items, className = "mb-6" }: UnifiedBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Always start with Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={ROUTES.HOME}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Render provided items with separators */}
        {items.map((item, index) => (
          <>
            <BreadcrumbSeparator key={`separator-${index}`} />
            <BreadcrumbItem key={`item-${index}`}>
              {item.isCurrentPage || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
