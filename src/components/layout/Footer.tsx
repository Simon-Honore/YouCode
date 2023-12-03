import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-card">
      <div className="m-auto w-full max-w-3xl space-y-4 px-2 py-4">
        <div className="flex flex-col max-md:space-y-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 max-md:self-center">
            <Image
              src={SiteConfig.logo}
              width={50}
              height={35}
              alt="app logo"
            />
            <Typography
              variant="base"
              as={Link}
              href="/"
              className="text-muted-foreground"
            >
              {SiteConfig.title}
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground md:flex-row ">
            <Link className="hover:underline" href="/legal/privacy">
              Privacy
            </Link>
            <Link className="hover:underline" href="/legal/cgv">
              CGV
            </Link>
            <Link className="hover:underline" href="/courses">
              Courses
            </Link>
            <Link className="hover:underline" href="/admin">
              Admin
            </Link>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Typography variant="base" className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} YouCode
          </Typography>
        </div>
      </div>
    </footer>
  );
};
