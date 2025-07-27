import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ROUTES } from "@/constants"
import { Fragment } from "react"
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
          <Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isCurrentPage || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
