import React from "react"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: React.ReactNode
  className?: string
}

export default function PageHeader({ title, description, breadcrumbs, className = "" }: PageHeaderProps) {
  return (
    <div className={`${className}`}>
      {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}

      <header className={`${breadcrumbs ? "mb-6" : "mb-8"}`}>
        <h1 className="page-title mb-2">{title}</h1>
        {description && <p className="text-coolgray-400 text-sm">{description}</p>}
      </header>
    </div>
  )
}
