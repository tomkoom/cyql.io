import { FooterBottom, FooterTop } from "."

export default function Footer() {
  return (
    <footer className="bg-coolgray-950 mt-4 w-full px-4 py-12 sm:px-4 lg:px-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  )
}
