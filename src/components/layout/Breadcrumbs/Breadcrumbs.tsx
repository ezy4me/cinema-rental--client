"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./Breadcrumbs.module.scss";

const Route2LabelMap: Record<string, string> = {
  "/": "Главная",
  "/equipment": "Оборудование",
  "/equipment/[id]": "Подробная информация",
};

export function BreadCrumbs() {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = React.useState<{ link: string; label: string }[]>(
    []
  );

  React.useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const crumbLinks = combineAccumulatively(pathSegments);
    const crumbLabels = combineAccumulatively(pathSegments);

    const crumbs = crumbLinks.map((link, index) => {
      const route = crumbLabels[index];
      return {
        link: `/${link}`,
        label: Route2LabelMap[`/${route}`] || route,
      };
    });

    setCrumbs(crumbs);
  }, [pathname]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.breadcrumbContainer}>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
              <div
                className={
                  i === crumbs.length - 1
                    ? styles.breadcrumbItemActive
                    : styles.breadcrumbItem
                }>
                <Link href={c.link} className={styles.breadcrumbLink}>
                  {c.label}
                </Link>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function combineAccumulatively(segments: string[]): string[] {
  return segments.reduce<string[]>((acc, cur, curIndex) => {
    const previousPath = curIndex > 0 ? acc[curIndex - 1] : "";
    const newPath = previousPath ? `${previousPath}/${cur}` : cur;
    acc.push(newPath);
    return acc;
  }, []);
}
